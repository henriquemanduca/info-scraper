import { Request, Response } from 'express'

import CryptoService from '@application/service/CryptoService.js'
import ICryptoControllerPort from '@ports/input/ICryptoControllerPort.js'
import ICryptoServicePort from '@ports/input/ICryptoServicePort.js'


export default class CryptoController implements ICryptoControllerPort {

    constructor(
        private cryptoService: ICryptoServicePort = new CryptoService()
    ) { }

    async getCryptoValue(req: Request, res: Response): Promise<any> {
        const { ticker } = req.params
        const crypto = await this.cryptoService.getCryptoValue(ticker)
        return res.json(crypto)
    }

    async getTopCryptos(req: Request, res: Response): Promise<any> {
        const { max } = req.query
        const cryptos = await this.cryptoService.getTopCryptos(Number(max))
        return res.json(cryptos)
    }
}
