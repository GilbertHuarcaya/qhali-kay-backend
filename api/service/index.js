const { Router } = require('express');

const {
  createServiceHandler,
  deleteServiceHandler,
  getAllServicesHandler,
  getServiceByIdHandler,
  updateServiceHandler,
} = require('./service.controller');

const { /* isAuthenticated, */ hasRole } = require('../../auth/auth.service');
const router = Router();

router.get('/', getAllServicesHandler);
router.get('/:id', getServiceByIdHandler);
router.post('/', hasRole('admin'), createServiceHandler);
router.patch('/:id', hasRole('admin'), updateServiceHandler);
router.delete('/:id', hasRole('admin'), deleteServiceHandler);

module.exports = router;
