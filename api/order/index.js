const { Router } = require('express');

const {
  createOrderHandler,
  deleteOrderHandler,
  getAllOrdersHandler,
  getOrderByIdHandler,
  updateOrderHandler,
  getOrderByUserHandler,
} = require('./order.controller');

const { isAuthenticated, hasRole } = require('../../auth/auth.service');
const router = Router();

router.get('/', getAllOrdersHandler);
router.get('/:id', isAuthenticated(), getOrderByIdHandler);
router.get('/user/:userId', isAuthenticated(), getOrderByUserHandler);
router.post('/', hasRole(['admin', 'usuario', 'personal']), createOrderHandler);
router.patch('/:id', hasRole(['admin', 'usuario', 'personal']), updateOrderHandler);
router.delete('/:id', hasRole(['admin', 'usuario', 'personal']), deleteOrderHandler);

module.exports = router;

// hasRole('admin'),
