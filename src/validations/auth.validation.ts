import { login } from '../models/user.model'
import { isString, notEmpty } from '../utils/utils'

const parseuser = (userFromRequest: any): string => {
  if (!isString(userFromRequest) || notEmpty(userFromRequest)) {
    throw new Error('Invalid user')
  }
  return userFromRequest
}

const parsePassword = (passwordFromRequest: any): string => {
  if (notEmpty(passwordFromRequest)) {
    throw new Error('Invalid Password')
  }
  return passwordFromRequest
}

export const toLogin = (object: any): login => {
  const login: login = {
    user: parseuser(object.user),
    password: parsePassword(object.password)
  }
  return login
}
