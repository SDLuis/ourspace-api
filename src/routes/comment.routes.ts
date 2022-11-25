/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as commentController from '../controllers/comment.controller'
import * as authController from '../controllers/auth.controller'
import * as policies from '../libs/policies'

const router = Router()

router.get('/', commentController.getComments)
router.post('/add', authController.auth, commentController.newComment)
router.put('/edit/:CommentID', authController.auth, commentController.reqComment, policies.ownerAccess, commentController.editComment)
router.get('/owner', authController.auth, commentController.ownComments)
router.get('/find/:postID', commentController.findCommentsByPostId)
router.delete('/delete/:CommentID', authController.auth, commentController.reqComment, policies.ownerAccess, commentController.deleteComment)
router.get('/test/:description', commentController.test)
export default router
