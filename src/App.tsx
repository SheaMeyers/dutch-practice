import './index.css';
import './App.css'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router';
import Prepositions from './prepositions/Prepositions';
import DeHet from './deHet/DeHet';
import { useState } from 'react';
import ChooseActivityModal from './shared/ChooseActivityModal';
import ZijnHebben from './zijnHebben/ZijnHebben';


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
        <li className={`nav-item mb-2 ${location.pathname === '/zijn-hebben' ? 'fw-bold' : ''}`}>
          <Link className="nav-link" to="/zijn-hebben">Zijn/Hebben</Link>
        </li>
      </ul>
    </nav>
  )
}


const App = () => {
  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <BrowserRouter>
      <div className={'main' + (isMobile ? ' main--mobile' : '')}>
        {!isMobile && <Sidebar />}
        <div className='flex-grow-1'>
          <Routes>
            <Route path="/" element={<Prepositions />} />
            <Route path="/de-het" element={<DeHet />} />
            <Route path="/zijn-hebben" element={<ZijnHebben />} />
          </Routes>
        </div>
        {isMobile &&
          <>
            <button
              className='btn btn-primary mt-4'
              onClick={() => setShowModal(true)}
            >
              Open Activies Menu
            </button>
            {
              showModal &&
              <ChooseActivityModal
                onClick={() => setShowModal(false)}
              />
            }
          </>
        }
      </div>
    </BrowserRouter>
  )
}

export default App;
