/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as reactionController from '../controllers/reaction.controller'
import * as authController from '../controllers/auth.controller'

const router = Router()

router.get('/', reactionController.getReactions)
router.post('/add', authController.auth, reactionController.newReactions)
router.get('/find/:postID', reactionController.findReactionsByPostId)
router.delete('/delete/:ReactionID', authController.auth, reactionController.removeReaction)
router.get('/owner', authController.auth, reactionController.ownComments)
router.get('/test/:reactionType', reactionController.test)

export default router
