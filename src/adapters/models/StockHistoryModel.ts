import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Column, DataType, Default, ForeignKey, Model, PrimaryKey, Table } from 'sequelize-typescript'

import { HighlightedType } from 'adapters/enums/HighlightedType.js'
import StockModel from './StockModel.js'


@Table({ tableName: 'stock_history', updatedAt: false })
export default class StockHistoryModel extends Model<InferAttributes<StockHistoryModel>, InferCreationAttributes<StockHistoryModel>> {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    id: string

    @ForeignKey(() => StockModel)
    @Column({
        field: 'stock_id',
        type: DataType.UUIDV4,
        allowNull: false,
    })
    stockId: string

    @Column({ type: DataType.DECIMAL })
    value: number

    @Column({ type: DataType.DECIMAL })
    variation: number

    @Column({
        field: 'type_ref',
        type: DataType.ENUM({ values: Object.values(HighlightedType) }),
        allowNull: true,
    })
    typeRef: string

    @Column({
        field: 'created_at',
        type: DataType.DATE
    })
    createdAt: Date
}
