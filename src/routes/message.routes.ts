/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as messageRoutes from '../controllers/message.controller'
import * as authController from '../controllers/auth.controller'

const router = Router()

router.post('/add', authController.auth, messageRoutes.newMessage)
router.get('/find', authController.auth, messageRoutes.getMessagesByConversations)

export default router
