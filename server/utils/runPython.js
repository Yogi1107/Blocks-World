import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

// __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname  = path.dirname(__filename)

const PYTHON_SCRIPT = path.resolve(__dirname, '../../python/solver.py')

export const runPython = (payload) => {
  return new Promise((resolve, reject) => {
    // Spawn Python process
    const python = spawn('py', [PYTHON_SCRIPT])

    let output  = ''
    let errorOutput = ''

    // Collect stdout (the JSON result)
    python.stdout.on('data', (data) => {
      output += data.toString()
    })

    // Collect stderr (Python errors / tracebacks)
    python.stderr.on('data', (data) => {
      errorOutput += data.toString()
    })

    // On process close
    python.on('close', (code) => {
      if (code !== 0) {
        return reject(new Error(`Python exited with code ${code}: ${errorOutput}`))
      }

      try {
        const result = JSON.parse(output)

        if (result.error) {
          return reject(new Error(`Python error: ${result.error}`))
        }

        resolve(result)
      } catch (parseError) {
        reject(new Error(`Failed to parse Python output: ${output}`))
      }
    })

    // Handle spawn errors (e.g. python not found)
    python.on('error', (err) => {
      reject(new Error(`Failed to start Python process: ${err.message}`))
    })

    // Write input to Python's stdin and close it
    python.stdin.write(JSON.stringify(payload))
    python.stdin.end()
  })
}