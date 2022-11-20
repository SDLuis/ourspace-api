import { role } from '../models/user.model'

export const onlyAdmin = (role: role): string | boolean | undefined => {
  if (role === 'admin') {
    return true
  } else {
    return 'Access denied'
  }
}

export const accessToAdd = (role: role): string | boolean | undefined => {
  if (role === 'admin') {
    return true
  } else {
    return 'Access denied'
  }
}

export const ownerAccess = (user: any, job: any, role: role): string | boolean | undefined => {
  if (user === job || role === 'admin') {
    return true
  } else {
    return 'Access denied'
  }
}
