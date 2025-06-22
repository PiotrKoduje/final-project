import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';


function App() {
  return (
    <div className="container mx-auto px-4 border border-red-500">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
