import { Router } from 'express'
import { isHospitalAuthenticated } from '../../auth/auth.service'

import {
  createHospitalHandler,
  deleteHospitalHandler,
  getAllHospitalsHandler,
  getHospitalByIdHandler,
  updateHospitalHandler,
  getHopitalByEmailHandler,
  getHospitalMapHandler,
  getNextPageHospitalHandler
} from './hospital.controller'

const router = Router()

router.get('/', getAllHospitalsHandler)
router.get('/search/:data', getHospitalMapHandler)
router.get('/search/next-page/:token', getNextPageHospitalHandler)
router.post('/', createHospitalHandler)
router.get('/:id', getHospitalByIdHandler)
router.get('/email/:email', isHospitalAuthenticated(), getHopitalByEmailHandler)
router.delete('/:id', deleteHospitalHandler)
router.patch('/:id', updateHospitalHandler)

export default router
