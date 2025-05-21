const BASE_URL = 'https://mock.apidog.com/m1/878872-860340-default/peliculas';

export const getPeliculas = async () => {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error('Error al obtener películas');
  return await res.json();
};

export const getPeliculaById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  if (!res.ok) throw new Error('Película no encontrada');
  return await res.json();
};
