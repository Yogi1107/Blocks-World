import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`✅ MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.warn(`⚠️  MongoDB not connected: ${error.message}`)
    console.warn('   Server will run without database storage.')
    // Don't exit — app still works without DB (just won't persist results)
  }
}

export default connectDB