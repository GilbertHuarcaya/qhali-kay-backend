import Hospital from './hospital.model';

/**
 * Get all hospitals
 * @returns all hospitals
 */
export async function getAllHospitals() {
  const hospitals = await Hospital.find();
  return hospitals;
}

/**
 * Get hospital by id
 * @param {string} id Indentifier of the hospital to be filtered
 * @returns hospital
 */
export async function getHospitalById(id: any) {
  const hospital = await Hospital.findById(id);
  return hospital;
}

/**
 * Create a new hospital
 * @param {Object} hospital Hospital to create
 * @returns Hospital created
 */
export async function createHospital(hospital: any) {
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
export async function updateHospital(id: any, hospital: any) {
  const updatedHospital = await Hospital.findByIdAndUpdate(id, hospital);
  return updatedHospital;
}

/**
 * Delete a hospital
 * @param {String} id Identifier of the hospital to be deleted
 * @returns Hospital deleted
 */
export async function deleteHospital(id: any) {
  const deletedHospital = await Hospital.findByIdAndDelete(id);
  return deletedHospital;
}

export async function getHospitalByEmail(email: string) {
  const user = await Hospital.findOne({ email });
  return user;
}

export default {
  createHospital,
  deleteHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  getHospitalByEmail,
};
