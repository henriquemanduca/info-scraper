export default interface ICacheIntegrationPort {
    save<T>(key: string, obj: T): boolean
    get<T>(key: string): T | undefined
    take<T>(key: string): T | undefined
}