import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Axios instance with shared config
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,   // 30s — Python might take time on complex states
  headers: { 'Content-Type': 'application/json' },
})

// ── Request interceptor — log outgoing requests in dev ──
api.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.log(`📤 API ${config.method?.toUpperCase()} ${config.url}`, config.data ?? '')
  }
  return config
})

// ── Response interceptor — normalize errors ──
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

// ── API methods ──────────────────────────────────────────

export const solveStates = (initialState, goalState) =>
  api.post('/solve', { initialState, goalState })

export const fetchExample = () =>
  api.get('/example')

export const fetchHistory = () =>
  api.get('/history')

export default api