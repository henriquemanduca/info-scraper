// import PromisePool from '@supercharge/promise-pool'

import CryptoDTO from '@dtos/CryptoDTO.js'
import ICryptoServicePort from '@ports/input/ICryptoServicePort.js'
import ICacheIntegrationPort from '@ports/output/ICacheIntegrationPort.js'
import ICryptoBrowserIntegrationPort from '@ports/output/ICryptoBrowserIntegrationPort.js'
import CryptoIntegrationAdapter from 'adapters/outbound/CryptoIntegrationAdpater.js'
import NodeCacheIntegrationAdapter from 'adapters/outbound/NodeCacheIntegrationAdapter.js'
import BaseService from './BaseService.js'


export default class CryptoService extends BaseService implements ICryptoServicePort {

    private TOP_CRYPTOS_KEY = 'topCryptos'

    constructor(
        private browserIntegration: ICryptoBrowserIntegrationPort = new CryptoIntegrationAdapter(),
        private cacheIntegration: ICacheIntegrationPort = new NodeCacheIntegrationAdapter()
    ) {
        super()
        this.NAMESPACE = 'CryptoService'
    }

    // private save(cryptos: CryptoDTO[]): void {
    //     await PromisePool
    //         .for(cryptosArray)
    //         .withConcurrency(3)
    //         .process(async (cp: ICryptoBrowser) => {
    //             if (!cp.ticker) return

    //             const value = Number(Utils.onlyNumbers(String(cp.value))) / 100
    //             const variation = (cp.sign > 0)
    //                 ? (Number(Utils.onlyNumbers(String(cp.variation))) / 100)
    //                 : (Number(Utils.onlyNumbers(String(cp.variation))) / 100) * -1

    //             const newCrypto = await this.createCryptoService.execute({
    //                 title: cp.title,
    //                 ticker: cp.ticker,
    //                 value,
    //                 variation
    //             })

    //             await this.createCryptoHistoryService.execute({
    //                 crypto: newCrypto,
    //                 value,
    //                 variation
    //             })
    //         })
    // }

    async getCryptoValue(ticker: string): Promise<CryptoDTO> {
        this.log.info(this.NAMESPACE, `Loading ${ticker} crypto values`)

        return new CryptoDTO()
    }

    async getTopCryptos(max: number = 5): Promise<CryptoDTO[]> {
        this.log.info(this.NAMESPACE, `Loading top ${max} cryptos values`)

        let cryptos = this.cacheIntegration.get<CryptoDTO[]>(this.TOP_CRYPTOS_KEY)

        if (cryptos === undefined) {
            cryptos = await this.browserIntegration.getCryptos(max)

            //this.save(cryptos)

            this.cacheIntegration.save(this.TOP_CRYPTOS_KEY, cryptos)
        }

        return cryptos
    }
}