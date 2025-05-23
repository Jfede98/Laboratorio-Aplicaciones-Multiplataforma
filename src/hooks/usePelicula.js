// src/hooks/usePelicula.js
import { useState, useEffect } from 'react';
import { getPeliculaById } from '../api/ApiPeliculas';

export function usePelicula(id) {
  const [pelicula, setPelicula] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    getPeliculaById(id)
      .then((data) => {
        setPelicula(data[0]);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar película:', err);
        setError(err);
        setLoading(false);
      });
  }, [id]);

  return { pelicula, loading, error };
}
