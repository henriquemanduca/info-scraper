import express from 'express'

import CryptoController from '@controllers/CryptoController.js'


const cryptoRoutes = express.Router()
const controller = new CryptoController()

cryptoRoutes.get('/v1/ticker/:ticker', (req, res) => controller.getCryptoValue(req, res))
cryptoRoutes.get('/v1/highlighted/:max', (req, res) => controller.getTopCryptos(req, res))

export default cryptoRoutes
