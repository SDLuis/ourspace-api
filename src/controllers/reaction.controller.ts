import { Request, Response } from 'express'
import * as reactionService from '../services/reaction.service'
import * as reactionValidation from '../validations/reaction.validation'

export const getReactions = async (_req: Request, res: Response): Promise<void> => {
  try {
    await reactionService.getReactions().then((reactions) => {
      res.status(200).send(reactions)
    })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const newReactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const body = {
      Post_ID: req.body.Post_ID,
      reactionType: req.body.reactionType
    }
    const NewReactionEntry = reactionValidation.toNewReaction(body, (req as any).token.User_ID)
    const addedReaction = await reactionService.addNewReaction(NewReactionEntry)
    res.status(200).send(addedReaction)
  } catch (err: any) {
    res.status(400).send(err.message)
  }
}

export const findReactionsByPostId = async (req: Request, res: Response): Promise<any> => {
  try {
    const PostID = +req.params.postID
    const Reactions = await reactionService.findReactionsByPostId(PostID)
    res.status(200).send(Reactions)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const removeReaction = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.ReactionID
    await reactionService.removeReaction(id)?.then((result) => {
      if (result === 1) {
        res.status(200).send('Reaction removed successfully')
      } else {
        res.status(400).send('Error, Reaction was not removed')
      }
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const ownComments = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = (req as any).token.User_ID
    const Reactions = (await reactionService.ownReactions(id)) as any
    res.status(200).send(Reactions)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const test = async (req: Request, res: Response): Promise<any> => {
  try {
    const description = req.params.reactionType
    const Reaction = await reactionService.test(description)
    res.status(200).send(Reaction)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
