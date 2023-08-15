import { plainToInstance } from 'class-transformer'

import StockDTO from '@dtos/StockDTO.js'
import StockHistoryMapper from './StockHistoryMapper.js'


export default class StockMapper {
    constructor(
        public id?: string,
        public title?: string,
        public ticker?: string,
        public value?: number,
        public variation?: number,
        public createAt?: Date,
        public updateAt?: Date,
        public history?: StockHistoryMapper[]
    ) { }

    public static fromDTO(dto: StockDTO): StockMapper {
        return plainToInstance(StockMapper, dto)
    }

    public static toDTO(mapper: StockMapper): StockDTO {
        return plainToInstance(StockDTO, mapper)
    }
}
