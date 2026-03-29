const THEORETICAL = [
  { metric: 'Data Structure',  bfs: 'Queue (FIFO)',        dfs: 'Stack (LIFO)'         },
  { metric: 'Time Complexity', bfs: 'O(bᵈ)',               dfs: 'O(bᵐ)'                },
  { metric: 'Space Complexity',bfs: 'O(bᵈ)',               dfs: 'O(b·m)'               },
  { metric: 'Completeness',    bfs: '✅ Yes',              dfs: '❌ No'                 },
  { metric: 'Optimality',      bfs: '✅ Yes',              dfs: '❌ No'                 },
  { metric: 'Search Order',    bfs: 'Level by level',      dfs: 'Deepest path first'   },
  { metric: 'Memory Usage',    bfs: 'High (stores level)', dfs: 'Low (stores path)'    },
]

export default function ComparisonTable({ metrics }) {
  const PRACTICAL = metrics ? [
    {
      metric: 'Steps Taken',
      bfs: metrics.bfsStepsCount,
      dfs: metrics.dfsStepsCount,
      winner: metrics.bfsStepsCount <= metrics.dfsStepsCount ? 'bfs' : 'dfs',
    },
    {
      metric: 'Tree Nodes Generated',
      bfs: metrics.bfsTreeNodes,
      dfs: metrics.dfsTreeNodes,
      winner: metrics.bfsTreeNodes <= metrics.dfsTreeNodes ? 'bfs' : 'dfs',
    },
  ] : null

  return (
    <div className="flex flex-col gap-6 mt-6">

      {/* ── Theoretical ─────────────────────────── */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-700">
          <h3 className="text-white font-bold text-base">Theoretical Comparison</h3>
          <p className="text-gray-500 text-xs mt-0.5">
            Algorithm properties independent of input
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-800">
                <th className="text-left px-5 py-3 text-gray-400 font-semibold w-44">
                  Metric
                </th>
                <th className="text-center px-5 py-3 text-blue-400 font-semibold">
                  BFS
                </th>
                <th className="text-center px-5 py-3 text-violet-400 font-semibold">
                  DFS
                </th>
              </tr>
            </thead>
            <tbody>
              {THEORETICAL.map(({ metric, bfs, dfs }, i) => (
                <tr
                  key={metric}
                  className={i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-950'}
                >
                  <td className="px-5 py-3 text-gray-400 font-medium">{metric}</td>
                  <td className="px-5 py-3 text-center text-gray-200">{bfs}</td>
                  <td className="px-5 py-3 text-center text-gray-200">{dfs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Practical ───────────────────────────── */}
      {PRACTICAL ? (
        <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-700">
            <h3 className="text-white font-bold text-base">Practical Results</h3>
            <p className="text-gray-500 text-xs mt-0.5">
              Measured from the last solve
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-800">
                  <th className="text-left px-5 py-3 text-gray-400 font-semibold w-44">
                    Metric
                  </th>
                  <th className="text-center px-5 py-3 text-blue-400 font-semibold">
                    BFS
                  </th>
                  <th className="text-center px-5 py-3 text-violet-400 font-semibold">
                    DFS
                  </th>
                  <th className="text-center px-5 py-3 text-gray-400 font-semibold">
                    Winner
                  </th>
                </tr>
              </thead>
              <tbody>
                {PRACTICAL.map(({ metric, bfs, dfs, winner }, i) => (
                  <tr
                    key={metric}
                    className={i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-950'}
                  >
                    <td className="px-5 py-3 text-gray-400 font-medium">{metric}</td>
                    <td className={`px-5 py-3 text-center font-bold ${
                      winner === 'bfs' ? 'text-blue-400' : 'text-gray-300'
                    }`}>
                      {bfs} {winner === 'bfs' && '🏆'}
                    </td>
                    <td className={`px-5 py-3 text-center font-bold ${
                      winner === 'dfs' ? 'text-violet-400' : 'text-gray-300'
                    }`}>
                      {dfs} {winner === 'dfs' && '🏆'}
                    </td>
                    <td className="px-5 py-3 text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">
                      {winner === 'bfs' ? (
                        <span className="text-blue-400">BFS</span>
                      ) : (
                        <span className="text-violet-400">DFS</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-700 rounded-xl px-5 py-8 text-center">
          <p className="text-gray-500 text-sm">
            Run the solver to see practical comparison results here.
          </p>
        </div>
      )}

    </div>
  )
}