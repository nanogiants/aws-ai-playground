import * as CoinGecko from 'coingecko-api';
import { times } from 'lodash';
import * as moment from 'moment';

export default class Client {
    private client;

    constructor() {
        this.client = new CoinGecko();
    }

    async getAvailableCurrencies() {
        try {
            const { data } = await this.client.coins.list();
            return data;
        } catch (error) {
            return [];
        }
    }

    async getCurrencyDetailInformation(currencyId: string) {
        try {
            const { data } = await this.client.coins.fetch(currencyId, { localization: false });
            return data;
        } catch (error) {
            return {};
        }
    }

    async getCurrencyTickerInformation(currencyId: string) {
        const dayCount = 45;
        const dates = times(dayCount, (index) => moment().subtract(dayCount - index, 'days').format('DD-MM-YYYY'));

        try {
            return await Promise.all(dates.map(async (date) => {
                try {
                    const { data } = await this.client.coins.fetchHistory(currencyId, { date, localization: false });
                    return data.market_data?.current_price?.usd || 0;
                } catch (error) {
                    return 0;
                }
            }));
        } catch (error) {
            return [];
        }
    }
}