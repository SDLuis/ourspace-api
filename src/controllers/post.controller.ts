/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { NextFunction, Request, Response } from 'express'
import * as postService from '../services/post.service'
import { postType } from '../models/post.model'
import * as postValidation from '../validations/post.validation'
import { CustomRequest } from '../models/user.model'
import { findUserByUser } from '../services/user.service'
import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

export const getPosts = async (_req: Request, res: Response): Promise<void> => {
  try {
    await postService.getPosts().then((response) => {
      res.status(200).send(response)
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const newPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file?.path as string)
    fs.unlink(req.file?.path as string, function (err) {
      if (err != null) {
        console.log(err)
      }
    })
    const body = {
      Post_Type: req.body.Post_Type,
      Location: req.body.Location,
      img: secure_url,
      img_ID: public_id,
      description: req.body.description
    }
    const NewPostEntry = postValidation.toNewPost(body, (req as any).token.User_ID)
    const addedPost = await postService.addPost(NewPostEntry)
    res.status(200).send(addedPost)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const editPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    const { secure_url, public_id } = await cloudinary.uploader.upload(req.file?.path as string)
    fs.unlink(req.file?.path as string, function (err) {
      if (err != null) {
        console.log(err)
      }
    })
    const body = {
      Post_Type: req.body.Post_Type,
      Location: req.body.Location,
      img: secure_url,
      img_ID: public_id,
      description: req.body.description
    }
    const { img_ID } = await postService.findPost(id) as any
    img_ID != null ? await cloudinary.uploader.destroy(img_ID as string) : ''
    const paramToEdit = postValidation.toNewPost(body, (req as any).token.User_ID)
    const Post = await postService.editPost(id, paramToEdit)
    if (+Post === 1) {
      res.status(200).send({ message: 'Post Edit', status: 200 })
    } else {
      res.status(200).send({ message: 'Error, Post was not edited', status: 400 })
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const findPost = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    const Post = await postService.findPost(id)
    res.status(200).send(Post)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const findPostByUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.params.user
    const { User_ID } = await findUserByUser(user) as any
    const Post = await postService.findPostByUser(User_ID)
    res.status(200).send(Post)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const findPostByPostType = async (req: Request, res: Response): Promise<any> => {
  try {
    const Type = req.params.Post_Type
    const Post = await postService.findPostByType(Type as postType)
    res.status(200).send(Post)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const deletePost = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    const { img_ID } = await postService.findPost(id) as any
    img_ID != null ? await cloudinary.uploader.destroy(img_ID as string) : ''
    await postService.deletePost(id)?.then((result) => {
      if (result === 1) {
        res.status(200).send('Post deleted')
      } else {
        res.status(400).send('Error')
      }
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const reqPost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = +req.params.id
    const Post = (await postService.findPost(id));
    (req as any as CustomRequest).json = Post as any
    next()
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const ownPosts = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = (req as any).token.User_ID
    const Post = (await postService.ownPosts(id)) as any
    res.status(200).send(Post)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const test = async (req: Request, res: Response): Promise<any> => {
  try {
    const location = req.params.Location
    const Post = await postService.test(location) as any
    res.status(200).send(Post)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
