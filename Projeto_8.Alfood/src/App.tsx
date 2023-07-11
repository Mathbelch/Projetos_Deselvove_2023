import { Routes, Route } from 'react-router-dom';
import Home from './paginas/Home';
import VitrineRestaurantes from './paginas/VitrineRestaurantes';
import FormRestaurante from './paginas/Admin/Restaurantes/FormRestaurante';
import AdminRestaurantes from './paginas/Admin/Restaurantes/adminRestaurantes';
import PaginaBaseAdmin from './paginas/Admin/PaginaBaseAdmin';

function App() {

  return (
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />

      <Route path='/admin' element={<PaginaBaseAdmin/>}>
        <Route path="restaurantes" element={<AdminRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormRestaurante />} />
        <Route path="restaurantes/:id" element={<FormRestaurante />} />
      </Route>

    </Routes>
  );
}

export default App;
