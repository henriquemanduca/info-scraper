import StockHistoryMapper from '@mappers/StockHistoryMapper.js'
import StockHistoryModel from '@models/StockHistoryModel.js'
import IStockHistoryPersistancePort from '@ports/output/IStockHistoryPersistencePort.js'
import { HighlightedType } from 'adapters/enums/HighlightedType.js'
import { Op } from 'sequelize'
import StockHistoryRepository from './repository/StockHistoryRepository.js'


export default class StockHistoryPersistanceAdapter implements IStockHistoryPersistancePort {

    constructor(
        private repository = new StockHistoryRepository()
    ) { }

    private getStockHistoryMapper(history: StockHistoryModel): StockHistoryMapper {
        const { id, stockId, value, variation, typeRef, createdAt } = history.dataValues
        return new StockHistoryMapper(id, stockId, value, variation, HighlightedType[typeRef], createdAt)
    }

    public async create(data: Omit<StockHistoryMapper, 'id'>): Promise<StockHistoryMapper> {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const historyDb = await this.repository.getBy({
            where: {
                value: data.value,
                createdAt: { [Op.eq]: today }
            }
        })

        if (!!historyDb) {
            return this.getStockHistoryMapper(historyDb)
        }

        const history = await this.repository.create(data)
        return this.getStockHistoryMapper(history)
    }

    public async getById(id: string): Promise<StockHistoryMapper | null> {
        const history = await this.repository.getById(id)
        return this.getStockHistoryMapper(history)
    }

    public async getAll(stockId: string): Promise<StockHistoryMapper[]> {
        const list = await this.repository.getAll(stockId)
        return list.map(item => this.getStockHistoryMapper(item))
    }

    public async update(id: string, data: Partial<StockHistoryMapper>): Promise<StockHistoryMapper | null> {
        const history = await this.repository.update(id, data)
        return this.getStockHistoryMapper(history)
    }

    public async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id)
    }
}
