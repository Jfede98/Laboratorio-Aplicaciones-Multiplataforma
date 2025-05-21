import React, { useEffect, useState } from 'react';
import { getPeliculas } from '../api/ApiPeliculas';
import { Link } from 'react-router-dom';

const ListaPeliculas = () => {
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    getPeliculas()
      .then(data => setPeliculas(data))
      .catch(error => console.error('Error al cargar películas:', error));
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Cartelera</h3>
      <p className="mb-4 text-center">
        En esta sección encontrarás los estrenos más esperados de la cartelera nacional e internacional.
        <br />
        Explora sinopsis, trailers, horarios y reseñas para planear tu próxima visita al cine.
        <br />
        <strong>¡Prepárate para emocionarte, sorprenderte y vivir nuevas historias!</strong>
      </p>
      <div className="row g-4">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="col-md-3">
            <div className="card h-100 shadow-sm">
              <img src={pelicula.cover} className="card-img-top" alt={pelicula.titulo} />
              <div className="card-body">
                <h5 className="card-title">{pelicula.titulo}</h5>
                <p className="card-text"><strong>Director:</strong> {pelicula.director}</p>
                <p className="card-text"><strong>Duración:</strong> {pelicula.duracion}</p>
                <p className="card-text"><strong>Género:</strong> {pelicula.genero}</p>
                <Link to={`/pelicula/${pelicula.id}`} className="btn btn-primary mt-2 btn-sesion">
                  Ver detalle
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListaPeliculas;
