import CryptoDTO from '@dtos/CryptoDTO.js'
import ICryptoBrowserIntegrationPort from '@ports/output/ICryptoBrowserIntegrationPort.js'
import sources from '@shared/resource/index.js'
import PuppeteerIntegration from 'adapters/outbound/integration/PuppeteerIntegration.js'


export default class CryptoIntegrationAdapter implements ICryptoBrowserIntegrationPort {

    constructor(
        private browserIntegration = new PuppeteerIntegration()
    ) { }

    async getCrypto(ticker: string): Promise<CryptoDTO> {
        throw new Error('Method not implemented.')
    }

    async getCryptos(maxItems: number): Promise<CryptoDTO[]> {

        const page = await this.browserIntegration.createPage(sources.urls.coinmarketcap.main)

        const cryptosList = await page.evaluate((maxItems: number) => {
            const cryptos = []

            console.log(document)

            const rowsArray = Array.from(document.querySelectorAll('table[class*=\'cmc-table\'] > tbody > tr'))

            for (let index = 0; index <= (maxItems - 1); index++) {
                const columns = Array.from(rowsArray[index].querySelectorAll('td'))

                let title = ''
                let ticker = ''
                let value = '0'
                let variation = '0'
                let sign = ''

                columns.forEach((cl, i) => {
                    switch (i) {
                        case 2:
                            try {
                                title = cl.querySelectorAll('p')[0].textContent
                                ticker = cl.querySelectorAll('p')[1].textContent
                            } catch (error) {
                                title = 'error'
                                ticker = 'error'
                            }
                            break

                        case 3:
                            try {
                                value = cl.querySelectorAll('a')[0].textContent
                            } catch (error) {
                                value = '0'
                            }
                            break

                        case 4:
                            try {
                                variation = (cl.querySelector('span').textContent).replace(' ', '').replace('%', '')
                                sign = (cl.querySelectorAll('span[class^=\'icon-Caret-down\']').length > 0) ? '0' : '1'
                            } catch (error) {
                                variation = '0'
                            }
                            break

                        default:
                            break
                    }
                })

                cryptos.push({ title, ticker, value, variation, sign })
            }

            return cryptos
        }, maxItems)

        await page.close()
        return cryptosList
    }
}
