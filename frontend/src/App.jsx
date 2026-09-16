import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import OfertaDetalhe from './pages/OfertaDetalhe';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Checkout from './pages/Checkout';

function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Navegação livre, sem necessidade de conta */}
        <Route path="/" element={<Home />} />
        <Route path="/ofertas/:id" element={<OfertaDetalhe />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Área protegida: só acessível com login (ex.: comprar) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/checkout/:id" element={<Checkout />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
