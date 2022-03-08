import mongoose, { ConnectOptions } from 'mongoose'

async function connectDB () {
  const URI = process.env.DB_URI as string

  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    } as ConnectOptions)
    console.log('MongoDB Connected')
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

export default connectDB
