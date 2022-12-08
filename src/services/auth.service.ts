/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-floating-promises */
import '../models/index'
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import {
  userModel,
  userEntry,
  NewUserEntry,
  IDecoded,
  NotSensistiveInfoUser,
  role
} from '../models/user.model'
import authConfig from '../config/auth.config'

export const getUser = (Users: userEntry[]): userEntry[] => {
  return Users
}

export const addUser = async (newUserEntry: NewUserEntry): Promise<NewUserEntry | Error> => {
  try {
    const newUser = {
      First_Name: newUserEntry.First_Name,
      Last_Name: newUserEntry.Last_Name,
      role: 'user' as role,
      user: newUserEntry.user,
      img: newUserEntry.img,
      img_ID: newUserEntry.img_ID,
      password: await bcrypt.hash(
        newUserEntry.password.toString(),
        +authConfig.rounds
      )
    }
    const user = await userModel.findOne({ where: { user: newUser.user } })
    if (user) {
      const Error: Error = {
        name: 'User always exist',
        message: 'This user is not available'
      }
      return Error
    } else {
      await userModel.create(newUser)
      return newUser
    }
  } catch (e: any) {
    return e.message
  }
}

export const Login = async (
  authParams: any
): Promise<any> => {
  try {
    const user = await userModel.findOne({
      where: { user: authParams.user }
    })
    const role = user?.role

    if (user) {
      const validPassword = await bcrypt.compare(
        authParams.password.toString(),
        user.password
      )
      if (validPassword) {
        const token = jsonwebtoken.sign(
          { id: user.User_ID, name: `${user.First_Name} ${user.Last_Name}`, user: user.user, img: user.img },
          'ourspace',
          {
            expiresIn: '24h'
          }
        )
        const res = {
          token,
          role
        }
        return res
      } else {
        const Error: Error = {
          name: 'Error password',
          message: 'Invalid or wrong password'
        }
        return Error
      }
    } else {
      const Error: Error = {
        name: 'Error user',
        message: 'Invalid or wrong user'
      }
      return Error
    }
  } catch (e: any) {
    return e.message
  }
}

export const auth = async (
  token: string
): Promise<NotSensistiveInfoUser | string | undefined> => {
  try {
    const decoded = (jsonwebtoken.verify(
      token,
      'ourspace'
    )) as IDecoded
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!decoded) {
      return 'unauthenticated'
    } else {
      const user = (await userModel.findOne({
        where: { User_ID: decoded.id },
        attributes: { exclude: ['password'] }
      })) as NotSensistiveInfoUser
      return user
    }
  } catch (e: any) {
    return e.message
  }
}
