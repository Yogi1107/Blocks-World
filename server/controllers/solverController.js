import { runPython }      from '../utils/runPython.js'
import { validateStates } from '../utils/validateState.js'
import SolverResult       from '../models/SolverResult.js'

// POST /api/solve
export const solveHandler = async (req, res) => {
  try {
    const { initialState, goalState } = req.body

    // 1. Validate input
    const validation = validateStates(initialState, goalState)
    if (!validation.valid) {
      return res.status(400).json({ success: false, message: validation.message })
    }

    // 2. Run Python algorithm engine
    const result = await runPython({ initialState, goalState })

    // 3. Save to MongoDB (non-blocking — don't fail if DB is down)
    try {
      await SolverResult.create({
        initialState,
        goalState,
        bfs:     result.bfs,
        dfs:     result.dfs,
        metrics: result.metrics,
      })
    } catch (dbError) {
      console.warn('⚠️  Could not save to MongoDB:', dbError.message)
    }

    // 4. Return result to frontend
    return res.status(200).json({
      success: true,
      data: result,
    })

  } catch (error) {
    console.error('Solver error:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Algorithm execution failed.',
      error: error.message,
    })
  }
}


// GET /api/example
export const exampleHandler = async (req, res) => {
  try {
    const initialState = [['A', 'B'], ['C'], []]
    const goalState    = [['A'], ['B', 'C'], []]

    const result = await runPython({ initialState, goalState })

    return res.status(200).json({
      success: true,
      data: { ...result, initialState, goalState },
    })

  } catch (error) {
    console.error('Example error:', error.message)
    return res.status(500).json({
      success: false,
      message: 'Failed to load example.',
      error: error.message,
    })
  }
}


// GET /api/history  (bonus — last 10 solves from DB)
export const historyHandler = async (req, res) => {
  try {
    const results = await SolverResult
      .find()
      .sort({ createdAt: -1 })
      .limit(10)
      .select('initialState goalState metrics createdAt')

    return res.status(200).json({ success: true, data: results })

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Could not fetch history.' })
  }
}