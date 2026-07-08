import './index.css';
import './App.css'
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router';
import Prepositions from './prepositions/Prepositions';
import PrepositionsSentences from './prepositionsSentences/PrepositionsSentences';
import DeHet from './deHet/DeHet';
import { useState } from 'react';
import ChooseActivityModal from './shared/ChooseActivityModal';
import Expressions from './expressions/Expressions';

const isMobile = window.matchMedia("(max-width: 767px)").matches;

type linksListModalProps = {
    onClick?: () => void;
};

const LinksList = ({ onClick } : linksListModalProps) => {
  const location = useLocation()
  return (
    <ul className={`nav flex-column ${isMobile ? '' : 'text-start ps-1'}`}>
      <li className={`nav-item mb-2 ${location.pathname === '/' ? 'fw-bold' : ''}`}>
        <Link className="nav-link" to="/" onClick={onClick}>De / Het</Link>
      </li>
      <li className={`nav-item mb-2 ${location.pathname === '/prepositions-verbs' ? 'fw-bold' : ''}`}>
        <Link className="nav-link" to="/prepositions-verbs" onClick={onClick}>Prepositions: Verbs</Link>
      </li>
      <li className={`nav-item mb-2 ${location.pathname === '/prepositions-sentences' ? 'fw-bold' : ''}`}>
        <Link className="nav-link" to="/prepositions-sentences" onClick={onClick}>Prepositions: Sentences</Link>
      </li>
      <li className={`nav-item mb-2 ${location.pathname === '/expressions' ? 'fw-bold' : ''}`}>
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
  const [showModal, setShowModal] = useState<boolean>(false)
  return (
    <BrowserRouter>
      <div className={'main' + (isMobile ? ' main--mobile' : '')}>
        {!isMobile && <Sidebar />}
        <div className='flex-grow-1'>
          <Routes>
            <Route path="/" element={<DeHet />} />
            <Route path="/prepositions-verbs" element={<Prepositions />} />
            <Route path="/prepositions-sentences" element={<PrepositionsSentences />} />
            <Route path="/expressions" element={<Expressions />} />
            {/* If no matching just show default DeHet  */}
            <Route path="*" element={<DeHet />} />
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
