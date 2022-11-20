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
export const getUsersWithoutSensitiveInfo = (Jobs: NotSensistiveInfoUser[]): NotSensistiveInfoUser[] => {
  return Jobs.map(({ User_ID, First_Name, Last_Name, role, email }) => {
    return {
      User_ID, First_Name, Last_Name, role, email
    }
  })
}

export const editUser = async (id: number, editUserEntry: EditUserEntry): Promise<number> => {
  const editUser = {
    First_Name: editUserEntry.First_Name,
    Last_Name: editUserEntry.Last_Name,
    role: editUserEntry.role,
    email: editUserEntry.email,
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
  return userModel.findOne({ where: { User_ID: id } }) as any
}
export const findUserByEmail = (email: string): Promise<userEntry[]> | undefined => {
  return userModel.findOne({ where: { email: email } }) as any
}

export const deleteUser = (id: number): Promise<number> | undefined => {
  return userModel.destroy({ where: { User_ID: id } }) as any
}