import { isString, isNumber, notEmpty } from '../utils/utils'
import { NewMessageEntry } from '../models/message.model'

const parseUserID = (userIDFromRequest: any): number => {
  if (!isNumber(userIDFromRequest) || notEmpty(userIDFromRequest)) {
    throw new Error('Invalid User ID')
  }
  return userIDFromRequest
}

const parseConversationID = (conversationIDFromRequest: any): number => {
  if (!isNumber(conversationIDFromRequest) || notEmpty(conversationIDFromRequest)) {
    throw new Error('Invalid Conversation ID')
  }
  return conversationIDFromRequest
}

export const parseDescription = (descriptionFromRequest: any): string => {
  if (!isString(descriptionFromRequest) || notEmpty(descriptionFromRequest)) {
    throw new Error('Invalid Message')
  }
  return descriptionFromRequest
}

export const toNewComment = (object: any, userIdFromRequest: any): NewMessageEntry => {
  const newComment: NewMessageEntry = {
    Conversation_ID: parseConversationID(userIdFromRequest),
    Sender_ID: parseUserID(userIdFromRequest),
    description: parseDescription(object.description)
  }
  return newComment
}
