const { Router } = require('express');

const {
  createReviewHandler,
  deleteReviewHandler,
  getAllReviewsHandler,
  getReviewByIdHandler,
  updateReviewHandler,
} = require('./review.controller');

const router = Router();
const { /* isAuthenticated */ hasRole } = require('../../auth/auth.service');

router.get('/', getAllReviewsHandler);
router.get('/:id', getReviewByIdHandler);
router.post('/', hasRole(['admin', 'usuario', 'personal']), createReviewHandler);
router.patch('/:id', hasRole(['admin', 'usuario', 'personal']), updateReviewHandler);
router.delete('/:id', hasRole(['admin', 'usuario', 'personal']), deleteReviewHandler);

module.exports = router;
