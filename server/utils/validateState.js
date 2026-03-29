/**
 * Validates the initialState and goalState before passing to Python.
 * Returns { valid: true } or { valid: false, message: '...' }
 */
export const validateStates = (initialState, goalState) => {
  if (!Array.isArray(initialState) || !Array.isArray(goalState)) {
    return { valid: false, message: 'States must be arrays.' }
  }

  if (initialState.length !== goalState.length) {
    return { valid: false, message: 'States must have the same number of pegs.' }
  }

  if (initialState.length < 2 || initialState.length > 5) {
    return { valid: false, message: 'Number of pegs must be between 2 and 5.' }
  }

  const initBlocks = initialState.flat()
  const goalBlocks = goalState.flat()

  if (initBlocks.length === 0) {
    return { valid: false, message: 'Initial state must have at least one block.' }
  }

  if (initBlocks.length > 6) {
    return { valid: false, message: 'Maximum 6 blocks allowed.' }
  }

  const validBlock = /^[A-Z]$/
  for (const block of [...initBlocks, ...goalBlocks]) {
    if (!validBlock.test(block)) {
      return { valid: false, message: `Invalid block name: "${block}". Must be a single uppercase letter.` }
    }
  }

  const initSorted = [...initBlocks].sort().join('')
  const goalSorted = [...goalBlocks].sort().join('')
  if (initSorted !== goalSorted) {
    return { valid: false, message: 'Both states must contain the exact same blocks.' }
  }

  return { valid: true }
}