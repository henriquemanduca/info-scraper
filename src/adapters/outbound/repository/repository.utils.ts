import { Connection } from '@application/database/Connection.js'


export async function withTransaction<T>(fn: () => Promise<T>): Promise<T> {
    const trans = await Connection.getInstance().transaction()
    try {
        const result = await fn()
        await trans.commit()
        return result
    } catch (error) {
        await trans.rollback()
        throw error
    }
}
