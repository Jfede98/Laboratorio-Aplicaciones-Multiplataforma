import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PeliResumen from '../components/PeliResumen';
import { getPeliculaById } from '../api/ApiPeliculas';

const Butacas = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { fecha, hora, cantidad } = location.state || {};
  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);

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
  if (!pelicula) return <div>Cargando...</div>;
  if (!fecha || !hora || !cantidad) return <div className="alert alert-warning">Faltan datos para la función.</div>;

  const precioUnitario = pelicula.precio_normal; // o calcular según público o descuentos

  const total = precioUnitario * cantidad;

  // Asientos simulados (ejemplo 10 filas x 12 columnas)
  const filas = 10;
  const columnas = 12;

  // Estado para simular asientos ocupados (puedes hacer random o fijo)
  const [asientosOcupados] = useState(() => {
    // ejemplo: ocupados 5 asientos aleatorios
    let ocupados = new Set();
    while (ocupados.size < 5) {
      const asientoNum = Math.floor(Math.random() * filas * columnas);
      ocupados.add(asientoNum);
    }
    return ocupados;
  });

  // Manejo selección de asientos
  const toggleAsiento = (num) => {
    if (asientosOcupados.has(num)) return; // no permite seleccionar ocupado

    if (asientosSeleccionados.includes(num)) {
      setAsientosSeleccionados(asientosSeleccionados.filter(a => a !== num));
    } else {
      if (asientosSeleccionados.length < cantidad) {
        setAsientosSeleccionados([...asientosSeleccionados, num]);
      }
    }
  };

  const handleConfirmar = () => {
    if (asientosSeleccionados.length !== cantidad) {
      alert(`Debe seleccionar exactamente ${cantidad} asientos.`);
      return;
    }
    // Aquí enviar a siguiente paso o guardar reserva
    console.log('Asientos seleccionados:', asientosSeleccionados);
    // Ejemplo: navigate('/confirmacion', {state: {id, fecha, hora, cantidad, asientos: asientosSeleccionados}});
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
        <PeliResumen id={id} />
        <div className="mt-3 p-3 border rounded bg-light">
          <p><strong>Sala:</strong> {pelicula.sala}</p>
          <p><strong>Fecha:</strong> {fecha}</p>
          <p><strong>Hora:</strong> {hora}</p>
          <p><strong>Cantidad de boletos:</strong> {cantidad}</p>
          <p><strong>Precio unitario:</strong> ${precioUnitario}</p>
          <p><strong>Total:</strong> ${total}</p>
        </div>

        <h4>Seleccione sus asientos</h4>
        <div className="asientos-grid" style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columnas}, 30px)`,
          gap: '8px',
          justifyContent: 'center'
        }}>
          {[...Array(filas * columnas)].map((_, i) => {
            const ocupado = asientosOcupados.has(i);
            const seleccionado = asientosSeleccionados.includes(i);
            return (
              <div
                key={i}
                onClick={() => toggleAsiento(i)}
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: ocupado ? '#ccc' : seleccionado ? '#007bff' : '#eee',
                  border: '1px solid #444',
                  borderRadius: '4px',
                  cursor: ocupado ? 'not-allowed' : 'pointer',
                }}
                title={`Asiento ${i + 1} ${ocupado ? '(Ocupado)' : ''}`}
              />
            );
          })}
        </div>

        <div className="mt-3">
          <button className="btn btn-primary" onClick={handleConfirmar}>Confirmar selección</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Butacas;
