import './index.css';
import './App.css'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router';
import Prepositions from './prepositions/Prepositions';
import DeHet from './deHet/DeHet';
import { useState } from 'react';


const Sidebar = () => {
  const location = useLocation()
  return (
    <nav className='flex-grow-2 sidebar'>
      <h4>Activities</h4>
      <ul className="nav flex-column">
        <li className={`nav-item mb-2 ${location.pathname === '/' ? 'fw-bold' : ''}`}>
          <Link className="nav-link" to="/">Prepositions</Link>
        </li>
        <li className={`nav-item mb-2 ${location.pathname === '/de-het' ? 'fw-bold' : ''}`}>
          <Link className="nav-link" to="/de-het">De/Het</Link>
        </li>
      </ul>
    </nav>
  )
}

const CollapsableSidebard = () => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true)
  return (
    <>
      {isCollapsed &&
        <button 
          className="btn btn-primary" 
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          Open
        </button>
      }
      <div className={`collapse ${!isCollapsed ? 'show' : ''}`}>
          <button 
            className="btn btn-primary" 
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            Close
          </button>
          <Sidebar />
      </div>
    </>
  )
}

const App = () => (
  <BrowserRouter>
    <div className='main'>
      <CollapsableSidebard />
      <div className='flex-grow-1'>
        <Routes>
          <Route path="/" element={<Prepositions />} />
          <Route path="/de-het" element={<DeHet />} />
        </Routes>
      </div>
    </div>
  </BrowserRouter>
)

export default App;
