/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-floating-promises */
import { userModel } from '../models/user.model'
import '../models/index'
import { messageModel, messageEntry, NewMessageEntry } from '../models/message.model'

export const getMessages = async (): Promise<messageEntry[]> => {
  return messageModel.findAll({
    include: { model: userModel, attributes: { exclude: ['password'] } },
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then((result) => {
      return result
    }) as any
}

export const addNewMessage = async (NewMessageEntry: NewMessageEntry): Promise<NewMessageEntry> => {
  const newMessage = {
    ...NewMessageEntry
  }
  const message = await messageModel.create(newMessage)
  return message
}

export const deleteMessage = (id: number): Promise<number> | undefined => {
  return messageModel.destroy({ where: { Message_ID: id } }) as any
}

export const getMessagesByConversation = async (conversationId: number): Promise<messageEntry[] | undefined> => {
  return messageModel.findAll({ where: { Conversation_ID: conversationId }, order: [['Conversation_ID', 'DESC']], include: { model: userModel, attributes: { exclude: ['password', 'Date_Of_Birth', 'Location', 'cover', 'cover_ID', 'img_ID'] } } }) as any
}
