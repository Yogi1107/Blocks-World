import express   from 'express'
import cors      from 'cors'
import dotenv    from 'dotenv'
import connectDB from './config/db.js'
import solverRoutes from './routes/solverRoutes.js'

dotenv.config()

const app  = express()
const PORT = process.env.PORT || 5000

// ── Middleware ───────────────────────────────
app.use(cors({ origin: 'http://localhost:5173' }))  // allow React dev server
app.use(express.json())

// ── Routes ───────────────────────────────────
app.use('/api', solverRoutes)

// ── Health check ─────────────────────────────
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── 404 handler ──────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.path} not found` })
})

// ── Global error handler ─────────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

// ── Start ────────────────────────────────────
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`)
    console.log(`📡 API ready at http://localhost:${PORT}/api`)
  })
})