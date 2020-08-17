// Setting up environment variables using .env file. See README.md for more information
require('dotenv').config();

// Importing dependencies
import AWS from 'aws-sdk';
import { writeFileSync } from 'fs';
import { join } from 'path';
import axios from 'axios';
import * as mkdirp from 'mkdirp';
import readline from 'readline';

// Instantiating sound player for reading mp3 files
const player = require('play-sound')();

// Instantiating AWS Polly request wrapper
const polly = new AWS.Polly({
    apiVersion: process.env.AWS_SERVICE_VERSION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

/**
 * Converts a given text to speech using AWS Polly and stores the result in a mp3 file.
 * @param {string} text - The text, which should be converted to speech
 * @param {string} voiceId - A valid voice id available via AWS Polly
 * @returns {string} File path to the resulting mp3 file if successful
 */
const textToSpeech = async (text: string, voiceId: string) => {
    const params = {
        OutputFormat: 'mp3',
        SampleRate: '8000',
        Text: text,
        TextType: 'text',
        VoiceId: voiceId
    };

    try {
        const result = await polly.synthesizeSpeech(params).promise();

        if (result.AudioStream) {
            const filePath = join(process.cwd(), 'output', `${(new Date()).getTime()}_speech.mp3`);
            writeFileSync(filePath, result.AudioStream as Buffer);

            return filePath;
        }
    } catch (error) {
        console.error(error);
    }
}

/**
 * Returns a random element of the given array
 * @param {array} array - The array to sample from
 * @returns {string} A random element of the array
 */
const sample = (array: any[]): any => {
    return array[Math.floor(Math.random() * array.length)];
}

/**
 * Fetches a random chuck norris joke from a publicly available api
 * @returns {string} A random chuck norris joke as plain text
 */
const fetchChuckNorrisJoke = async () => {
    try {
        const { data } = await axios.get('http://api.icndb.com/jokes/random');
        return data.value.joke.replace(/&quot;/g, '');
    } catch (error) {
        console.error('There was an error fetching joke from chuck norris api');
        return Promise.reject(error);
    }
}

/**
 * Fetches a random chuck norris joke from a publicly available api
 * @param {AWS.Polly.VoiceList} A list of AWS Polly voices 
 */
const readChuckNorrisFact = async (voices: AWS.Polly.VoiceList) => {
    console.log('Reading chuck norris fact');

    try {
        const joke = await fetchChuckNorrisJoke();
        const filePath = await textToSpeech(joke, sample(voices).Id);

        console.log(`Now reading this joke:\n\n${joke}`);

        player.play(filePath, (error: any) => {
            if (error) {
                throw error;
            }
        });
    } catch (error) {
        console.error('There was an error');
        console.error(error);
    }
}

(async () => {
    mkdirp.sync('output');

    // Fetch voices avialable for en-US locale
    const voices = await polly.describeVoices({ LanguageCode: 'en-US' }).promise();

    // Read the first chuck norris fact
    await readChuckNorrisFact(voices.Voices!);

    // Setup loop for asking if another joke should be read
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Want to hear another one? (y/n)\n>'
    });

    rl.on('line', async (line) => {
        const answer = line.toLowerCase().trim();
        if (answer === 'y' || answer === 'yes') {
            // We want to hear another one!
            await readChuckNorrisFact(voices.Voices!);
            rl.prompt();
        } else {
            console.log('Ok bye. Have a nice day!');
            process.exit(0);
        }
    });

    // Start the loop
    rl.prompt();
})();
