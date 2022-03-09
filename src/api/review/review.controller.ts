import {
  createReview,
  deleteReview,
  getAllReviews,
  getReviewById,
  updateReview
} from './review.service'
import { Request, Response } from 'express'

export async function getAllReviewsHandler (req: Request, res: Response) {
  try {
    const reviews = await getAllReviews()
    return res.status(200).json(reviews)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export async function getReviewByIdHandler (req: Request, res: Response) {
  const { id } = req.params
  try {
    const review = await getReviewById(id)

    if (!review) {
      return res
        .status(404)
        .json({ message: `Review not found with id: ${id}` })
    }

    return res.status(200).json(review)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export async function createReviewHandler (req: Request, res: Response) {
  try {
    const review = await createReview(req.body)
    return res.status(201).json(review)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export async function updateReviewHandler (req: Request, res: Response) {
  const { id } = req.params
  try {
    const review = await updateReview(id, req.body)

    if (!review) {
      return res
        .status(404)
        .json({ message: `Review not found with id: ${id}` })
    }

    return res.status(200).json(review)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

export async function deleteReviewHandler (req: Request, res: Response) {
  const { id } = req.params
  try {
    const review = await deleteReview(id)

    if (!review) {
      return res
        .status(404)
        .json({ message: `Review not found with id: ${id}` })
    }

    return res.status(200).json(review)
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}
