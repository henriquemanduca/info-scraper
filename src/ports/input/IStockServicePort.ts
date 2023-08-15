import PageMapper from '@mappers/PageMapper.js'
import StockMapper from '@mappers/StockMapper.js'


export default interface IStockServicePort {
    getAll(page: PageMapper): Promise<StockMapper[]>
    getStock(ticker: string): Promise<StockMapper | null>
    syncHighlightedStocks(): Promise<void>
    getHighsStocks(): Promise<StockMapper[]>
    getDownsStocks(): Promise<StockMapper[]>
}
