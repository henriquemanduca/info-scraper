// import PromisePool from '@supercharge/promise-pool'

import PageMapper from '@mappers/PageMapper.js'
import StockHistoryMapper from '@mappers/StockHistoryMapper.js'
import StockMapper from '@mappers/StockMapper.js'
import IStockServicePort from '@ports/input/IStockServicePort.js'
import ICacheIntegrationPort from '@ports/output/ICacheIntegrationPort.js'
import IStockBrowserIntegrationPort from '@ports/output/IStockBrowserIntegrationPort.js'
import IStockHistoryPersistancePort from '@ports/output/IStockHistoryPersistencePort.js'
import IStockPersistancePort from '@ports/output/IStockPersistencePort.js'
import { HighlightedType } from 'adapters/enums/HighlightedType.js'
import NodeCacheIntegrationAdapter from 'adapters/outbound/NodeCacheIntegrationAdapter.js'
import StockHistoryPersistanceAdapter from 'adapters/outbound/StockHistoryPersistanceAdapter.js'
import StockIntegrationAdapter from 'adapters/outbound/StockIntegrationAdpater.js'
import StockPersistanceAdapter from 'adapters/outbound/StockPersistanceAdapter.js'
import BaseService from './BaseService.js'


export default class StockService extends BaseService implements IStockServicePort {

    private STOCK_TABLES_KEY = 'stock_type'

    constructor(
        private browserIntegration: IStockBrowserIntegrationPort = new StockIntegrationAdapter(),
        private cacheIntegration: ICacheIntegrationPort = new NodeCacheIntegrationAdapter(),
        private stockPersistance: IStockPersistancePort = new StockPersistanceAdapter(),
        private historyPersistance: IStockHistoryPersistancePort = new StockHistoryPersistanceAdapter()
    ) {
        super()
        this.NAMESPACE = 'StockService'
    }

    private getTablesCacheKey(highlightedType: HighlightedType): string {
        return `${this.STOCK_TABLES_KEY}_${highlightedType}`
    }

    private saveStockTableCache(key: string, stocks: StockMapper[]): void {
        this.cacheIntegration.save(key, stocks)
    }

    private async save(highlightedType: HighlightedType, stocks: StockMapper[]): Promise<void> {

        for (const stock of stocks) {
            const stockDB = await this.stockPersistance.getByTicker(stock.ticker)

            if (stockDB === null || stockDB.title?.trim().length <= 0) {
                stock.title = await this.browserIntegration.getStockTitle(stock.ticker)
            }

            const stockMapper = await this.stockPersistance.create(stock)

            const historyMapper = {
                stockId: stockMapper.id,
                value: stock.value,
                variation: stock.variation,
                typeRef: highlightedType,
            } as StockHistoryMapper

            await this.historyPersistance.create(historyMapper)
        }
    }

    private async getStockByType(highlightedType: HighlightedType): Promise<StockMapper[]> {
        const key = this.getTablesCacheKey(highlightedType)
        let stocks = this.cacheIntegration.get<StockMapper[]>(key)

        if (stocks === undefined) {
            stocks = await this.browserIntegration.getHighlightedStocksFilter(highlightedType)

            this.saveStockTableCache(key, stocks)
            this.save(highlightedType, stocks)
        }

        return stocks
    }

    async syncHighlightedStocks(): Promise<void> {
        const stocksByType = await this.browserIntegration.getHighlightedStocks()

        stocksByType.forEach(stocks => {
            this.save(stocks.type, stocks.items)
        })
    }

    async getAll(pageMapper: PageMapper): Promise<StockMapper[]> {
        return await this.stockPersistance.getAll(pageMapper) ?? []
    }

    async getStock(ticker: string): Promise<StockMapper> {
        return await this.stockPersistance.getByTicker(ticker)
    }

    async getHighsStocks(): Promise<StockMapper[]> {
        return await this.getStockByType(HighlightedType.MostHigh) ?? []
    }

    async getDownsStocks(): Promise<StockMapper[]> {
        return await this.getStockByType(HighlightedType.MostDown) ?? []
    }
}
