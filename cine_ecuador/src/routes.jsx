import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InfoPelicula from './pages/InfoPelicula';

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/pelicula/:id" element={<InfoPelicula />} />
  </Routes>
);

export default AppRoutes;
