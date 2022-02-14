const { Router } = require('express');

const {
  createSampleHandler,
  deleteSampleHandler,
  getAllSamplesHandler,
  getSampleByIdHandler,
  updateSampleHandler,
} = require('./.controller');

const router = Router();

router.get('/', getAllSamplesHandler);
router.post('/', createSampleHandler);
router.get('/:id', getSampleByIdHandler);
router.delete('/:id', deleteSampleHandler);
router.patch('/:id', updateSampleHandler);

module.exports = router;
