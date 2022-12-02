/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as authController from '../controllers/auth.controller'
import upload from '../libs/upload'
const router = Router()

router.post('/register', upload.single('image'), authController.register)
router.post('/Login', authController.login)

export default router
