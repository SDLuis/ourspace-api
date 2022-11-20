import { NewUserEntry, EditUserEntry, role } from '../models/user.model'
import { isString, notEmpty, isRole } from '../utils/utils'

const parseFirstName = (firstNameFromRequest: any): string => {
  if (!isString(firstNameFromRequest) || notEmpty(firstNameFromRequest)) {
    throw new Error('Invalid First Name')
  }
  return firstNameFromRequest
}

const parseLastName = (LastNameFromRequest: any): string => {
  if (!isString(LastNameFromRequest) || notEmpty(LastNameFromRequest)) {
    throw new Error('Invalid Last Name')
  }
  return LastNameFromRequest
}

const parseRole = (RoleFromRequest: any): role => {
  if (!isRole(RoleFromRequest) || notEmpty(RoleFromRequest)) {
    throw new Error('Invalid Role')
  }
  return RoleFromRequest
}

export const parseEmail = (emailFromRequest: any): string => {
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

export const toNewUser = (object: any): NewUserEntry => {
  const newUser: NewUserEntry = {
    First_Name: parseFirstName(object.First_Name),
    Last_Name: parseLastName(object.Last_Name),
    email: parseEmail(object.email),
    password: parsePassword(object.password)
  }
  return newUser
}
export const toEditUser = (object: any): EditUserEntry => {
  const newUser: EditUserEntry = {
    First_Name: parseFirstName(object.First_Name),
    Last_Name: parseLastName(object.Last_Name),
    role: parseRole(object.role),
    email: parseEmail(object.email),
    password: parsePassword(object.password)
  }
  return newUser
}
