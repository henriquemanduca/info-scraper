import express from 'express'

import StockController from '@controllers/StockController.js'


const stockRoutes = express.Router()
const stockController = new StockController()

stockRoutes.get('/v1/all', (req, res) => stockController.getAll(req, res))
stockRoutes.get('/v1/ticker/:ticker', (req, res) => stockController.getStock(req, res))
stockRoutes.get('/v1/highs', (req, res) => stockController.getHighsStocks(req, res))
stockRoutes.get('/v1/downs', (req, res) => stockController.getDownsStocks(req, res))

export default stockRoutes
