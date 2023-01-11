/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as followerController from '../controllers/follower.controller'
import * as authController from '../controllers/auth.controller'

const router = Router()

router.get('/', followerController.getFollowers)
router.post('/add', authController.auth, followerController.newFollowers)
router.get('/find/:UserID', followerController.findFollowsByUserId)
router.delete('/delete/:ID', authController.auth, followerController.removeFollow)
router.get('/owner', authController.auth, followerController.ownFollows)

export default router
