const {
  createCardTokenHandlers,
  createCustomerHandlers,
  makePaymentHandlers,
  getAllCustomersHandlers,
  getCustomerHandlers,
  deleteTokenHandlers
} = require('./payment.controller');
const { Router } = require('express');
const { isAuthenticated } = require('../../auth/auth.service');

const router = Router();

router.post('/card-token', isAuthenticated(), createCardTokenHandlers)
router.post('/customer', isAuthenticated(), createCustomerHandlers)
router.post('/make-payment', isAuthenticated(), makePaymentHandlers)
router.get('/customer/:id', getCustomerHandlers)
router.get('/customer-list', getAllCustomersHandlers)
router.delete('/delete', deleteTokenHandlers)

module.exports = router
