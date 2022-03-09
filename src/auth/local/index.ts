import { Router } from 'express'

import {
  loginUserHandler,
  changePasswordHandler,
  validateEmaildHandler,
  resetPasswordHandler,
  loginHospitalHandler,
  changePasswordHospitalHandler
} from './local.controller'

const router = Router()

// /auth/local/login
// /auth/local/forgot-password

router.post('/login', loginUserHandler)
router.post('/loginHospital', loginHospitalHandler)
router.post('/reset-password', resetPasswordHandler)
router.post('/change-password', changePasswordHandler)
router.post('/change-password-hospital', changePasswordHospitalHandler)
router.post('/validate-email/:userToken', validateEmaildHandler)

export default router
