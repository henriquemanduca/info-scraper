import StockMapper from '@mappers/StockMapper.js'
import StocksByType from '@mappers/StocksByTypeMapper.js'
import IStockBrowserIntegrationPort from '@ports/output/IStockBrowserIntegrationPort.js'
import log from '@shared/log/index.js'
import sources from '@shared/resource/index.js'
import { formatStock, formatValue, formatVariation } from '@shared/shared.utils.js'
import { HighlightedType } from 'adapters/enums/HighlightedType.js'
import PuppeteerIntegration from 'adapters/outbound/integration/PuppeteerIntegration.js'


export default class StockIntegrationAdapter implements IStockBrowserIntegrationPort {

    private NAMESPACE = 'StockIntegrationAdapter'

    constructor(
        private browserIntegration = new PuppeteerIntegration()
    ) { }

    private getTreatedStocksData(tables: Array<any>): StocksByType[] {
        const stocksByType = tables.map((table, index) => {
            const items = table.map((row: Array<string>) => {
                return {
                    ticker: formatStock(row[0]),
                    value: formatValue(row[2]),
                    variation: formatVariation(row[1])
                } as StockMapper
            })

            switch (index) {
                case 0: return { type: HighlightedType.MostHigh, items }
                case 2: return { type: HighlightedType.MostDown, items }
                default: return { type: HighlightedType.MostSell, items }
            }
        })

        return stocksByType
    }

    async getStockTitle(ticker: string): Promise<string | null> {
        const urlPage = `${sources.urls.uol.stockDetail}/${ticker.toLowerCase()}-sa/`

        let page: any

        try {
            page = await this.browserIntegration.createPage(urlPage)
        } catch (error) {
            log.error(this.NAMESPACE, 'error on create page', error)
            return null
        }

        try {
            const title = await page.evaluate(() => {
                return document.querySelectorAll('h2[class=\'title-name\']')[0].innerHTML ?? null
            })
            return title.trim()
        } catch (error) {
            log.error(this.NAMESPACE, 'erro on evaluate title', error)
            await page.close()
            return null
        }
    }

    async getHighlightedStocks(): Promise<StocksByType[]> {
        let page: any
        let highlightedDataTables: Array<any>

        try {
            page = await this.browserIntegration.createPage(sources.urls.uol.main)
        } catch (error) {
            log.error(this.NAMESPACE, 'error on create page', error)
            return []
        }

        try {
            highlightedDataTables = await page.evaluate(() => {
                const tablesArray = Array.from(document.querySelectorAll('table[class=\'data-table\']'))

                const tables = tablesArray.map((table) => {
                    const tableRows = Array.from(table.querySelectorAll('tbody tr'))

                    const rows = tableRows.map(tr => {
                        const tds = Array.from(tr.querySelectorAll('td'))
                        return tds.map(td => td.textContent)
                    })

                    return rows
                })

                return tables
            })
        } catch (error) {
            log.error(this.NAMESPACE, 'error on evaluate page', error)
            await page.close()
            return []
        }

        await page.close()

        return this.getTreatedStocksData(highlightedDataTables)
    }

    async getHighlightedStocksFilter(requiredType: HighlightedType): Promise<StockMapper[]> {
        const stocks = await this.getHighlightedStocks()

        const filtered = stocks.find(item => item.type === requiredType).items

        return filtered.map((item) => StockMapper.fromDTO(item))
    }
}
