import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Solver from './pages/Solver'
import TreeView from './components/TreeView'
import TreeRepresentation from './pages/TreeRepresentation'
function App() {
  return (


    <div className="min-h-screen bg-gray-950 text-white">
          <Router>
            <Routes>
              <Route path="/" element={<Solver></Solver>}/>
              <Route path="/tree_representation" element={<TreeRepresentation/>}/>
              {/* <Route path="*" element={<Solver></Solver>}/> */}
            </Routes>

          </Router>


    </div>
  )
}

export default App