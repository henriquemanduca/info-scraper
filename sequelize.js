import { config } from 'dotenv'
config()


export default {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
    // dialectOptions: {
    //     ssl: {
    //         require: 'false'
    //     }
    // }
}
