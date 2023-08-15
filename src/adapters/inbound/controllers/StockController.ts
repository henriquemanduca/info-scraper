import { Request, Response } from 'express'

import StockService from '@application/service/StockService.js'
import IStockControllerPort from '@ports/input/IStockControllerPort.js'
import IStockServicePort from '@ports/input/IStockServicePort.js'


export default class StockController implements IStockControllerPort {

    constructor(
        private stockService: IStockServicePort = new StockService()
    ) { }

    async getAll(req: Request, res: Response): Promise<void> {
        try {
            const { page = 1, limit = 10, orderBy = 'ticker', sortBy = 'asc' } = req.query

            const stocks = await this.stockService.getAll({
                page: Number(page),
                limit: Number(limit),
                orderBy: String(orderBy),
                sortBy: String(sortBy)
            })

            res.status(200).json({ result: stocks })
        } catch (error) {
            if (!error.status) {
                res.status(500).json({ result: [], error: { code: 'UNKNOWN_ERROR', message: 'An unknown error occurred.' } })
            } else {
                res.status(error.status).json({ result: [], error: { code: error.code, message: error.message } })
            }
        }
    }

    async getStock(req: Request, res: Response): Promise<void> {
        const { ticker } = req.query
        const stock = await this.stockService.getStock(String(ticker))
        res.json({ result: [stock] }).send()
    }

    async getHighsStocks(req: Request, res: Response): Promise<void> {
        const stocks = await this.stockService.getHighsStocks()
        res.json({ result: stocks }).send()
    }

    async getDownsStocks(req: Request, res: Response): Promise<void> {
        const stocks = await this.stockService.getDownsStocks()
        res.json({ result: stocks }).send()
    }
}
