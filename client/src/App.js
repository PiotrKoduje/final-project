import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Footer from './components/views/Footer/Footer';
import Header from './components/views/Header/Header';
import Cart from './components/pages/Cart/Cart';
import CountryWines from './components/pages/CountryWines/CountryWines';
import Wine from './components/pages/Wine/Wine';
import Summary from './components/pages/Summary/Summary';
import Order from './components/pages/Order/Order';

function App() {
  return (
      <div className="max-w-screen-xl mx-auto px-4">
      <Header />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/wines/:id" element={ <Wine /> } />
        <Route path="/wines/country/:country" element={ <CountryWines /> } />
        <Route path="/cart" element={ <Cart /> } />
        <Route path="/summary" element={ <Summary /> } />
        <Route path="/order" element={ <Order /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
