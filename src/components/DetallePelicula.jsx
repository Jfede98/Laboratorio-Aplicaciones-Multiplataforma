import React, { useEffect, useState } from 'react';
import { getPeliculaById } from '../api/ApiPeliculas';
import { useNavigate } from 'react-router-dom';

const DetallePelicula = ({ id }) => {
  const [pelicula, setPelicula] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getPeliculaById(id)
      .then(data => setPelicula(data[0]))
      .catch(error => console.error('Error al cargar película:', error));
  }, [id]);

  if (!pelicula) return null;
  console.log('Contenido de pelicula.hora:', pelicula?.hora);
  return (
    <div className="container mt-5">
      <div className="mb-4">
        <button className="btn btn-outline-primary btn-volver" onClick={() => navigate('/')}>
          ← Volver a cartelera
        </button>
      </div>

      <div className="row">
        <div className="col-md-5">
          <img src={pelicula.cover} alt={pelicula.titulo} className="img-fluid shadow-sm mb-4 imagen-pelicula" />
        </div>

        <div className="col-md-7">
          <h2 className="mb-3">{pelicula.titulo}</h2>
          <hr />
          <p><strong>Director:</strong> {pelicula.director}</p>
          <p><strong>Duración:</strong> {pelicula.duracion}</p>
          <p><strong>Género:</strong> {pelicula.genero}</p>
          <p><strong>Público:</strong> {pelicula.publico}</p>
          <p><strong>Actores principales:</strong></p>
          <ul>
            {pelicula.actores_principal.map((actor, index) => (
              <li key={index}>{actor}</li>
            ))}
          </ul>
          <p><strong>Sinopsis:</strong></p>
          <p>{pelicula.sinopsis}</p>

          <div className="d-flex flex-wrap gap-2">
            {/* BOTON PARA LLEVAR A COMPRAR LA PELICULA SELECCIONADA*/}
            <div className="mb-4">
              <button
                className="btn-sesion btn btn-outline-light"
                onClick={() => navigate(`/pelicula-seleccionada/${id}`)}
              >
                Comprar
              </button>
            </div>


          </div>





        </div>
      </div>
    </div>
  );
};

export default DetallePelicula;
