import React, { useEffect, useState } from 'react';
import { getPeliculaById } from '../api/ApiPeliculas';

const PeliResumen = ({ id }) => {
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    getPeliculaById(id)
      .then(data => {
        if (data && data.length > 0) {
          setPelicula(data[0]);
          setError(null);
        } else {
          setError('Película no encontrada');
          setPelicula(null);
        }
      })
      .catch(() => {
        setError('Error al obtener la película');
        setPelicula(null);
      });
  }, [id]);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!pelicula) return <div>Cargando película...</div>;

  return (
    <div className="card shadow-sm card-resumen">
      <div className="row g-0">
        <div className="col-md-4 d-flex justify-content-center">
          <img
            src={pelicula.cover}
            alt={pelicula.titulo}
            className="img-fluid mb-4 imagen-peliresumen"
          />
        </div>
        <div className="col-md-8">
          <div className="card-body body-resumen">
            <h2 className="card-title tituloResumen">{pelicula.titulo}</h2>
            <p className="card-text parrafoResumen">{pelicula.sinopsis}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeliResumen;
