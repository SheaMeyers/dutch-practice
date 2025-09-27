import './index.css';
import './App.css'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router';
import Prepositions from './prepositions/Prepositions';
import DeHet from './deHet/DeHet';


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


const App = () => {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  return (
    <BrowserRouter>
      <div className={'main' + (isMobile ? ' main--mobile' : '')}>
        {!isMobile && <Sidebar />}
        <div className='flex-grow-1'>
          <Routes>
            <Route path="/" element={<Prepositions />} />
            <Route path="/de-het" element={<DeHet />} />
          </Routes>
        </div>
        {isMobile &&
          <button
            className='btn btn-primary mt-4'
          >
            Open Activies Menu
          </button>
        }
      </div>
    </BrowserRouter>
  )
}

export default App;
