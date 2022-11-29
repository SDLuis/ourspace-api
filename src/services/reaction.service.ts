/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-floating-promises */
import { userModel } from '../models/user.model'
import { postModel } from '../models/post.model'
import '../models/index'
import { reactionModel, reactionEntry, NewReactionEntry, IReactionWithoutUserAndPostModel } from '../models/reaction.model'

export const getReactions = async (): Promise<reactionEntry[]> => {
  return reactionModel.findAll({
    include: [{ model: userModel, attributes: { exclude: ['password'] } },
      { model: postModel }],
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then((result) => {
      return result
    }) as any
}

export const addNewReaction = async (newReactionEntry: NewReactionEntry): Promise<NewReactionEntry> => {
  const newReaction = {
    ...newReactionEntry
  }
  const reaction = await reactionModel.create(newReaction)
  return reaction
}

export const findReactionsByPostId = async (id: number): Promise<reactionEntry[] | undefined> => {
  return await reactionModel.findAll({
    include: [{ model: userModel, attributes: { exclude: ['password'] } },
      { model: postModel }],
    where: { Post_ID: id }
  }) as any
}

export const removeReaction = (id: number): Promise<number> | undefined => {
  return reactionModel.destroy({ where: { Reaction_ID: id } }) as any
}

export const ownReactions = async (id: number): Promise<IReactionWithoutUserAndPostModel[] | undefined> => {
  return reactionModel.findAll({ where: { User_ID: id }, order: [['Reaction_ID', 'DESC']] }) as any
}

export const test = async (param: string): Promise<IReactionWithoutUserAndPostModel[] | undefined> => {
  return await reactionModel.findOne({ where: { reactionType: param } }) as any
}
