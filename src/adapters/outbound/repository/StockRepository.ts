import StockMapper from '@mappers/StockMapper.js'
import StockModel from '@models/StockModel.js'


export default class StockRepository {

    public async create(data: Omit<StockMapper, 'id'>): Promise<StockModel> {
        const stock = await StockModel.findOne({ where: { ticker: data.ticker } })

        if (stock) {
            await stock.update(data)
            return stock
        }

        return await StockModel.create({ ...data })
    }

    public async getById(id: string): Promise<StockModel | null> {
        return await StockModel.findByPk(id)
    }

    public async getByTicker(ticker: string): Promise<StockModel | null> {
        return await StockModel.findOne({ where: { ticker } })
    }

    public async getAll(pagenation: any): Promise<StockModel[]> {

        const queries = {
            offset: (pagenation.page - 1) * pagenation.limit,
            limit: pagenation.limit,
            order: []
        }

        if (pagenation.orderBy) {
            queries.order = [[pagenation.orderBy, pagenation.sortBy]]
        }

        return await StockModel.findAll({
            ...queries
        })
    }

    public async update(id: string, data: Partial<StockModel>): Promise<StockModel | null> {
        const stock = await StockModel.findByPk(id)
        if (!stock) return null
        await stock.update(data)
        return stock
    }

    public async delete(id: string): Promise<boolean> {
        const stock = await StockModel.findByPk(id)
        if (!stock) return false
        await stock.destroy()
        return true
    }
}
