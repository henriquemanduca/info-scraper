import StockHistoryMapper from '@mappers/StockHistoryMapper.js'
import StockHistoryModel from '@models/StockHistoryModel.js'


export default class StockHistoryRepository {

    public async create(data: Omit<StockHistoryMapper, 'id'>): Promise<StockHistoryModel> {
        return await StockHistoryModel.create({ ...data })
    }

    public async getBy(where: object): Promise<StockHistoryModel | null> {
        return await StockHistoryModel.findOne(where)
    }

    public async getById(id: string): Promise<StockHistoryModel | null> {
        return await StockHistoryModel.findByPk(id)
    }

    public async getAll(stockId: string): Promise<StockHistoryModel[]> {
        return await StockHistoryModel.findAll({ where: { stockId } })
    }

    public async update(id: string, data: Partial<StockHistoryModel>): Promise<StockHistoryModel | null> {
        const stock = await StockHistoryModel.findByPk(id)
        if (!stock) return null

        await stock.update(data)
        return stock
    }

    public async delete(id: string): Promise<boolean> {
        const stock = await StockHistoryModel.findByPk(id)
        if (!stock) return false

        await stock.destroy()
        return true
    }
}
