const Hospital = require('./hospital.model');

/**
 * Get all hospitals
 * @returns all hospitals
 */
async function getAllHospitals() {
  const hospitals = await Hospital.find();
  return hospitals;
}

/**
 * Get hospital by id
 * @param {string} id Indentifier of the hospital to be filtered
 * @returns hospital
 */
async function getHospitalById(id) {
  const hospital = await Hospital.findById(id);
  return hospital;
}

/**
 * Create a new hospital
 * @param {Object} hospital Hospital to create
 * @returns Hospital created
 */
async function createHospital(hospital) {
  const newHospital = new Hospital(hospital);
  const savedHospital = await newHospital.save();
  return savedHospital;
}

/**
 * Update a hospital
 * @param {string} id Indentifier of the hospital to be updated
 * @param {*} hospital Body of the hospital to be updated
 * @returns hospital updated
 */
async function updateHospital(id, hospital) {
  const updatedHospital = await Hospital.findByIdAndUpdate(id, hospital);
  return updatedHospital;
}

/**
 * Delete a hospital
 * @param {String} id Identifier of the hospital to be deleted
 * @returns Hospital deleted
 */
async function deleteHospital(id) {
  const deletedHospital = await Hospital.findByIdAndDelete(id);
  return deletedHospital;
}

async function getHospitalByEmail(email) {
  const user = await Hospital.findOne({ email });
  return user;
}

module.exports = {
  createHospital,
  deleteHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  getHospitalByEmail,
};
