import './index.css';
import './App.css'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router';
import Prepositions from './prepositions/Prepositions';
import DeHet from './deHet/DeHet';
import { useState } from 'react';
import ChooseActivityModal from './shared/ChooseActivityModal';
import ZijnHebben from './zijnHebben/ZijnHebben';
import Expressions from './expressions/Expressions';


type linksListModalProps = {
    onClick?: () => void;
};

const LinksList = ({ onClick } : linksListModalProps) => {
  const location = useLocation()
  return (
    <ul className="nav flex-column">
      <li className={`nav-item mb-2 ${location.pathname === '/' ? 'fw-bold' : ''}`}>
        <Link className="nav-link" to="/" onClick={onClick}>Prepositions</Link>
      </li>
      <li className={`nav-item mb-2 ${location.pathname === '/de-het' ? 'fw-bold' : ''}`}>
        <Link className="nav-link" to="/de-het" onClick={onClick}>De/Het</Link>
      </li>
      <li className={`nav-item mb-2 ${location.pathname === '/zijn-hebben' ? 'fw-bold' : ''}`}>
        <Link className="nav-link" to="/zijn-hebben" onClick={onClick}>Zijn/Hebben</Link>
      </li>
      <li className={`nav-item mb-2 ${location.pathname === '/zijn-hebben' ? 'fw-bold' : ''}`}>
        <Link className="nav-link" to="/expressions" onClick={onClick}>Expressions</Link>
      </li>
    </ul>
  )
}


const Sidebar = () =>
    <nav className='flex-grow-2 sidebar'>
      <h4>Activities</h4>
      <LinksList />
    </nav>


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
            <Route path="/expressions" element={<Expressions />} />
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
                LinksList={LinksList}
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
