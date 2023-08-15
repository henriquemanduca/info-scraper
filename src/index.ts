import dotenv from 'dotenv'

import { Bootstrap } from '@application/Bootstrap.js'
import { Connection } from '@application/database/Connection.js'


async function start(): Promise<void> {
    dotenv.config()
    await Connection.testConnection()
    new Bootstrap()
}

start()
