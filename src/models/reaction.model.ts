import {
  Column,
  Model,
  Table,
  DataType,
  NotEmpty,
  AllowNull,
  Default
} from 'sequelize-typescript'

export enum reactionType {
  like = 'Like',
  amazed = 'Amazed',
  love = 'Love',
  dislike = 'Dislike',
  funny = 'Funny'
}

export interface IReaction {
  Reaction_ID?: number
  User_ID?: number
  Post_ID?: number
  reactionType: reactionType
  createdAt: Date
  updatedAt: Date
  userModel: object
  postModel: object
}

export type reactionEntry = IReaction
export type NewReactionEntry = Omit<IReaction, 'Reaction_ID' | 'userModel' | 'postModel' | 'createdAt' | 'updatedAt'>
export type IReactionWithoutUserAndPostModel = Omit<IReaction, 'userModel' | 'postModel'>

@Table({
  tableName: 'reaction',
  timestamps: true
})

export class reactionModel extends Model implements IReactionWithoutUserAndPostModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
    Reaction_ID: number | undefined

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
    User_ID: number | undefined

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
    Post_ID: number | undefined

  @NotEmpty
  @AllowNull(false)
  @Default('Like')
  @Column({
    type: DataType.STRING(1000)
  })
    reactionType!: reactionType

  @Column({
    type: DataType.DATE
  })
    createdAt!: Date

  @Column({
    type: DataType.DATE
  })
    updatedAt!: Date
}
