import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Solver from './pages/Solver'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Solver />
    </div>
  )
}

export default App