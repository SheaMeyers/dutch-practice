import './index.css';
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router';
import Prepositions from './prepositions/Prepositions';
import DeHet from './deHet/DeHet';

const Sidebar = () => (
  <nav className='flex-grow-2 sidebar'>
    <ul className="nav flex-column">
      <li className="nav-item mb-2">
        <Link className="nav-link" to="/">Prepositions</Link>
      </li>
      <li className="nav-item mb-2">
        <Link className="nav-link" to="/de-het">De/Het</Link>
      </li>
    </ul>
  </nav>
)

const App = () => (
  <BrowserRouter>
    <div className='main'>
      <Sidebar />
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
