/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-floating-promises */
import { userModel } from '../models/user.model'
import { postModel } from '../models/post.model'
import '../models/index'
import { commentModel, commentEntry, NewCommentEntry, ICommentWithoutUserAndPostModel, EditCommentEntry } from '../models/comment.model'

export const getComments = async (): Promise<commentEntry[]> => {
  return commentModel.findAll({
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

export const addNewComment = async (newCommentEntry: NewCommentEntry): Promise<NewCommentEntry> => {
  const newComment = {
    ...newCommentEntry
  }
  const comment = await commentModel.create(newComment)
  return comment
}

export const editComment = async (id: number, newComment: EditCommentEntry): Promise<number> => {
  const result = await commentModel.update({ description: newComment }, { where: { Comment_ID: id } })
    .then((result) => {
      return result
    })
  return +result
}

export const findCommentById = async (id: number): Promise<ICommentWithoutUserAndPostModel[] | undefined> => {
  return await commentModel.findOne({ where: { Comment_ID: id } }) as any
}

export const findCommentsByPostId = async (id: number): Promise<commentEntry[] | undefined> => {
  return await commentModel.findAll({
    include: [{ model: userModel, attributes: { exclude: ['password'] } },
      { model: postModel }],
    where: { Post_ID: id }
  }) as any
}

export const deleteComment = (id: number): Promise<number> | undefined => {
  return commentModel.destroy({ where: { Comment_ID: id } }) as any
}

export const ownComments = async (id: number): Promise<ICommentWithoutUserAndPostModel[] | undefined> => {
  return commentModel.findAll({ where: { User_ID: id }, order: [['Comment_ID', 'DESC']] }) as any
}

export const test = async (param: string): Promise<ICommentWithoutUserAndPostModel[] | undefined> => {
  return await commentModel.findOne({ where: { description: param } }) as any
}
