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
      return res.status(404).json({ message: `Hospital not found with id: ${id}` });
    }
    const token = signToken(hospital.profile);

    return res.status(200).json({ token });
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
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${data}&radius=3500&type=hospital&key=${googleKey}`,
      headers: { }
    };

    const hospitals = await axios(config)
      .then(async function (response) {
        const { results } = response.data;

        const finalResponse = await Promise.all(
          results.map(async (result) => {
            const sendGetRequest = (result) => {
              try {
                const hospitalPhoto = {
                  method: 'get',
                  url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${result.photos[0].photo_reference}&key=${googleKey}`,
                  headers: { }
                };
                const photoPath = axios(hospitalPhoto)
                  .then(function (response) { return response.request.path })
                return photoPath
              } catch (err) {
                console.error(err);
              }
            };
            if (result.photos) {
              const photoPath = await sendGetRequest(result)
              return await {
                first_name: result.name,
                last_name: result.name,
                username: result.name,
                email: `${result.reference}@gmail.com`,
                custom_json: {
                  ...result,
                  photo: {
                    google_url: `https://lh3.googleusercontent.com${photoPath}`
                  },
                },
                photo: {
                  google_url: `https://lh3.googleusercontent.com${photoPath}`
                },
                location: result.geometry?.location,
                rating: result.rating,
                vicinity: result.vicinity,
                types: result.types,
                totalRatings: result.user_ratings_total,
              }
            } else {
              return await {
                first_name: result.name,
                last_name: result.name,
                username: result.name,
                email: `${result.reference}@gmail.com`,
                custom_json: result,
                location: result.geometry?.location,
                rating: result.rating,
                vicinity: result.vicinity,
                types: result.types,
                totalRatings: result.user_ratings_total,
              }
            }
          }
          )
        )
        return { nextPage: response.data.next_page_token, hospitals: finalResponse }
      })
      .catch(function (error) {
        console.log(error);
      });

    if (hospitals.hospitals) {
      hospitals.hospitals.map(async (h) => {
        const existingHospital = await getHospitalByEmail(h.email);
        if (existingHospital) {
          return null
        } else {
          if (h.photo) {
            const newHospital = {
              hospitalName: h.username,
              photo: h.photo,
              password: `${h.custom_json.name.split(' ').join('')}${h.custom_json.reference}`,
              email: h.email,
              custom_json: h.custom_json,
              location: h.location,
              rating: h.rating,
              vicinity: h.vicinity,
              types: h.types,
              totalRatings: h.totalRatings,
            }
            return createHospital(newHospital)
          }
          return createHospital({
            hospitalName: h.username,
            password: `${h.custom_json.name.split(' ').join('')}${h.custom_json.reference}`,
            email: h.email,
            custom_json: h.custom_json,
            location: h.location,
            rating: h.rating,
            vicinity: h.vicinity,
            types: h.types,
            totalRatings: h.totalRatings,
          })
        }
      })
    }

    return res.status(200).json(hospitals)
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getNextPageHospitalHandler(req, res) {
  const { token } = req.params
  try {
    const config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?key=${googleKey}&pagetoken=${token}`,
      headers: { }
    };

    const hospitals = await axios(config)
      .then(async function (response) {
        const { results } = response.data;

        const finalResponse = await Promise.all(
          results.map(async (result) => {
            const sendGetRequest = (result) => {
              try {
                const hospitalPhoto = {
                  method: 'get',
                  url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${result.photos[0].photo_reference}&key=${googleKey}`,
                  headers: { }
                };
                const photoPath = axios(hospitalPhoto)
                  .then(function (response) { return response.request.path })
                return photoPath
              } catch (err) {
                console.error(err);
              }
            };
            if (result.photos) {
              const photoPath = await sendGetRequest(result)
              return await {
                first_name: result.name,
                last_name: result.name,
                username: result.name,
                email: `${result.reference}@gmail.com`,
                custom_json: {
                  ...result,
                  photo: {
                    google_url: `https://lh3.googleusercontent.com${photoPath}`
                  },
                },
                photo: {
                  google_url: `https://lh3.googleusercontent.com${photoPath}`
                },
                location: result.geometry?.location,
                rating: result.rating,
                vicinity: result.vicinity,
                types: result.types,
                totalRatings: result.user_ratings_total,
              }
            } else {
              return await {
                first_name: result.name,
                last_name: result.name,
                username: result.name,
                email: `${result.reference}@gmail.com`,
                custom_json: result,
                location: result.geometry?.location,
                rating: result.rating,
                vicinity: result.vicinity,
                types: result.types,
                totalRatings: result.user_ratings_total,
              }
            }
          }
          )
        )
        return { nextPage: response.data.next_page_token, hospitals: finalResponse }
      })
      .catch(function (error) {
        console.log(error);
      });

    if (hospitals.hospitals) {
      hospitals.hospitals.map(async (h) => {
        const existingHospital = await getHospitalByEmail(h.email);
        if (existingHospital) {
          return null
        } else {
          if (h.photo) {
            const newHospital = {
              hospitalName: h.username,
              photo: h.photo,
              password: `${h.custom_json.name.split(' ').join('')}${h.custom_json.reference}`,
              email: h.email,
              custom_json: h.custom_json,
              location: h.location,
              rating: h.rating,
              vicinity: h.vicinity,
              types: h.types,
              totalRatings: h.totalRatings,
            }
            return createHospital(newHospital)
          }
          return createHospital({
            hospitalName: h.username,
            password: `${h.custom_json.name.split(' ').join('')}${h.custom_json.reference}`,
            email: h.email,
            custom_json: h.custom_json,
            location: h.location,
            rating: h.rating,
            vicinity: h.vicinity,
            types: h.types,
            totalRatings: h.totalRatings,
          })
        }
      })
    }

    return res.status(200).json(hospitals)
  } catch (error) {
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
  getNextPageHospitalHandler,
};
