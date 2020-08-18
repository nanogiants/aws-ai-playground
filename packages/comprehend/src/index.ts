require('dotenv').config();

// Importing dependencies
import AWS from 'aws-sdk';
import { groupBy, keys, orderBy, capitalize, chunk, flatten, get } from 'lodash';
import { writeFileSync } from 'fs';

const gplay = require('google-play-scraper');

const comprehend = new AWS.Comprehend({
    apiVersion: process.env.AWS_SERVICE_VERSION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

const fetchReviews = async (packageId: string, limit: number, locale: string) => {
    if (!packageId) {
        console.error('You have not set a package id in config/default.json');
        process.exit(-1);
    }

    return (await gplay.reviews({
        appId: packageId,
        sort: gplay.sort.NEWEST,
        num: limit,
        lang: locale.split('-')[0],
        country: locale.split('-')[1],
        throttle: 10
    })).data;
}

const detectSentiments = (texts: string[], localeOrLanguage: string) => {
    console.warn(`AWS comprehend allows only batch detecting sentiment for 25 documents at a time. We will resize your input accordingly. You have currently ${texts.length} documents.`);
    const relevantTexts = texts.slice(0, 25);

    const params = {
        LanguageCode: localeOrLanguage.indexOf('-') >= 0 ? localeOrLanguage.split('-')[0] : localeOrLanguage,
        TextList: relevantTexts
    };

    return comprehend.batchDetectSentiment(params).promise();
}

(async () => {
    const packageId: string = process.env.GOOGLE_PLAY_APP_ID!;
    const limit: number = parseInt(process.env.GOOGLE_PLAY_LIMIT || '50', 10);
    const locale: string = process.env.GOOGLE_PLAY_LOCALE || 'de-DE';

    const reviews = await fetchReviews(packageId, limit, locale);
    const reviewTexts = reviews.map((review: any) => review.text);

    const reviewChunks: string[][] = chunk(reviewTexts, 25);

    const sentiments = flatten(await Promise.all(reviewChunks.map(async (chunk) => {
        return (await detectSentiments(chunk, locale)).ResultList;
    })));


    // const sentiments = await detectSentiments(reviewTexts, locale);
    console.log(JSON.stringify(sentiments, null, 2));

    const result = sentiments.map((sentiment, index) => {
        return {
            text: reviewTexts[index],
            sentiment
        }
    });

    const groups = groupBy(result, 'sentiment.Sentiment');

    console.log('Done executing sentiment analysis on data. Here are some insights\n');

    keys(groups).forEach((key) => {
        const reviewForKey = groups[key];
        const readableKey = key.toLowerCase();

        console.log(`Found ${reviewForKey.length} reviews that are '${readableKey}' (${(reviewForKey.length / result.length * 100).toFixed(2)}%)`);

        const mostReview = orderBy(reviewForKey, [`sentiment.SentimentScore.${capitalize(key)}`], ['desc'])[0];
        const leastReview = orderBy(reviewForKey, [`sentiment.SentimentScore.${capitalize(key)}`], ['asc'])[0];

        console.log(`* Most ${readableKey} review: ${mostReview.text} (${(get(mostReview.sentiment.SentimentScore, [capitalize(key)]) * 100).toFixed(2)}%)`);
        console.log(`* Least ${readableKey} review: ${leastReview.text} (${(get(leastReview.sentiment.SentimentScore, [capitalize(key)]) * 100).toFixed(2)}%)\n`);
    });

    writeFileSync('result.json', JSON.stringify(groups, null, 2));
})();
