/* eslint-disable @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-floating-promises */
import { userModel } from '../models/user.model'
import '../models/index'
import { followerModel, followerEntry, NewFollowerEntry, IFollowerWithoutUserModel } from '../models/follower.model'

export const getFollowers = async (): Promise<followerEntry[]> => {
  return followerModel.findAll({
    include: [{ model: userModel, attributes: { exclude: ['password'] } }],
    order: [
      ['createdAt', 'DESC']
    ]
  })
    .then((result) => {
      return result
    }) as any
}

export const addNewFollower = async (newFollowerEntry: NewFollowerEntry): Promise<NewFollowerEntry> => {
  const newFollower = {
    ...newFollowerEntry
  }
  const follower = await followerModel.create(newFollower)
  return follower
}

export const findFollowersByUserId = async (id: number): Promise<followerEntry[] | undefined> => {
  return await followerModel.findAll({
    include: { model: userModel, attributes: { exclude: ['password'] } },
    where: { User_ID: id }
  }) as any
}

export const removeFollow = (id: number): Promise<number> | undefined => {
  return followerModel.destroy({ where: { ID: id } }) as any
}

export const ownFollows = async (id: number): Promise<IFollowerWithoutUserModel[] | undefined> => {
  return followerModel.findAll({ include: [{ model: userModel, attributes: { exclude: ['password'] } }], where: { Follower_ID: id }, order: [['Follower_ID', 'DESC']] }) as any
}
