import { useNavigate } from 'react-router-dom'
import { useSolver }   from '../context/SolverContext'

const FEATURES = [
  { icon: '🔀', title: 'Side-by-side',   desc: 'BFS and DFS run simultaneously on the same input'       },
  { icon: '🎬', title: 'Step-by-step',   desc: 'Watch each move animated with play, pause and rewind'   },
  { icon: '📊', title: 'Live metrics',   desc: 'Compare steps, nodes and efficiency in real time'        },
  { icon: '🐍', title: 'Python engine',  desc: 'Algorithms computed in Python, served via Express API'   },
]

export default function Home() {
  const navigate = useNavigate()
  const { loadExample, isLoading } = useSolver()

  const handleTryDemo = async () => {
    await loadExample()
    navigate('/solver')
  }

  return (
    <div className="max-w-5xl mx-auto px-6">

      {/* Hero */}
      <div className="flex flex-col items-center text-center py-20">
        <div className="inline-block bg-indigo-950 border border-indigo-700
                        text-indigo-300 text-xs font-semibold px-3 py-1.5
                        rounded-full mb-6 tracking-wide uppercase">
          BFS & DFS Visualizer — MERN + Python
        </div>

        <h1 className="text-5xl font-extrabold text-white mb-4 leading-tight">
          Watch Algorithms
          <span className="text-indigo-400"> Think.</span>
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mb-8 leading-relaxed">
          Define a Blocks World puzzle and watch Breadth-First Search and
          Depth-First Search race to solve it — step by step, side by side.
        </p>

        <div className="flex gap-4">
          <button
            onClick={handleTryDemo}
            disabled={isLoading}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900
                       text-white font-bold px-6 py-3 rounded-xl transition text-sm"
          >
            {isLoading ? '⏳ Loading...' : '⚡ Try Demo'}
          </button>
          <button
            onClick={() => navigate('/solver')}
            className="border border-gray-600 hover:border-gray-400 text-gray-300
                       font-semibold px-6 py-3 rounded-xl transition text-sm"
          >
            Build Your Own
          </button>
        </div>
      </div>

      {/* Feature grid */}
      <div className="grid grid-cols-2 gap-4 pb-16">
        {FEATURES.map(({ icon, title, desc }) => (
          <div key={title}
            className="bg-gray-900 border border-gray-800 rounded-xl p-5
                       hover:border-indigo-800 transition">
            <div className="text-2xl mb-2">{icon}</div>
            <h3 className="text-white font-semibold mb-1">{title}</h3>
            <p className="text-gray-500 text-sm">{desc}</p>
          </div>
        ))}
      </div>

    </div>
  )
}