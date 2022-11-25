import {
  Column,
  Model,
  Table,
  DataType,
  NotEmpty,
  AllowNull
} from 'sequelize-typescript'

export interface IComment {
  Comment_ID?: number
  User_ID?: number
  Post_ID?: number
  description: string
  createdAt: Date
  updatedAt: Date
  userModel: object
  postModel: object
}

export type commentEntry = IComment
export type NewCommentEntry = Omit<IComment, 'Comment_ID' | 'userModel' | 'postModel' | 'createdAt' | 'updatedAt'>
export type EditCommentEntry = Pick<IComment, 'description'>
export type ICommentWithoutUserAndPostModel = Omit<IComment, 'userModel' | 'postModel'>

@Table({
  tableName: 'comment',
  timestamps: true
})

export class commentModel extends Model implements ICommentWithoutUserAndPostModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
    Comment_ID: number | undefined

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
