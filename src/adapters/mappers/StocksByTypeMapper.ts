import { HighlightedType } from 'adapters/enums/HighlightedType.js'
import StockMapper from './StockMapper.js'


export default class StocksByTypeMapper {
    type: HighlightedType
    items: StockMapper[]
}
