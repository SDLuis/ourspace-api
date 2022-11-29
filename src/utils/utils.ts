import { postType } from '../models/post.model'
import { role } from '../models/user.model'
import { reactionType } from '../models/reaction.model'

export const isString = (string: string): boolean => {
  return typeof string === 'string'
}

export const notEmpty = (param: any): boolean => {
  return param === ''
}

export const isNumber = (number: number): boolean => {
  return typeof number === 'number'
}

export const isBoolean = (param: any): boolean => {
  return typeof param === 'boolean'
}

export const isPostType = (param: any): boolean => {
  return Object.values(postType).includes(param)
}

export const isRole = (param: any): boolean => {
  return Object.values(role).includes(param)
}

export const isReactionType = (param: any): boolean => {
  return Object.values(reactionType).includes(param)
}
