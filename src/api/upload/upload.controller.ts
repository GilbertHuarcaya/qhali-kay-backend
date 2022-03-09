import fs from 'fs'
import { Request, Response } from 'express'
const cloudinary = require('cloudinary').v2

export async function uploadSingleHandler (req: Request, res: Response) {
  const { file }: any = req

  const size = file.size / 1024 / 1024

  if (size > 5) {
    return res.status(500).json({
      message: 'File size is too big!'
    })
  }

  try {
    const result = await cloudinary.uploader.upload(file.path)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json(error)
  } finally {
    fs.unlinkSync(file.path)
  }
}

export async function uploadArrayHandler (req: Request, res: Response) {
  const { files }: any = req

  const results = []
  for (const file of files) {
    try {
      const result = await cloudinary.uploader.upload(file.path)
      results.push(result)
    } catch (error) {
      return res.status(500).json(error)
    } finally {
      fs.unlinkSync(file.path)
    }
  }

  res.status(200).json(results)
}
