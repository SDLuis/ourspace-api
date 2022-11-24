import bcrypt from 'bcrypt'
import authConfig from '../config/auth.config'
import '../models/index'
import { userEntry, NotSensistiveInfoUser, EditUserEntry, userModel } from '../models/user.model'

export const getUsers = async (): Promise<userEntry[]> => {
  return await userModel
    .findAll({
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
  return User.map(({ User_ID, First_Name, Last_Name, role, user }) => {
    return {
      User_ID, First_Name, Last_Name, role, user
    }
  })
}

export const editUser = async (id: number, editUserEntry: EditUserEntry): Promise<number> => {
  const editUser = {
    First_Name: editUserEntry.First_Name,
    Last_Name: editUserEntry.Last_Name,
    role: editUserEntry.role,
    user: editUserEntry.user,
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

export const findUser = (id: number): Promise<userEntry[]> | undefined => {
  return userModel.findOne({ attributes: {exclude: ['password']}, where: { User_ID: id } }) as any
}
export const findUserByUser = (user: string): Promise<userEntry[]> | undefined => {
  return userModel.findOne({ attributes: {exclude: ['password']}, where: { user: user } }) as any
}

export const deleteUser = (id: number): Promise<number> | undefined => {
  return userModel.destroy({ where: { User_ID: id } })
}