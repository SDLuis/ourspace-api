import bcrypt from 'bcrypt'
import { Op } from 'sequelize'
import authConfig from '../config/auth.config'
import '../models/index'
import { userEntry, NotSensistiveInfoUser, EditUserEntry, userModel } from '../models/user.model'

export const getUsers = async (limitParam: number, offsetParam: number): Promise<userEntry[]> => {
  return await userModel
    .findAll({
      offset: +offsetParam,
      limit: +limitParam,
      order: [
        ['User_ID', 'DESC']
      ]
    })
    .then((result) => {
      return result
    })
}

/* eslint-disable */
export const getUsersWithoutSensitiveInfo = (User: NotSensistiveInfoUser[]): NotSensistiveInfoUser[] => {
  return User.map(({ User_ID, First_Name, Last_Name, Location, Date_Of_Birth, role, user, img, img_ID, cover, cover_ID }) => {
    return {
      User_ID, First_Name, Last_Name, Location, Date_Of_Birth, role, user, img, img_ID, cover, cover_ID
    }
  })
}

export const editUser = async (id: number, editUserEntry: EditUserEntry): Promise<number> => {
  const editUser = {
    First_Name: editUserEntry.First_Name,
    Last_Name: editUserEntry.Last_Name,
    Location: editUserEntry.Location,
    Date_Of_Birth: editUserEntry.Date_Of_Birth,
    role: editUserEntry.role,
    user: editUserEntry.user,
    img: editUserEntry.img,
    img_ID: editUserEntry.img_ID,
    password: await bcrypt.hash(
      editUserEntry.password.toString(),
      +authConfig.rounds
    )
  }
  const result = await userModel.update(editUser, { where: { User_ID: id } }).then(result => {
    return result
  })
  return +result
}
export const editCover = async (id: number, editCover: any ): Promise<number> => {
  const editUser = {
    cover: editCover.cover,
    cover_ID: editCover.cover_ID,
  }
  const result = await userModel.update(editUser, { where: { User_ID: id } }).then(result => {
    return result
  })
  return +result
}
export const findUser = (id: number): Promise<userEntry[]> | undefined => {
  return userModel.findOne({ attributes: {exclude: ['password']}, where: { User_ID: id } }) as any
}
export const findUserByUser = (user: string): Promise<userEntry[]> | undefined => {
  return userModel.findAll({ attributes: {exclude: ['password']}, where: { user:{ [Op.like]: `%${user}%` }} }) as any
}

export const deleteUser = (id: number): Promise<number> | undefined => {
  return userModel.destroy({ where: { User_ID: id } })
}