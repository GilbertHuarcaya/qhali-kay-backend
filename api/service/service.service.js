const Service = require('./service.model');

/**
 * Get all services
 * @returns all services
 */
async function getAllServices() {
  const services = await Service.find();
  return services;
}

/**
 * Get service by id
 * @param {string} id Indentifier of the service to be filtered
 * @returns service
 */
async function getServiceById(id) {
  const service = await Service.findById(id);
  return service;
}

/**
 * Create a new service
 * @param {Object} service Service to create
 * @returns Service created
 */
async function createService(service) {
  const newService = new Service(service);
  const savedService = await newService.save();
  return savedService;
}

/**
 * Update a service
 * @param {string} id Indentifier of the service to be updated
 * @param {*} service Body of the service to be updated
 * @returns service updated
 */
async function updateService(id, service) {
  const updatedService = await Service.findOneAndUpdate(id, service);
  return updatedService;
}

/**
 * Delete a service
 * @param {String} id Identifier of the service to be deleted
 * @returns Service deleted
 */
async function deleteService(id) {
  const deletedService = await Service.findByIdAndDelete(id);
  return deletedService;
}

module.exports = {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
};
