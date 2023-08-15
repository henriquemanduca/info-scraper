import PageMapper from '@mappers/PageMapper.js'
import StockMapper from '@mappers/StockMapper.js'


export default interface IStockPersistancePort {
    create(data: Omit<StockMapper, 'id'>): Promise<StockMapper>
    getById(id: string): Promise<StockMapper | null>
    getByTicker(ticker: string): Promise<StockMapper | null>
    getAll(pageMapper: PageMapper): Promise<StockMapper[]>
    update(id: string, data: Partial<StockMapper>): Promise<StockMapper | null>
    delete(id: string): Promise<boolean>
}
