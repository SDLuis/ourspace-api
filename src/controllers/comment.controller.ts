import { NextFunction, Request, Response } from 'express'
import { CustomRequest } from '../models/user.model'
import * as commentService from '../services/comment.service'
import * as commentValidation from '../validations/comment.validation'

export const getComments = async (_req: Request, res: Response): Promise<void> => {
  try {
    await commentService.getComments().then((comments) => {
      res.status(200).send(comments)
    })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const newComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = {
      Post_ID: req.body.Post_ID,
      description: req.body.description
    }
    const NewCommentEntry = commentValidation.toNewComment(body, (req as any).token.User_ID)
    const addedComment = await commentService.addNewComment(NewCommentEntry)
    res.status(200).send(addedComment)
  } catch (err: any) {
    res.status(400).send(err.message)
  }
}

export const editComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = +req.params.CommentID
    const editCommentEntry = commentValidation.parseDescription(req.body.description) as any
    const editedComment = await commentService.editComment(id, editCommentEntry)
    if (+editedComment === 1) {
      res.status(200).send({ message: 'Comment Edit', status: 200 })
    } else {
      res.status(200).send({ message: 'Error, Comment was not edited', status: 400 })
    }
  } catch (err: any) {
    res.status(400).send(err.message)
  }
}

export const findCommentsByPostId = async (req: Request, res: Response): Promise<any> => {
  try {
    const PostID = +req.params.postID
    const Comments = await commentService.findCommentsByPostId(PostID)
    res.status(200).send(Comments)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const deleteComment = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.CommentID
    await commentService.deleteComment(id)?.then((result) => {
      if (result === 1) {
        res.status(200).send('Comment deleted')
      } else {
        res.status(400).send('Error, Comment was not edited')
      }
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const ownComments = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = (req as any).token.User_ID
    const Comments = (await commentService.ownComments(id)) as any
    res.status(200).send(Comments)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const reqComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = +req.params.CommentID
    const Comment = (await commentService.findCommentById(id));
    (req as any as CustomRequest).json = Comment as any
    next()
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const test = async (req: Request, res: Response): Promise<any> => {
  try {
    const description = req.params.description
    const Comment = await commentService.test(description)
    res.status(200).send(Comment)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
