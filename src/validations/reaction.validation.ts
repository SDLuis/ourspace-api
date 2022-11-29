import { NewReactionEntry, reactionType } from '../models/reaction.model'
import { isReactionType, notEmpty, isNumber } from '../utils/utils'

export const parseReaction = (reactionFromRequest: any): reactionType => {
  if (!isReactionType(reactionFromRequest) || notEmpty(reactionFromRequest)) {
    throw new Error('Invalid Reaction')
  }
  return reactionFromRequest
}
const parseUserID = (userIDFromRequest: any): number => {
  if (!isNumber(userIDFromRequest) || notEmpty(userIDFromRequest)) {
    throw new Error('Invalid User ID')
  }
  return userIDFromRequest
}

const parsePostID = (postIDFromRequest: any): number => {
  if (!isNumber(postIDFromRequest) || notEmpty(postIDFromRequest)) {
    throw new Error('Invalid Post ID')
  }
  return postIDFromRequest
}

export const toNewReaction = (object: any, userIdFromRequest: any): NewReactionEntry => {
  const newReaction: NewReactionEntry = {
    Post_ID: parsePostID(object.Post_ID),
    User_ID: parseUserID(userIdFromRequest),
    reactionType: parseReaction(object.reactionType)
  }
  return newReaction
}
