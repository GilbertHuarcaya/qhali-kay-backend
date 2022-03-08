import { Router } from 'express'
import { /* isAuthenticated */ hasRole } from '../../auth/auth.service'

import {
  createReviewHandler,
  deleteReviewHandler,
  getAllReviewsHandler,
  getReviewByIdHandler,
  updateReviewHandler
} from './review.controller'

const router = Router()

router.get('/', getAllReviewsHandler)
router.get('/:id', getReviewByIdHandler)
router.post('/', hasRole(['admin', 'usuario', 'personal']), createReviewHandler)
router.patch('/:id', hasRole(['admin', 'usuario', 'personal']), updateReviewHandler)
router.delete('/:id', hasRole(['admin', 'usuario', 'personal']), deleteReviewHandler)

export default router
