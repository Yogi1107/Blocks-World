const THEORETICAL = [
  { metric: 'Data Structure',   bfs: 'Queue (FIFO)',        dfs: 'Stack (LIFO)'       },
  { metric: 'Time Complexity',  bfs: 'O(bᵈ)',               dfs: 'O(bᵐ)'              },
  { metric: 'Space Complexity', bfs: 'O(bᵈ)',               dfs: 'O(b·m)'             },
  { metric: 'Completeness',     bfs: 'Yes',              dfs: 'No'               },
  { metric: 'Optimality',       bfs: 'Yes',              dfs: 'No'               },
  { metric: 'Search Order',     bfs: 'Level by level',      dfs: 'Deepest path first' },
  { metric: 'Memory Usage',     bfs: 'High (stores level)', dfs: 'Low (stores path)'  },
]

function Table({ headers, rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-800">
            {headers.map(({ label, cls }) => (
              <th key={label} className={`px-5 py-3 font-semibold ${cls}`}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-950'}>
              {row.map((cell, j) => (
                <td key={j} className={`px-5 py-3 ${j === 0 ? 'text-gray-400 font-medium' : 'text-center text-gray-200'}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function ComparisonTable({ metrics }) {
  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* Theoretical */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-700">
          <h3 className="text-white font-bold text-base">Theoretical Comparison</h3>
          <p className="text-gray-500 text-xs mt-0.5">Algorithm properties independent of input</p>
        </div>
        <Table
          headers={[
            { label: 'Metric', cls: 'text-left text-gray-400 w-44' },
            { label: 'BFS',    cls: 'text-center text-blue-400'    },
            { label: 'DFS',    cls: 'text-center text-violet-400'  },
          ]}
          rows={THEORETICAL.map(r => [r.metric, r.bfs, r.dfs])}
        />
      </div>

      {/* Practical */}
      {metrics ? (
        <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-700">
            <h3 className="text-white font-bold text-base">Practical Results</h3>
            <p className="text-gray-500 text-xs mt-0.5">Measured from the last solve</p>
          </div>
          <Table
            headers={[
              { label: 'Metric', cls: 'text-left text-gray-400 w-44' },
              { label: 'BFS',    cls: 'text-center text-blue-400'    },
              { label: 'DFS',    cls: 'text-center text-violet-400'  },
            ]}
            rows={[
              ['Steps Taken',
                metrics.bfsStepsCount,
                metrics.dfsStepsCount],
              ['Tree Nodes Generated',
                metrics.bfsTreeNodes,
                metrics.dfsTreeNodes],
            ]}
          />
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-700 rounded-xl px-5 py-8 text-center text-gray-500 text-sm">
          Run the solver to see practical comparison results here.
        </div>
      )}
    </div>
  )
}