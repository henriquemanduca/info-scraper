import CryptoDTO from '@dtos/CryptoDTO.js'


export default interface ICryptoServicePort {
    getTopCryptos(max: number): Promise<CryptoDTO[]>
    getCryptoValue(ticker: string): Promise<CryptoDTO>
}
