import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import InfoPelicula from './pages/InfoPelicula';
import PeliculaSeleccionada from './pages/PeliculaSeleccionada';
import Boletos from './pages/Boletos';
import Butacas from './pages/Butacas';
import Login from './pages/Login';
import PrivateRoutes from './privateRoutes';
import Confirmacion from './pages/Confirmacion';

const AppRoutes = () => (
  
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/pelicula/:id" element={<InfoPelicula />} />
    {/* TATIANA VASQUEZ RUTA PARA LLEVAR A PELICULA SELECCIONADA*/}
    <Route path="/pelicula-seleccionada/:id" element={<PeliculaSeleccionada />} />
    <Route path="/cantidadBoletos/:id" element={<Boletos />} />
    <Route path="/butacas/:id" element={<Butacas />} />
    <Route path="/login" element={<Login />} />
    <Route path="/confirmacionPago" element={
        <PrivateRoutes>
          <Confirmacion />
        </PrivateRoutes> 
          } />

  </Routes>
);

export default AppRoutes;
