const {
  createService,
  deleteService,
  getAllServices,
  getServiceById,
  updateService,
} = require('./service.service');

async function getAllServicesHandler(req, res) {
  try {
    const services = await getAllServices();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getServiceByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const service = await getServiceById(id);

    if (!service) {
      return res
        .status(404)
        .json({ message: `Service not found with id: ${id}` });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createServiceHandler(req, res) {
  try {
    const service = await createService(req.body);
    return res.status(201).json(service);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateServiceHandler(req, res) {
  const { id } = req.params;
  try {
    const service = await updateService(id, req.body);

    if (!service) {
      return res
        .status(404)
        .json({ message: `Service not found with id: ${id}` });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteServiceHandler(req, res) {
  const { id } = req.params;
  try {
    const service = await deleteService(id);

    if (!service) {
      return res
        .status(404)
        .json({ message: `Service not found with id: ${id}` });
    }

    return res.status(200).json(service);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createServiceHandler,
  deleteServiceHandler,
  getAllServicesHandler,
  getServiceByIdHandler,
  updateServiceHandler,
};
