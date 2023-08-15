import { Sequelize } from 'sequelize-typescript'

import Models from '@models/index.js'
import log from '@shared/log/index.js'


export class Connection {
    private static NAMESPACE = 'CONNECTION'
    private static instance: Sequelize

    public static getInstance(): Sequelize {
        try {
            if (!Connection.instance) {
                Connection.instance = new Sequelize({
                    dialect: 'postgres',
                    host: process.env.DATABASE_HOST,
                    database: process.env.DATABASE_NAME,
                    username: process.env.DATABASE_USERNAME,
                    password: process.env.DATABASE_PASSWORD,
                    port: 5432,
                })
            }
            return Connection.instance
        } catch (error) {
            log.error(this.NAMESPACE, 'There was an error when get the connection instance!', error)
            throw error
        }
    }

    public static async testConnection(): Promise<void> {
        const sequelize = Connection.getInstance()
        try {
            log.info(this.NAMESPACE, 'Testing connection...')
            await sequelize.authenticate()
            await Connection.syncModels()
        } catch (error) {
            log.error(this.NAMESPACE, 'There was an error when testing connection!', error)
            throw error
        }
    }

    public static async syncModels(): Promise<void> {
        const sequelize = Connection.getInstance()
        try {
            sequelize.addModels(Models)
        } catch (error) {
            log.error(this.NAMESPACE, 'There was an error when synchronize models!', error)
            throw error
        }
    }
}
