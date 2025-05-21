import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EscogeFuncion = ({ id }) => {
  const [fechasDisponibles, setFechasDisponibles] = useState([]);
  const [horarios, setHorarios] = useState([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState('');
  const [horaSeleccionada, setHoraSeleccionada] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingHorarios, setLoadingHorarios] = useState(false); // Indicador específico para horarios

  const navigate = useNavigate();

  // Cargar fechas disponibles basadas en el ID de la película
  useEffect(() => {
    if (!id) return;

    const cargarFunciones = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://mock.apidog.com/m1/878872-860340-default/peliculas/${id}`);
        if (!response.ok) throw new Error('Error al cargar funciones');

        const data = await response.json();
        const pelicula = data[0];

        if (!pelicula || !pelicula.funciones) throw new Error('No hay funciones disponibles');

        // Obtener fechas únicas ordenadas
        const fechasUnicas = [
          ...new Set(pelicula.funciones.map(funcion => funcion.fecha))
        ].sort();

        setFechasDisponibles(fechasUnicas);
        setFechaSeleccionada(fechasUnicas[0] || '');
        setError(null);
      } catch (err) {
        setError(err.message);
        setFechasDisponibles([]);
        setHorarios([]);
      } finally {
        setLoading(false);
      }
    };

    cargarFunciones();
  }, [id]);

  // Cargar horarios filtrados según la fecha seleccionada
  useEffect(() => {
    const cargarHorarios = async () => {
      try {
        if (!fechaSeleccionada) return;

        setLoadingHorarios(true); // Activar carga de horarios
        const response = await fetch(`https://mock.apidog.com/m1/878872-860340-default/peliculas/${id}`);
        if (!response.ok) throw new Error('Error al cargar horarios');

        const data = await response.json();
        const pelicula = data[0];

        const horariosFiltrados = pelicula.funciones
          .filter(funcion => funcion.fecha === fechaSeleccionada)
          .flatMap(funcion => funcion.hora)
          .sort();

        setHorarios(horariosFiltrados);
        setHoraSeleccionada('');
      } catch (err) {
        setError('No hay horarios disponibles para esta fecha');
        setHorarios([]);
      } finally {
        setLoadingHorarios(false); // Desactivar carga de horarios
      }
    };

    cargarHorarios();
  }, [fechaSeleccionada, id]);

  // Selección de fecha
  const handleFechaClick = (fecha) => {
    setFechaSeleccionada(fecha);
    setHoraSeleccionada('');
  };

  // Selección de hora
  const handleHoraClick = (hora) => {
    setHoraSeleccionada(hora);
  };

  // Redirigir a la siguiente pantalla
  const handleSiguiente = () => {
    if (fechaSeleccionada && horaSeleccionada) {
      navigate(`/cantidadBoletos/${id}`, { state: {id, fechaSeleccionada, horaSeleccionada } });
    }
  };

  if (loading) return <div className="escoge-loading">Cargando funciones...</div>;
  if (error) return <div className="escoge-error alert alert-danger">{error}</div>;

  return (
    <div className="escoge-funcion-container">
      <h4 className="titulo-fecha">Fechas disponibles</h4>
      <div className="escoge-fechas-container">
        {fechasDisponibles.map(fecha => (
          <button
            key={fecha}
            onClick={() => handleFechaClick(fecha)}
            className={`escoge-fecha-btn ${fechaSeleccionada === fecha ? 'escoge-fecha-btn-selected' : 'escoge-fecha-btn-default'}`}
          >
            {fecha}
          </button>
        ))}
      </div>

      {horarios.length > 0 && (
        <div>
          <h4 className="titulo-hora">Horarios:</h4>
          <div className="escoge-horarios-container">
            {loadingHorarios ? (
              <div className="escoge-horarios-loading">Cargando horarios...</div>
            ) : (
              horarios.map((hora, index) => (
                <button
                  key={index}
                  onClick={() => handleHoraClick(hora)}
                  className={`escoge-hora-btn ${horaSeleccionada === hora ? 'escoge-hora-btn-selected' : 'escoge-hora-btn-default'}`}
                >
                  {hora}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      <div className="escoge-btn-container">
        <button
          onClick={handleSiguiente}
          className="escoge-btn-siguiente"
          disabled={!fechaSeleccionada || !horaSeleccionada}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default EscogeFuncion;
