const { Router } = require('express');

const {
  loginUserHandler,
  changePasswordHandler,
  validateEmaildHandler,
  resetPasswordHandler,
} = require('./local.controller');

const router = Router();

// /auth/local/login
// /auth/local/forgot-password

router.post('/login', loginUserHandler);
router.post('/reset-password', resetPasswordHandler);
router.post('/change-password', changePasswordHandler);
router.post('/validate-email/:userToken', validateEmaildHandler);

module.exports = router;
