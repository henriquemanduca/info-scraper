import { InferAttributes, InferCreationAttributes } from 'sequelize'
import { Column, DataType, Default, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import StockHistoryModel from './StockHistoryModel.js'


@Table({ tableName: 'stocks' })
export default class StockModel extends Model<InferAttributes<StockModel>, InferCreationAttributes<StockModel>> {

    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column({
        type: DataType.UUIDV4,
        allowNull: false,
    })
    id: string

    @Column({ type: DataType.STRING })
    title: string

    @Column({ type: DataType.STRING })
    ticker: string

    @Column({ type: DataType.DECIMAL })
    value: number

    @Column({ type: DataType.DECIMAL })
    variation: number

    @HasMany(() => StockHistoryModel)
    stockHistory: StockHistoryModel[]

    @Column({ type: DataType.DATE, field: 'created_at' })
    createdAt: Date

    @Column({ type: DataType.DATE, field: 'updated_at' })
    updatedAt: Date
}
