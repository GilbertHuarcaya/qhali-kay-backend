const Sample = require('./.model');

/**
 * Get all samples
 * @returns all samples
 */
async function getAllSamples() {
  try {
    const samples = await Sample.find();
    return samples;
  } catch (error) {
    throw error;
  }
}

/**
 * Get sample by id
 * @param {string} id Indentifier of the sample to be filtered
 * @returns sample
 */
async function getSampleById(id) {
  try {
    const sample = await Sample.findById(id).populate('userInfo');
    return sample;
  } catch (error) {
    throw error;
  }
}

/**
 * Create a new sample
 * @param {Object} sample Sample to create
 * @returns Sample created
 */
async function createSample(sample) {
  try {
    const newSample = new Sample(sample);
    const savedSample = await newSample.save();
    return savedSample;
  } catch (error) {
    throw error;
  }
}

/**
 * Update a sample
 * @param {string} id Indentifier of the sample to be updated
 * @param {*} sample Body of the sample to be updated
 * @returns sample updated
 */
async function updateSample(id, sample) {
  try {
    const updatedSample = await Sample.findByIdAndUpdate(id, sample);
    return updatedSample;
  } catch (error) {
    throw error;
  }
}

/**
 * Delete a sample
 * @param {String} id Identifier of the sample to be deleted
 * @returns Sample deleted
 */
async function deleteSample(id) {
  try {
    const deletedSample = await Sample.findByIdAndDelete(id);
    return deletedSample;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createSample,
  deleteSample,
  getAllSamples,
  getSampleById,
  updateSample,
};
