const BASE_URL = 'https://mock.apidog.com/m1/878872-860340-default/peliculas';
const BASE_URL2 = 'https://mock.apidog.com/m1/878872-860340-default/login';
const BASE_URL3 = 'https://mock.apidog.com/m1/878872-860340-default/confirmacion';

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

export const login = async (correo,contrasena,navigate,state) => {
  console.log("state",state);
  await fetch(BASE_URL2, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        correo,
        contrasena
    }),
})
    .then(async (response) => {
        const data = await response.json();
        console.log("data",data);
        if (!response.ok) 
         {
            throw new Error(`Error ${response.status}: ${data.message}`);
        } else {
          sessionStorage.setItem("usuario",JSON.stringify(data?.usuario));
          const newState = {...state}
          navigate('/confirmacionPago',{state: newState})
        }
        return data;
    })
    .then((data) => console.log("Login exitoso:", data))
    .catch((error) => {alert("Usuario y/o contraseña incorrecto"); console.error("Error en login:", error.message)});
};


export const confirmar = async (id, cantidad, asientos, totalPagar, fecha, hora) => {
  try {
    const response = await fetch(BASE_URL3, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pelicula_id: id,
        cantidad_boletos: cantidad,
        asientos,
        total_pagado: totalPagar,
        fecha,
        hora,
      }),
    });

    const data = await response.json();
    console.log("data", data);

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${data.message}`);
    }

    return true;
  } catch (error) {
    alert("Ocurrió un error durante el pago");
    console.error("Error en pago:", error.message);
    return false;
  }
};
