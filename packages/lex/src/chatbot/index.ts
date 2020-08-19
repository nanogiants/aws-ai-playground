import * as AWS from 'aws-sdk';
import Client from '../api';
import * as asciichart from 'asciichart';

export default class Chatbot {
    private lex: AWS.LexRuntime;
    private botName: string;
    private botAlias: string;

    constructor() {
        this.botName = process.env.AWS_LEX_BOT_NAME;
        this.botAlias = process.env.AWS_LEX_BOT_ALIAS;

        this.lex = new AWS.LexRuntime({
            apiVersion: process.env.AWS_SERVICE_VERSION,
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION
        });

        if (!this.botName || !this.botAlias) {
            console.warn('Bot name or alias is not set. Please create a .env file and fill in missing values. See README.md for more information');
            process.exit(-1);
        }
    }

    async postUserInput(input: string, userId: string) {
        const params = {
            botAlias: this.botAlias,
            botName: this.botName,
            inputText: input,
            userId
        };

        try {
            return this.lex.postText(params).promise();
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
    }

    async processUserInput(result: AWS.LexRuntime.PostTextResponse): Promise<string> {
        if (result.dialogState === 'ReadyForFulfillment') {
            const client = new Client();

            try {
                switch (result.intentName) {
                    case 'CryptoCurrencyList':
                        const currencies = await client.getAvailableCurrencies();
                        return currencies.map((currency) => currency.id).join('\n');

                    case 'CryptoCurrencyDetails':
                        const currencyId = result.slots?.Currency;
                        const currency = await client.getCurrencyDetailInformation(currencyId);

                        if (!currency.description) {
                            return `I could not find anything for '${currencyId}'`;
                        }

                        return `
${currency.description?.en}\n
See '${currency.links?.homepage?.[0] || 'N/A'}' for more information.
A ${currency.name} equals currently $${currency.market_data?.current_price?.usd || 'N/A'} (${new Date()})
                        `

                    case 'CryptoCurrencyTicker':
                        const data = await client.getCurrencyTickerInformation(result.slots?.Currency);
                        const offset = 3;

                        return asciichart.plot(data, { offset, height: 6, format: (x, i) => `   ${(('     ') + x.toFixed(2)).slice(-8)} $` });
                }
            } catch (error) {
                console.error(error);
                return 'There was an error!';
            }
        }

        return result.message || 'Sorry, can you please repeat that?';
    }
}