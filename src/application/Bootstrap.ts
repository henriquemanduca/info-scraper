import express from 'express'

import ICronServicePort from '@ports/input/ICronServicePort.js'
import ICryptoServicePort from '@ports/input/ICryptoServicePort.js'
import IStockServicePort from '@ports/input/IStockServicePort.js'
import log from '@shared/log/index.js'
import routes from './router.js'
import CronService from './service/CronService.js'
import CryptoService from './service/CryptoService.js'
import StockService from './service/StockService.js'


export class Bootstrap {
    private NAMESPACE = 'BootStrap'

    constructor(
        private cronService: ICronServicePort = new CronService(),
        private cryptoService: ICryptoServicePort = new CryptoService(),
        private stockService: IStockServicePort = new StockService(),
    ) {
        this.start()
    }

    private cronCryptoScraper(): void {
        log.info(this.NAMESPACE, 'cronCryptoScraper called')

        this.cryptoService.getTopCryptos(5)
    }

    private cronStockScraper(): void {
        log.info(this.NAMESPACE, 'cronStockScraper called')

        this.stockService
            .syncHighlightedStocks()
            .then(() => log.info(this.NAMESPACE, 'syncHighlightedTables done'))
    }

    private startExpress(): void {
        const app = express()

        app.use(express.json())
        app.use('/infoscraper', routes)

        const port = process.env.APP_PORT || 3000
        app.listen(port, () => {
            log.info(this.NAMESPACE, `Server on port ${port}`)
        })
    }

    private start(): void {
        log.info(this.NAMESPACE, 'Started')
        this.startExpress()
        this.cronService.newCron('0 */1 * * *', this.cronStockScraper.bind(this))
    }
}
