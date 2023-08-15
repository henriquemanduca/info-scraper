import PageMapper from '@mappers/PageMapper.js'
import StockMapper from '@mappers/StockMapper.js'
import StockModel from '@models/StockModel.js'
import IStockPersistancePort from '@ports/output/IStockPersistencePort.js'
import StockRepository from './repository/StockRepository.js'


export default class StockPersistanceAdapter implements IStockPersistancePort {

    constructor(
        private repository = new StockRepository(),
    ) { }

    private getStockMapper(stock: StockModel): StockMapper {
        const { id, title, ticker, value, variation, createdAt, updatedAt } = stock.dataValues
        return new StockMapper(id, title, ticker, value, variation, createdAt, updatedAt)
    }

    public async create(data: Omit<StockMapper, 'id'>): Promise<StockMapper> {
        const stock = await this.repository.create(data)
        return this.getStockMapper(stock)
    }

    public async getById(id: string): Promise<StockMapper | null> {
        const stock = await this.repository.getById(id)
        return this.getStockMapper(stock)
    }

    public async getByTicker(ticker: string): Promise<StockMapper | null> {
        const stock = await this.repository.getByTicker(ticker)
        return stock ? this.getStockMapper(stock) : null
    }

    public async getAll(pageMapper: PageMapper): Promise<StockMapper[]> {
        const stocks = await this.repository.getAll(pageMapper)
        return stocks.map(stock => this.getStockMapper(stock))
    }

    public async update(id: string, data: Partial<StockMapper>): Promise<StockMapper | null> {
        const stock = await this.repository.update(id, data)
        return this.getStockMapper(stock)
    }

    public async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id)
    }
}
