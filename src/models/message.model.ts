import {
  Column,
  Model,
  Table,
  DataType,
  NotEmpty,
  AllowNull
} from 'sequelize-typescript'

export interface IMessage {
  Message_ID?: number
  Conversation_ID?: number
  Sender_ID?: number
  description?: string
  createdAt: Date
  updatedAt: Date
  userModel: object
}

export type messageEntry = IMessage
export type NewMessageEntry = Omit<IMessage, 'Message_ID' | 'userModel' | 'createdAt' | 'updatedAt'>
export type IMessageWithoutUserModel = Omit<IMessage, 'userModel'>

@Table({
  tableName: 'message',
  timestamps: true
})

export class messageModel extends Model implements IMessageWithoutUserModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
    Message_ID: number | undefined

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
    Conversation_ID: number | undefined

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
    Sender_ID: number | undefined

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(1000)
  })
    description!: string

  @Column({
    type: DataType.DATE
  })
    createdAt!: Date

  @Column({
    type: DataType.DATE
  })
    updatedAt!: Date
}
