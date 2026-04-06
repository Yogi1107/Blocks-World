// If you're using react-router-dom, keep the Link/useLocation version.
// This simplified version uses plain <a> tags or accepts an activePath prop.

export default function Navbar({ activePath = '/solver' }) {
  const links = [{ path: '/solver', label: 'Solver' }]

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <span className="text-xl font-bold text-indigo-400 tracking-tight">BlocksWorld</span>
      <div className="flex gap-6">
        {links.map(({ path, label }) => (
          <a
            key={path}
            href={path}
            className={`text-sm font-medium transition-colors ${
              activePath === path
                ? 'text-indigo-400 border-b-2 border-indigo-400 pb-0.5'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  )
}