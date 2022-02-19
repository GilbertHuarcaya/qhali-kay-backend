const { Router } = require('express');

const {
  createHospitalHandler,
  deleteHospitalHandler,
  getAllHospitalsHandler,
  getHospitalByIdHandler,
  updateHospitalHandler,
  getHopitalByEmailHandler,
  getHospitalMapHandler,
  getNextPageHospitalHandler,
} = require('./hospital.controller');

const { isHospitalAuthenticated } = require('../../auth/auth.service');
const router = Router();

router.get('/', getAllHospitalsHandler);
router.get('/search/:data', getHospitalMapHandler);
router.get('/search/next-page/:token', getNextPageHospitalHandler);
router.post('/', createHospitalHandler);
router.get('/:id', getHospitalByIdHandler);
router.get('/email/:email', isHospitalAuthenticated(), getHopitalByEmailHandler);
router.delete('/:id', deleteHospitalHandler);
router.patch('/:id', updateHospitalHandler);

module.exports = router;
