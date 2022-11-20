import { login } from '../models/user.model'
import { isString, notEmpty } from '../utils/utils'

const parseEmail = (emailFromRequest: any): string => {
  if (!isString(emailFromRequest) || notEmpty(emailFromRequest)) {
    throw new Error('Invalid Email')
  }
  return emailFromRequest
}

const parsePassword = (passwordFromRequest: any): string => {
  if (notEmpty(passwordFromRequest)) {
    throw new Error('Invalid Password')
  }
  return passwordFromRequest
}

export const toLogin = (object: any): login => {
  const login: login = {
    email: parseEmail(object.email),
    password: parsePassword(object.password)
  }
  return login
}
