require('dotenv').config();

// Importing dependencies
import * as AWS from 'aws-sdk';
import { times } from 'lodash';
import axios from 'axios';
import { join, basename } from 'path';
import { createWriteStream, copyFileSync, readFileSync, existsSync, writeFileSync, rmdirSync } from 'fs';
import * as mkdirp from 'mkdirp';
import * as rimraf from 'rimraf';
import { v4 as uuidv4 } from 'uuid';

const rekognition = new AWS.Rekognition({
    apiVersion: process.env.AWS_SERVICE_VERSION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

const fetchRandomImages = async (count: number): Promise<string[]> => {
    const url = 'https://picsum.photos/400';
    mkdirp.sync(join(process.cwd(), 'temp'));

    return await Promise.all(times(count, async () => {
        const filePath = join(process.cwd(), 'temp', `${uuidv4()}_download.png`);
        const writer = createWriteStream(filePath);

        try {
            const response = await axios({ method: 'GET', url, responseType: 'stream' });
            response.data.pipe(writer);

            return new Promise((resolve, reject) => {
                writer.on('finish', () => resolve(filePath));
                writer.on('error', error => reject(error));
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }))
}

const detectLabelsOfImage = (imageFilePath: string) => {
    if (existsSync(imageFilePath)) {
        const fileContent = readFileSync(imageFilePath);
        const buffer = Buffer.from(fileContent);

        const params = {
            Image: {
                Bytes: buffer
            },
            MaxLabels: parseInt(process.env.AWS_REKOGNITION_MAX_LABELS || '10', 10),
            MinConfidence: parseFloat(process.env.AWS_REKOGNITION_MIN_CONFIDENCE || '0.75') * 100
        }

        return rekognition.detectLabels(params).promise();
    }

    return Promise.reject(new Error(`File ${imageFilePath} not found!`));
}

(async () => {
    const imageCount = parseInt(process.env.IMAGE_COUNT || '25', 10);
    console.log(`Downloading ${imageCount} images for label detection`);

    const files = await fetchRandomImages(imageCount);

    console.log('Performing label detection on downloaded images');
    const result = await Promise.all(files.map(async (file) => {
        const labels = await detectLabelsOfImage(file);

        console.log('Copying image file to respective label directories');
        labels.Labels.forEach((label) => {
            mkdirp.sync(join(process.cwd(), 'output', label.Name.toLowerCase()));
            copyFileSync(file, join(process.cwd(), 'output', label.Name.toLowerCase(), basename(file)));
        });

        return { file, labels };
    }));

    console.log('Storing data to result.json');
    writeFileSync('result.json', JSON.stringify(result, null, 2));
    rimraf.sync(join(process.cwd(), 'temp'), { recursive: true });

    console.log('Done!');
})();