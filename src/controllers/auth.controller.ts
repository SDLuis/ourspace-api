import { Request, Response, NextFunction } from 'express'
import * as authService from '../services/auth.service'
import * as userValidation from '../validations/user.validation'
import * as authValidation from '../validations/auth.validation'
import { CustomRequest } from '../models/user.model'

export const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const NewUserEntry = userValidation.toNewUser(req.body)
    const response = await authService.addUser(NewUserEntry)
    res.status(200).send(response)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const paramsToLogin = authValidation.toLogin(req.body)
    const response = await authService.Login(paramsToLogin)
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (response.token) {
      // WORKINGG!!!!!!!
      const token = response.token
      res.cookie('jwt', token, {
        maxAge: 0o1 * 60 * 60 * 1000,
        secure: true,
        httpOnly: true,
        sameSite: 'none'
      })
      res.status(200).send({ loggedMessage: 'U RE LOGED', data: token, role: response.role })
    } else {
      return response !== undefined
        ? res.send(response)
        : res.status(400).send('Something went wrong :((')
    }
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  try {
    const token = req.cookies.jwt
    /* eslint-disable-next-line */
    if (!token) {
      res.status(400).send('unaunthenticated')
    } else {
      const response = (await authService.auth(token)) as any;
      (req as any as CustomRequest).token = response.dataValues
      next()
    }
  } catch (e: any) {
    res.status(400).send('Something went wrong')
  }
}
