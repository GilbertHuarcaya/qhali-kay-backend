const {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
} = require('./review.service');

async function getAllReviewsHandler(req, res) {
  try {
    const reviews = await getAllReviews();
    return res.status(200).json(reviews);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function getReviewByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const review = await getReviewById(id);

    if (!review) {
      return res
        .status(404)
        .json({ message: `Review not found with id: ${id}` });
    }

    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function createReviewHandler(req, res) {
  try {
    const review = await createReview(req.body);
    return res.status(201).json(review);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function updateReviewHandler(req, res) {
  const { id } = req.params;
  try {
    const review = await updateReview(id, req.body);

    if (!review) {
      return res
        .status(404)
        .json({ message: `Review not found with id: ${id}` });
    }

    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

async function deleteReviewHandler(req, res) {
  const { id } = req.params;
  try {
    const review = await deleteReview(id);

    if (!review) {
      return res
        .status(404)
        .json({ message: `Review not found with id: ${id}` });
    }

    return res.status(200).json(review);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createReviewHandler,
  deleteReviewHandler,
  getAllReviewsHandler,
  getReviewByIdHandler,
  updateReviewHandler,
};
