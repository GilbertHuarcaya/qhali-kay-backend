import express, { Application } from 'express'
import morgan from 'morgan'
import cors from 'cors'

function connectDB (app: Application) {
  app.use(cors())
  app.use(morgan('dev'))
  app.use(express.json())
}

export default connectDB
