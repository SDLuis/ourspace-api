/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as userController from '../controllers/user.controller'
import * as authController from '../controllers/auth.controller'
import * as policies from '../libs/policies'
const router = Router()

router.get('/', authController.auth, policies.Admin, userController.getUser)
router.put('/edit/:id', authController.auth, policies.Admin, userController.editUser)
router.get('/find/:email', authController.auth, policies.Admin, userController.findUserByEmail)
router.get('/:id', authController.auth, policies.Admin, userController.findUser)
router.delete('/delete/:id', authController.auth, policies.Admin, userController.deleteUser)

export default router
