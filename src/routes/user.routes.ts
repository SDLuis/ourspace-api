/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as userController from '../controllers/user.controller'
import * as authController from '../controllers/auth.controller'
import * as policies from '../libs/policies'
import upload from '../libs/upload'
const router = Router()

router.get('/', userController.getUser)
router.put('/edit/:id', authController.auth, userController.reqUser, policies.owner, upload.single('image'), userController.editUser)
router.put('/cover/:id', authController.auth, userController.reqUser, policies.owner, upload.single('image'), userController.editCover)
router.get('/find/:user', userController.findUserByUser)
router.get('/:id', userController.findUser)
router.delete('/delete/:id', authController.auth, policies.Admin, userController.deleteUser)

export default router
