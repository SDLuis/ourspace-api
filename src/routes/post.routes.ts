/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as postContoller from '../controllers/post.controller'
import * as authController from '../controllers/auth.controller'
import * as policies from '../libs/policies'
import upload from '../libs/upload'

const router = Router()

router.get('/', postContoller.getPosts)
router.get('/user/:user', postContoller.findPostByUser)
router.get('/owner', authController.auth, postContoller.ownPosts)
router.get('/:Post_Type/list', postContoller.findPostByPostType)
router.post('/add', authController.auth, upload.single('image'), postContoller.newPost)
router.put('/edit/:id', authController.auth, postContoller.reqPost, policies.ownerAccess, upload.single('image'), postContoller.editPost)
router.delete('/delete/:id', authController.auth, postContoller.reqPost, policies.ownerAccess, postContoller.deletePost)
router.get('/:id', postContoller.findPost)
router.get('/test/:Location', postContoller.test)

export default router
