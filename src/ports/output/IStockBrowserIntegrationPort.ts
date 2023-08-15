import StockMapper from '@mappers/StockMapper.js'
import StocksByType from '@mappers/StocksByTypeMapper.js'
import { HighlightedType } from 'adapters/enums/HighlightedType.js'


export default interface IStockBrowserIntegrationPort {
    getStockTitle(ticker: string): Promise<string | null>
    getHighlightedStocks(): Promise<StocksByType[]>
    getHighlightedStocksFilter(requiredType: HighlightedType): Promise<StockMapper[]>
}
