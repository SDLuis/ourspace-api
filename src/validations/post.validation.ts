import { postType, NewPostEntry } from '../models/post.model'
import { isString, isNumber, isPostType, notEmpty } from '../utils/utils'

const parsePostType = (PostTypeFromRequest: any): postType => {
  if (!isString(PostTypeFromRequest) || !isPostType(PostTypeFromRequest) || notEmpty(PostTypeFromRequest)) {
    throw new Error('Invalid Post Type')
  }
  return PostTypeFromRequest
}

const parseUserID = (userIDFromRequest: any): number => {
  if (!isNumber(userIDFromRequest) || notEmpty(userIDFromRequest)) {
    throw new Error('Invalid User ID')
  }
  return userIDFromRequest
}

const parseLocation = (LocationFromRequest: any): string => {
  if (!isString(LocationFromRequest) || notEmpty(LocationFromRequest)) {
    throw new Error('Invalid User ID')
  }
  return LocationFromRequest
}

export const parseImg = (imgFromRequest: any): string => {
  if (!isString(imgFromRequest) || notEmpty(imgFromRequest)) {
    throw new Error('Invalid Image')
  }
  return imgFromRequest
}
const parseDescription = (descriptionFromRequest: any): string => {
  if (!isString(descriptionFromRequest) || notEmpty(descriptionFromRequest)) {
    throw new Error('Invalid Description')
  }
  return descriptionFromRequest
}

export const toNewPost = (object: any, userIdFromRequest: any): NewPostEntry => {
  const newPost: NewPostEntry = {
    Post_Type: parsePostType(object.Post_Type),
    User_ID: parseUserID(userIdFromRequest),
    Location: parseLocation(object.Location),
    img: object.img,
    img_ID: object.img_ID,
    description: parseDescription(object.description)
  }
  return newPost
}
