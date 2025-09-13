import './index.css';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import Prepositions from './prepositions/Prepositions';
import DeHet from './deHet/DeHet';

const App = () => {
  return (
    <Router>
      <div className='main'>
        <Routes>
          <Route path="/" element={<Prepositions />} />
          <Route path="/de-het" element={<DeHet />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
