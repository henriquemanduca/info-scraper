import NodeCache from 'node-cache'

import ICacheIntegrationPort from '@ports/output/ICacheIntegrationPort.js'


export default class NodeCacheIntegrationAdapter implements ICacheIntegrationPort {

    constructor(
        private cache = new NodeCache({
            stdTTL: Number(process.env.CACHE_TTL)
        })
    ) { }

    save<T>(key: string, obj: T): boolean {
        return this.cache.set(key, obj)
    }

    get<T>(key: string): T | undefined {
        return this.cache.get(key)
    }

    take<T>(key: string): T | undefined {
        return this.cache.take(key)
    }
}
