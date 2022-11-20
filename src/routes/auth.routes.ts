/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
const router = Router()

router.post('/register', authController.register)
router.post('/Login', authController.login)

export default router
