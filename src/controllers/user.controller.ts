/* eslint-disable @typescript-eslint/naming-convention */
import { NextFunction, Request, Response } from 'express'
import { CustomRequest } from '../models/user.model'
import * as userService from '../services/user.service'
import * as userValidation from '../validations/user.validation'

export const getUser = async (_req: Request, res: Response): Promise<any> => {
  try {
    await userService.getUsers().then((result: any) => {
      res.status(200).send(userService.getUsersWithoutSensitiveInfo(result))
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const editUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    const paramsToEdit = userValidation.toEditUser(req.body)
    const User = await userService.editUser(id, paramsToEdit)
    if (+User === 1) {
      res.status(200).send('User Edit')
    } else {
      res.status(400).send('Error')
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const findUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    const user = await userService.findUser(id)
    res.status(200).send(user)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
export const findUserByUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const user = req.params.user
    const userFound = await userService.findUserByUser(user)
    res.status(200).send(userFound)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const id = +req.params.id
    await userService.deleteUser(id)?.then((result: any) => {
      if (result === 1) {
        res.status(200).send('User deleted')
      } else {
        res.status(400).send('Error')
      }
    })
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const reqUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const id = +req.params.id
    const User = (await userService.findUser(id));
    (req as any as CustomRequest).user = User as any
    next()
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
