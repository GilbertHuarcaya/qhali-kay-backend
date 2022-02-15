/* eslint-disable no-undef */
const {
  createHospital,
  deleteHospital,
  getAllHospitals,
  getHospitalById,
  updateHospital,
  getHospitalByEmail,
} = require('./hospital.service');
const { signToken } = require('../../auth/auth.service');
const axios = require('axios');
const googleKey = process.env.GOOGLEMAPS_API_KEY;

async function getAllHospitalsHandler(req, res) {
  try {
    const hospitals = await getAllHospitals();
    return res.status(200).json(hospitals);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getHopitalByEmailHandler(req, res) {
  const { email } = req.params;
  try {
    const hospital = await getHospitalByEmail(email);
    if (!hospital) {
      return res
        .status(404)
        .json({ message: `Hospital not found with email: ${email}` });
    }
    const token = signToken(hospital.profile);
    return res.status(200).json(token);
  } catch (error) {
    log.error(error);
    return res.status(400).json({ error: error.message });
  }
}

async function getHospitalByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const hospital = await getHospitalById(id);

    if (!hospital) {
      return res
        .status(404)
        .json({ message: `Hospital not found with id: ${id}` });
    }

    return res.status(200).json(hospital);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createHospitalHandler(req, res) {
  try {
    const hospital = await createHospital(req.body);
    return res.status(201).json(hospital);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateHospitalHandler(req, res) {
  const { id } = req.params;
  try {
    const hospital = await updateHospital(id, req.body);

    if (!hospital) {
      return res
        .status(404)
        .json({ message: `Hospital not found with id: ${id}` });
    }

    return res.status(200).json(hospital);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteHospitalHandler(req, res) {
  const { id } = req.params;
  try {
    const hospital = await deleteHospital(id);

    if (!hospital) {
      return res
        .status(404)
        .json({ message: `Hospital not found with id: ${id}` });
    }

    return res.status(200).json(hospital);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getHospitalMapHandler(req, res) {
  const { data } = req.params
  try {
    const config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data}&radius=1500&type=hospital&key=${googleKey}`,
      headers: { }
    };

    axios(config)
      .then(function (response) {
        const { results } = response.data;

        const finalResponse = results.map((result) => ({
          first_name: result.name,
          last_name: result.name,
          username: result.name,
          secret: `${result.name.split(' ').join('')}${result.reference}`,
          email: `${result.reference}@gmail.com`,
          custom_json: result,
        }));
        console.log(finalResponse);
        return res.status(200).json(finalResponse);
      })
      .catch(function (error) {
        console.log(error);
      });
  } catch (error) {
    log.error(error);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createHospitalHandler,
  deleteHospitalHandler,
  getAllHospitalsHandler,
  getHospitalByIdHandler,
  updateHospitalHandler,
  getHopitalByEmailHandler,
  getHospitalMapHandler,
};
