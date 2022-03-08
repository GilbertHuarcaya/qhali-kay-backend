const Review = require('./review.model');

/**
 * Get all reviews
 * @returns all reviews
 */
async function getAllReviews() {
  const reviews = await Review.find();
  return reviews;
}

/**
 * Get review by id
 * @param {string} id Indentifier of the review to be filtered
 * @returns review
 */
async function getReviewById(id) {
  const review = await Review.findById(id);
  return review;
}

/**
 * Create a new review
 * @param {Object} review Review to create
 * @returns Review created
 */
async function createReview(review) {
  const newReview = new Review(review);
  const savedReview = await newReview.save();
  return savedReview;
}

/**
 * Update a review
 * @param {string} id Indentifier of the review to be updated
 * @param {*} review Body of the review to be updated
 * @returns review updated
 */
async function updateReview(id, review) {
  const updatedReview = await Review.findByIdAndUpdate(id, review);
  return updatedReview;
}

/**
 * Delete a review
 * @param {String} id Identifier of the review to be deleted
 * @returns Review deleted
 */
async function deleteReview(id) {
  const deletedReview = await Review.findByIdAndDelete(id);
  return deletedReview;
}

module.exports = {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview,
};
