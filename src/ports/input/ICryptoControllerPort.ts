import { Request, Response } from 'express'


export default interface ICryptoControllerPort {
    getTopCryptos(req: Request, res: Response): Promise<any>
    getCryptoValue(req: Request, res: Response): Promise<any>
}
