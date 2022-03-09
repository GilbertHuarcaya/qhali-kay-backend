import { Router } from 'express'
import { isAuthenticated } from '../../auth/auth.service'
import multer from 'multer'

import {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  getUserByEmailHandler,
  sendEmailToUserByEmailHandler,
  sendContactUsEmailHandler
} from './user.controller'

const router = Router()
const upload = multer({ dest: './temp' })

router.get('/', getAllUsersHandler)
router.post('/', createUserHandler)
router.get('/:id', getUserByIdHandler)
router.get('/email/:email', isAuthenticated(), getUserByEmailHandler)
router.post('/email', sendEmailToUserByEmailHandler)
router.post('/contact-us', upload.array('file'), sendContactUsEmailHandler)
router.patch('/:id', updateUserHandler)
router.delete('/:id', deleteUserHandler)

export default router
