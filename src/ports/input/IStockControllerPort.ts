import { Request, Response } from 'express'


export default interface IStockControllerPort {
    getAll(req: Request, res: Response): Promise<void>
    getStock(req: Request, res: Response): Promise<void>
    getHighsStocks(req: Request, res: Response): Promise<void>
    getDownsStocks(req: Request, res: Response): Promise<void>
}
