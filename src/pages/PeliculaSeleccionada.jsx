import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PeliResumen from '../components/PeliResumen';
import EscogeFuncion from '../components/EscogeFuncion';

const PeliculaSeleccionada = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="mb-4">
          <button 
            className="btn btn-outline-primary btn-volver" 
            onClick={() => navigate('/')}
          >
            ← Volver a cartelera
          </button>
        </div>
      </div>

      <PeliResumen id={id} />

      <div>
        <h3>Selecciona tu función</h3>
      </div>

      <EscogeFuncion id={id} />

      <Footer />
    </>
  );
};

export default PeliculaSeleccionada;
