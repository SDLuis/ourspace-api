/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as conversationRoutes from '../controllers/conversation.controller'
import * as authController from '../controllers/auth.controller'

const router = Router()

router.post('/add', authController.auth, conversationRoutes.newConversation)
router.get('/owner', authController.auth, conversationRoutes.ownConversation)
router.delete('/delete/:conversationID', authController.auth, conversationRoutes.deleteConversation)

export default router
