import { userModel } from '../models/user.model'
import '../models/index'
import { postType, postEntry, postModel, NewPostEntry, NotSensistiveInfoPost, IPostWithoutModels } from '../models/post.model'
import { commentModel } from '../models/comment.model'
import { reactionModel } from '../models/reaction.model'

export const getPosts = async (): Promise<postEntry[]> => {
  return postModel.findAll({
    include: [{ model: userModel, attributes: { exclude: ['password'] } },
      { model: commentModel },
      { model: reactionModel }],
    order: [
      ['Post_ID', 'DESC']
    ]
  })
    .then((result) => {
      return result
    }) as any
}
export const getPostsWithoutSensitiveInfo = (posts: postEntry[]): NotSensistiveInfoPost[] => {
  return posts.map(
    // eslint-disable-next-line @typescript-eslint/naming-convention
    ({ Post_ID, Post_Type, User_ID, Location, img, img_ID, description, createdAt, updatedAt, commentModel, reactionModel }) => {
      return {
        Post_ID,
        Post_Type,
        User_ID,
        Location,
        img,
        img_ID,
        description,
        createdAt,
        updatedAt,
        commentModel,
        reactionModel

      }
    }
  )
}
export const addPost = async (newPostEntry: NewPostEntry): Promise<NewPostEntry> => {
  const newPost = {
    ...newPostEntry
  }
  const post = await postModel.create(newPost)
  return post
}

export const editPost = async (id: number, newPostEntry: NewPostEntry): Promise<number> => {
  const result = await postModel.update(newPostEntry, { where: { Post_ID: id } })
    .then((result) => {
      return result
    })
  return +result
}

export const findPost = (id: number): Promise<postEntry[]> | undefined => {
  return postModel.findOne({
    include: [{ model: userModel, attributes: { exclude: ['password'] } },
      { model: commentModel }],
    where: { Post_ID: id }
  }) as any
}

export const test = (params: string): Promise<postEntry[]> | undefined => {
  return postModel.findOne({ where: { Location: params } }) as any
}

export const findPostByType = (postType: postType): Promise<postEntry[]> | undefined => {
  return postModel.findAll({
    include: [{ model: userModel, attributes: { exclude: ['password'] } },
      { model: commentModel }],
    where: { Post_Type: postType },
    order: [['Post_ID', 'DESC']]
  }) as any
}

export const deletePost = (id: number): Promise<number> | undefined => {
  return postModel.destroy({ where: { Post_ID: id } })
}

export const ownPosts = (id: number): Promise<IPostWithoutModels[]> | undefined => {
  return postModel.findAll({
    include: [{ model: userModel, attributes: { exclude: ['password'] } },
      { model: commentModel },
      { model: reactionModel }
    ],
    where: { User_ID: id },
    order: [['Post_ID', 'DESC']]
  })
}

export const findPostByUser = (id: number): Promise<IPostWithoutModels[]> | undefined => {
  return postModel.findAll({
    include: [{ model: userModel, attributes: { exclude: ['password'] } },
      { model: commentModel },
      { model: reactionModel }
    ],
    where: { User_ID: id }
  })
}
