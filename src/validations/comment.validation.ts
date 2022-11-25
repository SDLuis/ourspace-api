import { isString, isNumber, notEmpty } from '../utils/utils'
import { NewCommentEntry } from '../models/comment.model'

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

export const parseDescription = (descriptionFromRequest: any): string => {
  if (!isString(descriptionFromRequest) || notEmpty(descriptionFromRequest)) {
    throw new Error('Invalid Description')
  }
  return descriptionFromRequest
}

export const toNewComment = (object: any, userIdFromRequest: any): NewCommentEntry => {
  const newComment: NewCommentEntry = {
    Post_ID: parsePostID(object.Post_ID),
    User_ID: parseUserID(userIdFromRequest),
    description: parseDescription(object.description)
  }
  return newComment
}
