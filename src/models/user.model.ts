import {
  Column,
  DataType,
  Model,
  NotEmpty,
  Table,
  AllowNull,
  Unique,
  Default
} from 'sequelize-typescript'
import { JwtPayload } from 'jsonwebtoken'

export interface CustomRequest extends Request {
  token: string | JwtPayload
  user: number
}

export enum role {
  Admin = 'admin',
  VerifyUser = 'verify user',
  User = 'user'
}
export interface IUser {
  User_ID?: number | null
  First_Name: string
  Last_Name: string
  Date_Of_Birth: Date
  Location: string
  role: role
  img: string
  img_ID: string
  cover: string
  cover_ID: string
  user: string
  password: any
}

export interface login {
  user: string
  password: string
}

export interface IDecoded {
  id: number
  iat: number
  exp: number
}

export type userEntry = IUser
export type NotSensistiveInfoUser = Omit<IUser, 'password'>
export type NewUserEntry = Omit<IUser, 'User_ID' | 'role' | 'Location' | 'cover' | 'cover_ID' | 'Date_Of_Birth'>
export type EditUserEntry = Omit<IUser, 'User_ID' | 'cover' | 'cover_ID' >

@Table({
  tableName: 'user',
  timestamps: false
})

export class userModel extends Model implements IUser {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true
  })
    User_ID: number | null | undefined

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50)
  })
    First_Name!: string

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50)
  })
    Last_Name!: string

  @NotEmpty
  @AllowNull(true)
  @Column({
    type: DataType.DATEONLY
  })
    Date_Of_Birth!: Date

  @NotEmpty
  @AllowNull(true)
  @Default('user')
  @Column({
    type: DataType.STRING(50)
  })
    role!: role

  @Unique
  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(50)
  })
    user!: string

  @NotEmpty
  @AllowNull(false)
  @Column({
    type: DataType.STRING(100)
  })
    password!: string

  @AllowNull(true)
  @Column({
    type: DataType.STRING(60)
  })
    Location!: string

  @AllowNull(true)
  @Column({
    type: DataType.STRING(100)
  })
    img!: string

  @AllowNull(true)
  @Column({
    type: DataType.STRING(50)
  })
    img_ID!: string

  @AllowNull(true)
  @Column({
    type: DataType.STRING(100)
  })
    cover!: string

  @AllowNull(true)
  @Column({
    type: DataType.STRING(50)
  })
    cover_ID!: string
}
