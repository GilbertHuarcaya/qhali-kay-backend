const { Router } = require('express');

const {
  createHospitalHandler,
  deleteHospitalHandler,
  getAllHospitalsHandler,
  getHospitalByIdHandler,
  updateHospitalHandler,
  getHospitalByEmail,
  getHospitalMapHandler,
} = require('./hospital.controller');

const router = Router();

router.get('/', getAllHospitalsHandler);
router.get('/search/:data', getHospitalMapHandler);
router.post('/', createHospitalHandler);
router.get('/:id', getHospitalByIdHandler);
router.get('/email/:email', getHospitalByEmail);
router.delete('/:id', deleteHospitalHandler);
router.patch('/:id', updateHospitalHandler);

module.exports = router;
