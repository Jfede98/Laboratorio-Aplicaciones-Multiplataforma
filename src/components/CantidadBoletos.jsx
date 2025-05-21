import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../index.css';
const CantidadBoletos = () => {
    const { state } = useLocation();
    const {id, fechaSeleccionada, horaSeleccionada } = state || {};
    const [adultos, setAdultos] = useState(0);
    const [ninos, setNinos] = useState(0);
    const [terceraEdad, setTerceraEdad] = useState(0);
    const [precioAdulto, setPrecioAdulto] = useState(0);
    const [precioNino, setPrecioNino] = useState(0);
    const [precioTerceraEdad, setPrecioTerceraEdad] = useState(0);

    useEffect(() => {
        if (!id) return;

        fetch('https://mock.apidog.com/m1/878872-860340-default/peliculas')
            .then(res => res.json())
            .then(data => {
                const pelicula = data.find(p => String(p.id) === String(id));
                if (pelicula) {
                    setPrecioAdulto(pelicula.precio_normal || 0);
                    setPrecioNino(pelicula.precio_descuento?.ninos || 0);
                    setPrecioTerceraEdad(pelicula.precio_descuento?.tercera_edad || 0);
                } else {
                    console.error('Película no encontrada');
                }
            })
            .catch(err => {
                console.error("Error al obtener precios:", err);
            });
    }, [id]);

    const totalBoletos = adultos + ninos + terceraEdad;
    const totalPagar = (adultos * precioAdulto) + (ninos * precioNino) + (terceraEdad * precioTerceraEdad);
    const navigate = useNavigate();
    const handleSiguiente = () => {
        console.log("Id:", id);
        console.log("Fecha:", fechaSeleccionada);
        console.log("Hora:", horaSeleccionada);
        console.log("Total boletos:", totalBoletos);
        if (totalBoletos > 0 && id) {
            navigate(`/butacas/${id}`, {
                state: {
                    fecha: fechaSeleccionada,
                    hora: horaSeleccionada,
                    cantidad: totalBoletos,
                    adultos,
                    ninos,
                    terceraEdad,
                    totalPagar
                },
            });
        }
    };

    return (
        <div className="escoge-funcion-container">
            <h4 className="titulo-fecha">Horario seleccionado</h4>
            <div className="total">
            <p><strong>Fecha:</strong> {fechaSeleccionada}</p>
            </div>
                <div className="total">
            <p><strong>Hora:</strong> {horaSeleccionada}</p>
            </div>
            <h4 className="titulo-fecha">Ingrese la cantidad de boletos</h4>
            <div className="agregar-boletos" >
                    <label>Adultos (${precioAdulto}):</label>
                    <input className={`escoge-hora-btn`} type="number" min="0" value={adultos} onChange={e => setAdultos(parseInt(e.target.value) || 0)} />
                    <label>Niños (${precioNino}):</label>
                    <input className={`escoge-hora-btn`} type="number" min="0" value={ninos} onChange={e => setNinos(parseInt(e.target.value) || 0)} />
                    <label>Tercera edad (${precioTerceraEdad}):</label>
                    <input className={`escoge-hora-btn`} type="number" min="0" value={terceraEdad} onChange={e => setTerceraEdad(parseInt(e.target.value) || 0)} />
            </div>

            <div className="total">
                <p><strong>Total de boletos:</strong> {totalBoletos}</p>
            </div>
                <div className="total">
                <p><strong>Total a pagar:</strong> ${totalPagar}</p>
            </div>
            <div className="escoge-btn-container">
                <button
                    onClick={() => navigate(-1)} // Regresa al paso anterior
                    className="escoge-btn-regresar"
                >
                    Regresar
                </button>
                <button
                    onClick={handleSiguiente}
                    className="escoge-btn-siguiente"
                    disabled={totalBoletos === 0}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
};

export default CantidadBoletos;
