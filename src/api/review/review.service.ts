import Review from './review.model'

/**
 * Get all reviews
 * @returns all reviews
 */
export async function getAllReviews () {
  const reviews = await Review.find()
  return reviews
}

/**
 * Get review by id
 * @param {string} id Indentifier of the review to be filtered
 * @returns review
 */
export async function getReviewById (id: string) {
  const review = await Review.findById(id)
  return review
}

/**
 * Create a new review
 * @param {Object} review Review to create
 * @returns Review created
 */
export async function createReview (review: any) {
  const newReview = new Review(review)
  const savedReview = await newReview.save()
  return savedReview
}

/**
 * Update a review
 * @param {string} id Indentifier of the review to be updated
 * @param {*} review Body of the review to be updated
 * @returns review updated
 */
export async function updateReview (id: string, review: any) {
  const updatedReview = await Review.findByIdAndUpdate(id, review)
  return updatedReview
}

/**
 * Delete a review
 * @param {String} id Identifier of the review to be deleted
 * @returns Review deleted
 */
export async function deleteReview (id: string) {
  const deletedReview = await Review.findByIdAndDelete(id)
  return deletedReview
}
