import InputForm from '../components/InputForm'
import SplitScreen from '../components/SplitScreen'
import ComparisonTable from '../components/ComparisonTable'
import { useSolver } from '../context/SolverContext'

export default function Solver() {
  const { result, inputStates, isLoading, isError, error, status } = useSolver()

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-white">
          Blocks World <span className="text-indigo-400">Solver</span>
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Define your block states and watch BFS & DFS solve it in real time.
        </p>
      </div>

      {/* Input form */}
      <InputForm />

      {/* Loading */}
      {isLoading && (
        <div className="mt-8 flex flex-col items-center gap-3 text-gray-400">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent
                          rounded-full animate-spin" />
          <p className="text-sm">Running BFS & DFS algorithms...</p>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="mt-6 bg-red-950 border border-red-700 text-red-300
                        rounded-xl px-5 py-4 text-sm">
          <p className="font-bold mb-1">Error</p>
          <p>{error}</p>
          <p className="text-red-500 mt-2 text-xs">
            Make sure the backend server is running on port 5000.
          </p>
        </div>
      )}

      {/* Results */}
      {status === 'success' && result && inputStates && (
        <>
          {/* Metrics bar */}
          <div className="mt-6 grid grid-cols-4 gap-3">
            {[
              { label: 'BFS Steps', value: result.metrics.bfsStepsCount },
              { label: 'DFS Steps', value: result.metrics.dfsStepsCount },
              { label: 'BFS Tree Nodes', value: result.metrics.bfsTreeNodes },
              { label: 'DFS Tree Nodes', value: result.metrics.dfsTreeNodes },
            ].map(({ label, value }) => (
              <div key={label}
                className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center">
                <p className="text-2xl font-extrabold text-indigo-400">{value}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Split screen */}
          <SplitScreen
            bfsSteps={result.bfs.steps}
            dfsSteps={result.dfs.steps}
            goalState={inputStates.goalState}
            bfsTree={result.bfs.tree}
            dfsTree={result.dfs.tree}
          />

          {/* Comparison dashboard */}
          <div className="mt-8">
            <h2 className="text-xl font-bold text-white mb-1">
              Algorithm <span className="text-indigo-400">Comparison</span>
            </h2>
            <p className="text-gray-500 text-sm mb-4">
              Theoretical properties vs practical results from this run.
            </p>
            <ComparisonTable metrics={result.metrics} />
          </div>
        </>
      )}

      {/* Show theoretical table even before solving */}
      {status === 'idle' && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-white mb-1">
            Algorithm <span className="text-indigo-400">Comparison</span>
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Run the solver to see practical results alongside theory.
          </p>
          <ComparisonTable metrics={null} />
        </div>
      )}

    </div>
  )
}