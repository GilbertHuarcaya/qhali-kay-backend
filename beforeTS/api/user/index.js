const { Router } = require('express');
const multer = require('multer');

const {
  createUserHandler,
  deleteUserHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  updateUserHandler,
  getUserByEmailHandler,
  sendEmailToUserByEmailHandler,
  sendContactUsEmailHandler,
} = require('./user.controller');

const { isAuthenticated } = require('../../auth/auth.service');
const router = Router();
const upload = multer({ dest: './temp' });

router.get('/', getAllUsersHandler);
router.post('/', createUserHandler);
router.get('/:id', getUserByIdHandler);
router.get('/email/:email', isAuthenticated(), getUserByEmailHandler);
router.post('/email', sendEmailToUserByEmailHandler);
router.post('/contact-us', upload.array('file'), sendContactUsEmailHandler)
router.patch('/:id', updateUserHandler);
router.delete('/:id', deleteUserHandler);

module.exports = router;
