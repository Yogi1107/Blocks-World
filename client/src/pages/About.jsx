const TEAM_ROLES = [
  {
    role: 'Frontend Developer',
    icon: '🎨',
    tasks: ['React UI & components', 'Split-screen visualization', 'Animation & playback controls'],
  },
  {
    role: 'Backend Developer',
    icon: '⚙️',
    tasks: ['Express API design', 'MongoDB integration', 'Python-Node bridge'],
  },
  {
    role: 'Algorithm Developer',
    icon: '🧠',
    tasks: ['BFS implementation', 'DFS implementation', 'Tree & log generation'],
  },
]

const TECH_STACK = [
  { name: 'React',          category: 'Frontend',  color: 'text-blue-400'   },
  { name: 'Tailwind CSS',   category: 'Frontend',  color: 'text-cyan-400'   },
  { name: 'Framer Motion',  category: 'Frontend',  color: 'text-pink-400'   },
  { name: 'Node.js',        category: 'Backend',   color: 'text-green-400'  },
  { name: 'Express.js',     category: 'Backend',   color: 'text-green-300'  },
  { name: 'MongoDB',        category: 'Database',  color: 'text-emerald-400'},
  { name: 'Python',         category: 'Algorithm', color: 'text-yellow-400' },
]

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-10">

      {/* Hero */}
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-white mb-3">
          About <span className="text-indigo-400">BlocksWorld</span>
        </h1>
        <p className="text-gray-400 text-base leading-relaxed max-w-2xl">
          A web-based visualization system demonstrating Breadth-First Search (BFS)
          and Depth-First Search (DFS) applied to the classic Blocks World problem.
          Built with the MERN stack and a Python algorithm engine.
        </p>
      </div>

      {/* What is Blocks World */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">
          What is the Blocks World Problem?
        </h2>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-5 text-gray-300 text-sm leading-relaxed">
          <p className="mb-3">
            The <strong className="text-white">Blocks World</strong> is a classic AI planning problem.
            You have a set of lettered blocks arranged in stacks on pegs. The goal is to
            rearrange them from an <strong className="text-indigo-300">initial configuration</strong> to
            a <strong className="text-indigo-300">goal configuration</strong> by moving one block at a time.
          </p>
          <p className="mb-3">
            <strong className="text-white">Rules:</strong> Only the top block of any stack can be moved.
            Each move places it on top of another stack or onto an empty peg.
          </p>
          <p>
            <strong className="text-white">State representation:</strong> Each state is an array of stacks —
            for example <code className="bg-gray-800 px-1.5 py-0.5 rounded text-indigo-300">
              [["A","B"], ["C"], []]
            </code> means A is on the table with B on top, C alone on peg 2, peg 3 is empty.
          </p>
        </div>
      </section>

      {/* Algorithms */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">How the Algorithms Work</h2>
        <div className="grid grid-cols-2 gap-4">

          <div className="bg-gray-900 border-t-4 border-blue-500 rounded-xl p-5">
            <h3 className="text-blue-400 font-bold mb-2">BFS — Breadth First Search</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              Explores all states at depth 1 before depth 2, depth 2 before depth 3, and so on.
              Uses a <strong className="text-white">Queue (FIFO)</strong>.
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>✅ Always finds the <strong className="text-white">shortest path</strong></li>
              <li>✅ Complete — will always find a solution if one exists</li>
              <li>⚠️ Uses more memory (stores entire frontier)</li>
            </ul>
          </div>

          <div className="bg-gray-900 border-t-4 border-violet-500 rounded-xl p-5">
            <h3 className="text-violet-400 font-bold mb-2">DFS — Depth First Search</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              Explores as deep as possible before backtracking.
              Uses a <strong className="text-white">Stack (LIFO)</strong>.
            </p>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>✅ Uses less memory (stores only current path)</li>
              <li>⚠️ May not find the shortest solution</li>
              <li>⚠️ Not complete without cycle detection</li>
            </ul>
          </div>

        </div>
      </section>

      {/* Tech stack */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">Tech Stack</h2>
        <div className="flex flex-wrap gap-2">
          {TECH_STACK.map(({ name, category, color }) => (
            <div key={name}
              className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 flex items-center gap-2">
              <span className={`text-sm font-bold ${color}`}>{name}</span>
              <span className="text-xs text-gray-600">{category}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Team structure */}
      <section className="mb-10">
        <h2 className="text-lg font-bold text-white mb-3">Project Roles</h2>
        <div className="grid grid-cols-3 gap-4">
          {TEAM_ROLES.map(({ role, icon, tasks }) => (
            <div key={role}
              className="bg-gray-900 border border-gray-700 rounded-xl p-4">
              <div className="text-2xl mb-2">{icon}</div>
              <h3 className="text-white font-semibold text-sm mb-2">{role}</h3>
              <ul className="space-y-1">
                {tasks.map(t => (
                  <li key={t} className="text-gray-500 text-xs">• {t}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* System architecture */}
      <section>
        <h2 className="text-lg font-bold text-white mb-3">System Architecture</h2>
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
          <div className="flex items-center justify-center gap-3 flex-wrap text-sm">
            {[
              { label: 'React UI',         color: 'bg-blue-900   border-blue-600   text-blue-300'   },
              { label: '→',               color: 'text-gray-600 bg-transparent border-transparent' },
              { label: 'Express API',      color: 'bg-green-900  border-green-600  text-green-300'  },
              { label: '→',               color: 'text-gray-600 bg-transparent border-transparent' },
              { label: 'Python Engine',    color: 'bg-yellow-900 border-yellow-600 text-yellow-300' },
              { label: '→',               color: 'text-gray-600 bg-transparent border-transparent' },
              { label: 'MongoDB',          color: 'bg-emerald-900 border-emerald-600 text-emerald-300'},
            ].map(({ label, color }, i) => (
              <div key={i}
                className={`border rounded-lg px-3 py-1.5 font-medium ${color}`}>
                {label}
              </div>
            ))}
          </div>
          <p className="text-gray-500 text-xs text-center mt-4">
            React sends states → Express validates → Python solves → results saved to MongoDB → returned to React
          </p>
        </div>
      </section>

    </div>
  )
}