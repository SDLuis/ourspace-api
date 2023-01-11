import { Request, Response } from 'express'
import * as followerService from '../services/follower.service'
import * as followerValidation from '../validations/follower.validation'

export const getFollowers = async (_req: Request, res: Response): Promise<void> => {
  try {
    await followerService.getFollowers().then((followers) => {
      res.status(200).send(followers)
    })
  } catch (error) {
    res.status(400).send(error)
  }
}

export const newFollowers = async (req: Request, res: Response): Promise<void> => {
  try {
    const userID = req.body.User_ID
    const NewFollowerEntry = followerValidation.toNewFollower(userID, (req as any).token.User_ID)
    const addedFollower = await followerService.addNewFollower(NewFollowerEntry)
    res.status(200).send(addedFollower)
  } catch (err: any) {
    res.status(400).send(err.message)
  }
}

export const findFollowsByUserId = async (req: Request, res: Response): Promise<any> => {
  try {
    const UserID = +req.params.UserID
    const Followers = await followerService.findFollowersByUserId(UserID)
    res.status(200).send(Followers)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const removeFollow = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.ID
    await followerService.removeFollow(id)?.then((result) => {
      if (result === 1) {
        res.status(200).send('Has dejado de seguir este usuario')
      } else {
        res.status(400).send('Error, ha ocurrido un error')
      }
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const ownFollows = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = (req as any).token.User_ID
    const Follows = (await followerService.ownFollows(id)) as any
    res.status(200).send(Follows)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
