import { v4 } from 'uuid'


export default class MockRepository {
    private db = []

    public create(data: Omit<any, 'id'>): any {
        const temp = { id: v4(), ...data }
        this.db.push(temp)
        return temp
    }

    public getById(id: string): any| null {
        return this.db.find(it => { it.id === id})
    }

    public getAll(pagenation: any): any {
        return this.db
    }

    public update(id: string, data: Partial<any>): any| null {
        const index = this.db.findIndex(it => { it.id === id })
        if (index === -1) return null
        return this.db[index]
    }

    public delete(id: string): boolean {
        const index = this.db.findIndex(it => { it.id === id })
        if (index === -1) return false
        this.db = this.db.map(it => it !== id)
        return true
    }
}
