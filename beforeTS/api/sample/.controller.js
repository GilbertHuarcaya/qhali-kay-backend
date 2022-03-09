const {
  createSample,
  deleteSample,
  getAllSamples,
  getSampleById,
  updateSample,
} = require('./.service');

async function getAllSamplesHandler(req, res) {
  try {
    const samples = await getAllSamples();
    return res.status(200).json(samples);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getSampleByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const sample = await getSampleById(id);

    if (!sample) {
      return res
        .status(404)
        .json({ message: `Sample not found with id: ${id}` });
    }

    return res.status(200).json(sample);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createSampleHandler(req, res) {
  try {
    const sample = await createSample(req.body);
    return res.status(201).json(sample);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateSampleHandler(req, res) {
  const { id } = req.params;
  try {
    const sample = await updateSample(id, req.body);

    if (!sample) {
      return res
        .status(404)
        .json({ message: `Sample not found with id: ${id}` });
    }

    return res.status(200).json(sample);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteSampleHandler(req, res) {
  const { id } = req.params;
  try {
    const sample = await deleteSample(id);

    if (!sample) {
      return res
        .status(404)
        .json({ message: `Sample not found with id: ${id}` });
    }

    return res.status(200).json(sample);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createSampleHandler,
  deleteSampleHandler,
  getAllSamplesHandler,
  getSampleByIdHandler,
  updateSampleHandler,
};
