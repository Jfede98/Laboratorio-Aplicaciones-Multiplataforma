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
  const { fecha, hora, cantidad, adultos, ninos, terceraEdad } = location.state || {};

  const [pelicula, setPelicula] = useState(null);
  const [error, setError] = useState(null);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [asientosOcupados, setAsientosOcupados] = useState(new Set());
  const [totalAsientos, setTotalAsientos] = useState(0);
  const [columnas] = useState(12);

  useEffect(() => {
    if (!id) return;

    getPeliculaById(id)
      .then(data => {
        if (data && data.length > 0) {
          const peli = data[0];
          setPelicula(peli);
          setTotalAsientos(peli.asientos_disponibles || 120);
          setError(null);
        } else {
          setError('Película no encontrada');
        }
      })
      .catch(() => setError('Error al obtener la película'));
  }, [id]);

  useEffect(() => {
    if (!totalAsientos) return;

    const ocupados = new Set();
    while (ocupados.size < 5) {
      const asientoNum = Math.floor(Math.random() * totalAsientos);
      ocupados.add(asientoNum);
    }
    setAsientosOcupados(ocupados);
  }, [totalAsientos]);

  const filas = Math.ceil(totalAsientos / columnas);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!pelicula || !fecha || !hora || !cantidad) return <div className="alert alert-warning">Cargando datos.</div>;

  const total = pelicula.precio_normal * cantidad;

  const toggleAsiento = (num) => {
    if (asientosOcupados.has(num)) return;

    setAsientosSeleccionados(prev =>
      prev.includes(num)
        ? prev.filter(a => a !== num)
        : prev.length < cantidad ? [...prev, num] : prev
    );
  };

  const handleConfirmar = () => {
    if (asientosSeleccionados.length !== cantidad) {
      alert(`Debe seleccionar exactamente ${cantidad} asientos.`);
      return;
    }

    console.log('Asientos seleccionados:', asientosSeleccionados);

    navigate('/login', {
      state: {
        id,
        fecha,
        hora,
        cantidad,
        total,
        adultos,
        ninos,
        terceraEdad,
        asientos: asientosSeleccionados
      }
    });
  };

  return (
    <>
      <Header />
      <div className="container mt-4">
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

        <div className="mt-3 p-3 border rounded bg-light">
          <p><strong>Sala:</strong> {pelicula.sala}</p>
          <p><strong>Fecha:</strong> {fecha}</p>
          <p><strong>Hora:</strong> {hora}</p>
          <p><strong>Boletos:</strong> {adultos || 0} Adulto(s), {ninos || 0} Niño(s), {terceraEdad || 0} Tercera Edad</p>
          <p><strong>Total a pagar:</strong> ${total}</p>
        </div>

        <h4>Seleccione sus asientos</h4>
        <div className="asientos-grid" style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columnas}, 30px)`,
          gap: '8px',
          justifyContent: 'center'
        }}>
          {[...Array(totalAsientos)].map((_, i) => {
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

        <div className="mt-4 d-flex justify-content-between">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline-secondary"
          >
            Cancelar
          </button>
          <button
            className="btn btn-primary"
            onClick={handleConfirmar}
          >
            Confirmar selección
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Butacas;
