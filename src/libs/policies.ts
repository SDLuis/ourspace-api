import { Request, Response, NextFunction } from 'express'
import { CustomRequest, NotSensistiveInfoUser } from '../models/user.model'
import * as policiesService from '../services/policies.service'

export const Admin = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const user = (req as any as CustomRequest).token as NotSensistiveInfoUser
    const response = policiesService.onlyAdmin(user.role)
    if (response === true) {
      next()
    } else {
      res.status(400).send(response)
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const posterAccess = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const user = (req as any as CustomRequest).token as NotSensistiveInfoUser
    const response = policiesService.accessToAdd(user.role)
    if (response === true) {
      next()
    } else {
      res.status(400).send(response)
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const ownerAccess = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const fullUser = (req as any as CustomRequest).token as NotSensistiveInfoUser
    const fullJob = (req as any as CustomRequest).json as any
    const userId = fullUser.User_ID
    const userRole = fullUser.role
    const PostUserId = fullJob?.dataValues.User_ID
    if (fullJob === undefined) {
      throw new Error('Incorret Post ID')
    } else {
      const response = policiesService.ownerAccess(userId, PostUserId, userRole)
      if (response === true) {
        next()
      } else {
        res.status(400).send(response)
      }
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const owner = (req: Request, res: Response, next: NextFunction): any => {
  try {
    const fullUser = (req as any as CustomRequest).token as NotSensistiveInfoUser
    const reqUser = (req as any as CustomRequest).user as any
    const userId = fullUser.User_ID
    const userRole = fullUser.role
    const authUserId = reqUser?.dataValues.User_ID
    if (reqUser === undefined) {
      throw new Error('Incorret User ID')
    } else {
      const response = policiesService.owner(userId, authUserId, userRole)
      if (response === true) {
        next()
      } else {
        res.status(400).send(response)
      }
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
