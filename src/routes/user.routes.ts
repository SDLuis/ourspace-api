/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import * as userController from '../controllers/user.controller'
const router = Router()

router.get('/', userController.getUser)
router.put('/edit/:id', userController.editUser)
router.get('/find/:email', userController.findUserByEmail)
router.get('/:id', userController.findUser)
router.delete('/delete/:id', userController.deleteUser)

export default router
