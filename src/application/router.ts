import express from 'express'

import cryptoRoutes from '@routes/CryptoRoutes.js'
import stockRoutes from '@routes/StockRoutes.js'


const routes = express.Router()

routes.use('/cryptos', cryptoRoutes)
routes.use('/stocks', stockRoutes)

export default routes
