import CryptoDTO from '@dtos/CryptoDTO.js'


export default interface ICryptoBrowserIntegrationPort {
    getCrypto(ticker: string): Promise<CryptoDTO>
    getCryptos(max: number): Promise<CryptoDTO[]>
}
