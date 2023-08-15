import IStockServicePort from '@ports/input/IStockServicePort.js'

import StockService from './StockService.js'


describe('Service Stock', () => {

    let service: IStockServicePort

    beforeAll(() => {
        service = new StockService()
    })

    it('should get high values stocks', async () => {
        const result = service.getHighsStocks()
        expect(result).toBe([])
    })

})
