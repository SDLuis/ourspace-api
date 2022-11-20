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
  Product_Type: postType
  User_ID?: number
  img: string
  img_ID: string
  description: string
  createdAt: Date
  updatedAt: Date
  userModel: object
  commentModel: object
}

export type postEntry = IPost
export type NotSensistiveInfoPost = Omit<IPost, 'User_ID' | 'userModel'>
export type NewPostEntry = Omit<IPost, 'Post_ID' | 'userModel' | 'commentModel' | 'createdAt' | 'updatedAt'>
export type IPostWithoutUserAndCommentModel = Omit<IPost, 'userModel' | 'commentModel'>

@Table({
  tableName: 'post',
  timestamps: true
})

export class postModel extends Model implements IPostWithoutUserAndCommentModel {
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
    Product_Type!: postType

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(1000)
  })
    img!: string

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(1000)
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
