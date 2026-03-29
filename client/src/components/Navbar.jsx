import { Link, useLocation } from 'react-router-dom'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/solver', label: 'Solver' },
  { path: '/about', label: 'About' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <span className="text-xl font-bold text-indigo-400 tracking-tight">
        🧱 BlocksWorld
      </span>
      <div className="flex gap-6">
        {navLinks.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`text-sm font-medium transition-colors ${
              pathname === path
                ? 'text-indigo-400 border-b-2 border-indigo-400 pb-0.5'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  )
}