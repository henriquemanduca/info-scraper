import { plainToInstance } from 'class-transformer'

import StockHistoryDTO from '@dtos/StockHistoryDTO.js'
import { HighlightedType } from 'adapters/enums/HighlightedType.js'


export default class StockHistoryMapper {
    constructor(
        public id?: string,
        public stockId?: string,
        public value?: number,
        public variation?: number,
        public typeRef?: HighlightedType,
        public createAt?: Date,
    ) { }

    public static fromDTO(dto: StockHistoryDTO): StockHistoryMapper {
        return plainToInstance(StockHistoryMapper, dto)
    }

    public static toDTO(mapper: StockHistoryMapper): StockHistoryDTO {
        return plainToInstance(StockHistoryDTO, mapper)
    }
}
