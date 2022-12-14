import {
  Column,
  Model,
  Table,
  DataType,
  NotEmpty,
  AllowNull
} from 'sequelize-typescript'

export interface IFollower {
  ID?: number
  Follower_ID?: number
  User_ID?: number
  createdAt: Date
  userModel: object
}

export type followerEntry = IFollower
export type NewFollowerEntry = Omit<IFollower, 'ID' | 'userModel' | 'createdAt'>
export type IFollowerWithoutUserModel = Omit<IFollower, 'userModel' >

@Table({
  tableName: 'follower',
  timestamps: true
})

export class followerModel extends Model implements IFollowerWithoutUserModel {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
    ID: number | undefined

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
    Follower_ID: number | undefined

  @Column({
    type: DataType.DATE
  })
    createdAt!: Date
}
