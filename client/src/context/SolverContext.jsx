import { createContext, useContext, useState, useCallback } from 'react'
import { solveStates, fetchExample } from '../utils/api'

const SolverContext = createContext(null)

export function SolverProvider({ children }) {
  const [status, setStatus]       = useState('idle')      // idle | loading | success | error
  const [error, setError]         = useState(null)
  const [result, setResult]       = useState(null)         // full API response
  const [inputStates, setInputStates] = useState(null)     // { initialState, goalState }

  const solve = useCallback(async ({ initialState, goalState }) => {
    setStatus('loading')
    setError(null)
    setInputStates({ initialState, goalState })

    try {
      const response = await solveStates(initialState, goalState)
      setResult(response.data)
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }, [])

  const loadExample = useCallback(async () => {
    setStatus('loading')
    setError(null)

    try {
      const response = await fetchExample()
      setResult(response.data)
      setInputStates({
        initialState: response.data.initialState,
        goalState:    response.data.goalState,
      })
      setStatus('success')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }, [])

  const reset = useCallback(() => {
    setStatus('idle')
    setError(null)
    setResult(null)
    setInputStates(null)
  }, [])

  return (
    <SolverContext.Provider value={{
      status,
      error,
      result,
      inputStates,
      solve,
      loadExample,
      reset,
      isLoading: status === 'loading',
      isSuccess: status === 'success',
      isError:   status === 'error',
    }}>
      {children}
    </SolverContext.Provider>
  )
}

// Custom hook — clean access anywhere
export const useSolver = () => {
  const ctx = useContext(SolverContext)
  if (!ctx) throw new Error('useSolver must be used inside <SolverProvider>')
  return ctx
}