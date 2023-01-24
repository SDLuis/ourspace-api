/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-floating-promises */
import sequelize from 'sequelize'
import { userModel } from '../models/user.model'
import '../models/index'
import { conversationModel, conversationEntry, NewConversationEntry, IConversationWithoutUserModel } from '../models/conversation.model'

export const getConversations = async (): Promise<conversationEntry[]> => {
  return conversationModel.findAll({
    include: { model: userModel, attributes: { exclude: ['password'] } },
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then((result) => {
      return result
    }) as any
}

export const addNewConversation = async (NewConversationEntry: NewConversationEntry): Promise<any> => {
  const conversation = await conversationModel.create({ members: NewConversationEntry })
  return conversation
}

export const deleteConversation = (id: number): Promise<number> | undefined => {
  return conversationModel.destroy({ where: { Conversation_ID: id } }) as any
}

export const ownConversations = async (id: number): Promise<IConversationWithoutUserModel[] | undefined> => {
  return conversationModel.findAll({ where: sequelize.where(sequelize.fn('JSON_CONTAINS', sequelize.col('members'), sequelize.literal(`"${id}"`)), 1) }) as any
}
