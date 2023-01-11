import { NewFollowerEntry } from '../models/follower.model'
import { notEmpty, isNumber } from '../utils/utils'

const parseUserID = (userIDFromRequest: any): number => {
  if (!isNumber(userIDFromRequest) || notEmpty(userIDFromRequest)) {
    throw new Error('Invalid User ID')
  }
  return userIDFromRequest
}
const parseFollowerID = (followerIDFromRequest: any): number => {
  if (!isNumber(followerIDFromRequest) || notEmpty(followerIDFromRequest)) {
    throw new Error('Invalid User ID')
  }
  return followerIDFromRequest
}

export const toNewFollower = (userIdFromRequest: any, followerIDFromRequest: any): NewFollowerEntry => {
  const newFollower: NewFollowerEntry = {
    User_ID: parseUserID(userIdFromRequest),
    Follower_ID: parseFollowerID(followerIDFromRequest)

  }
  return newFollower
}
