import {
  Column,
  Model,
  Table,
  DataType,
  NotEmpty,
  AllowNull
} from 'sequelize-typescript'

export enum postType {
  public = 'Public',
  friends = 'Just Friends',
  private = 'Private'
}
export interface IPost {
  Post_ID?: number
  Post_Type: postType
  User_ID?: number
  Location?: string
  img: string
  img_ID: string
  description: string
  createdAt: Date
  updatedAt: Date
  userModel: object
  commentModel: object
  reactionModel: object

}

export type postEntry = IPost
export type NotSensistiveInfoPost = Omit<IPost, 'userModel'>
export type NewPostEntry = Omit<IPost, 'Post_ID' | 'userModel' | 'commentModel' | 'reactionModel' | 'createdAt' | 'updatedAt'>
export type IPostWithoutModels = Omit<IPost, 'userModel' | 'commentModel' | 'reactionModel'>

@Table({
  tableName: 'post',
  timestamps: true
})

export class postModel extends Model implements IPostWithoutModels {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
    Post_ID: number | undefined

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER
  })
    User_ID: number | undefined

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50)
  })
    Post_Type!: postType

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(30)
  })
    Location?: string | undefined

  @NotEmpty
  @AllowNull(true)
  @Column({
    type: DataType.STRING(100)
  })
    img!: string

  @NotEmpty
  @AllowNull(true)
  @Column({
    type: DataType.STRING(50)
  })
    img_ID!: string

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
