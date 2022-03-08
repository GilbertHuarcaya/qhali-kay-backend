import mongoose from 'mongoose'

const ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    userName: {
      type: String,
      ref: 'User',
      required: true
    },
    userPhoto: {
      type: String,
      ref: 'User',
      required: true
    },
    hospitalEmail: {
      type: String
    },
    message: {
      type: String,
      required: true,
      minLength: 10,
      trim: true
    },
    rating: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
)

const Review = mongoose.model('Review', ReviewSchema)
export default Review
