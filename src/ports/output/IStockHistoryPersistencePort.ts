import StockHistoryMapper from '@mappers/StockHistoryMapper.js'


export default interface IStockHistoryPersistancePort {
    create(data: Omit<StockHistoryMapper, 'id'>): Promise<StockHistoryMapper>
    getById(id: string): Promise<StockHistoryMapper | null>
    getAll(stockId: string): Promise<StockHistoryMapper[]>
    update(id: string, data: Partial<StockHistoryMapper>): Promise<StockHistoryMapper | null>
    delete(id: string): Promise<boolean>
}
