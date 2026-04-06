import { useState } from 'react'
import StateInput from './StateInput'
import { useSolver } from '../context/SolverContext'

const emptyState  = () => [[], [], []]
const DEMO_INITIAL = [['A', 'B'], ['C'], []]
const DEMO_GOAL    = [['A'], ['B', 'C'], []]

export default function InputForm() {
  const { solve, isLoading, loadExample } = useSolver()

  const [initialState, setInitialState] = useState(emptyState())
  const [goalState,    setGoalState]    = useState(emptyState())
  const [error,        setError]        = useState('')

  const handleLoadDemo = () => {
    setInitialState(DEMO_INITIAL.map(p => [...p]))
    setGoalState(DEMO_GOAL.map(p => [...p]))
    setError('')
  }

  const handleReset = () => {
    setInitialState(emptyState())
    setGoalState(emptyState())
    setError('')
  }

  const validate = () => {
    const initBlocks = initialState.flat()
    const goalBlocks = goalState.flat()

    if (initBlocks.length === 0)
      return 'Initial state must have at least one block.'
    if (goalBlocks.length === 0)
      return 'Goal state must have at least one block.'
    if (initBlocks.length !== goalBlocks.length)
      return 'Both states must have the same number of blocks.'

    const initSorted = [...initBlocks].sort().join('')
    const goalSorted = [...goalBlocks].sort().join('')
    if (initSorted !== goalSorted)
      return 'Both states must contain the exact same blocks.'

    if (JSON.stringify(initialState) === JSON.stringify(goalState))
      return 'Initial and goal states are already the same!'

    return ''
  }

  const handleSolve = () => {
    const validationError = validate()
    if (validationError) { setError(validationError); return }
    setError('')
    solve({ initialState, goalState })
  }

  return (
    <div className="bg-gray-950 border border-gray-800 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-white">Configure States</h2>
        <button
          onClick={handleLoadDemo}
          className="text-xs bg-amber-600 hover:bg-amber-500 text-white font-semibold px-3 py-1.5 rounded-lg transition"
        >
          Load Demo
        </button>
      </div>

      <div className="flex gap-4 mb-5">
        <StateInput label="Initial State" value={initialState} onChange={setInitialState} />
        <StateInput label="Goal State"    value={goalState}    onChange={setGoalState}    />
      </div>

      {error && (
        <div className="bg-red-950 border border-red-700 text-red-300 text-sm rounded-lg px-4 py-3 mb-4">
          {error}
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSolve}
          disabled={isLoading}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900
                     disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition text-sm"
        >
          {isLoading ? 'Running algorithms...' : 'Solve'}
        </button>
        <button
          onClick={handleReset}
          className="border border-gray-600 hover:border-gray-400 text-gray-300
                     font-semibold px-5 py-3 rounded-xl transition text-sm"
        >
          Reset
        </button>
      </div>
    </div>
  )
}