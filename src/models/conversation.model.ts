import {
  Column,
  Model,
  Table,
  DataType,
  NotEmpty,
  AllowNull
} from 'sequelize-typescript'

export interface IConversation {
  Conversation_ID?: number
  members?: string[]
  createdAt: Date
  updatedAt: Date
  userModel: object
}

export type conversationEntry = IConversation
export type NewConversationEntry = Omit<IConversation, 'Conversation_ID' | 'userModel' | 'createdAt' | 'updatedAt'>
export type IConversationWithoutUserModel = Omit<IConversation, 'userModel'>

@Table({
  tableName: 'conversation',
  timestamps: true
})

export class conversationModel extends Model implements IConversationWithoutUserModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
    Conversation_ID: number | undefined

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.ARRAY(DataType.STRING)
  })
    members: string[] | undefined

  @Column({
    type: DataType.DATE
  })
    createdAt!: Date

  @Column({
    type: DataType.DATE
  })
    updatedAt!: Date
}
