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

export const parseRole = (RoleFromRequest: any): role => {
  if (!isRole(RoleFromRequest) || notEmpty(RoleFromRequest)) {
    throw new Error('Invalid Role')
  }
  return RoleFromRequest
}

export const parseUser = (userFromRequest: any): string => {
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

export const toNewUser = (object: any): NewUserEntry => {
  const newUser: NewUserEntry = {
    First_Name: parseFirstName(object.First_Name),
    Last_Name: parseLastName(object.Last_Name),
    user: parseUser(object.user),
    password: parsePassword(object.password),
    img: object.img,
    img_ID: object.img_ID
  }
  return newUser
}
export const toEditUser = (object: any): EditUserEntry => {
  const newUser: EditUserEntry = {
    First_Name: parseFirstName(object.First_Name),
    Last_Name: parseLastName(object.Last_Name),
    role: object.role,
    Location: object.Location,
    Date_Of_Birth: object.Date_Of_Birth,
    user: parseUser(object.user),
    password: parsePassword(object.password),
    img: object.img,
    img_ID: object.img_ID
  }
  return newUser
}
