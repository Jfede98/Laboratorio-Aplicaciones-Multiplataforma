import React, { useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmar } from '../api/ApiPeliculas';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Modal } from 'bootstrap';
import { usePelicula } from '../hooks/usePelicula';

const Confirmacion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { id, fecha, hora, cantidad, asientos, totalPagar } = state;

  const { pelicula, loading, error } = usePelicula(id);
  const modalRef = useRef(null);

  const handlePago = async () => {
    const success = await confirmar(id, cantidad, asientos, totalPagar, fecha, hora);
    if (success && modalRef.current) {
      const modal = new Modal(modalRef.current);
      modal.show();
    }
  };

  const handleAceptar = () => {
    const modal = Modal.getInstance(modalRef.current);
    if (modal) {
      modal.hide();
    }
    navigate('/');
  };

  if (loading) return <div className="container mt-5">Cargando información de la película...</div>;
  if (error) return <div className="container mt-5 text-danger">Error al cargar película.</div>;

  return (
    <>
      <Header />
      <div className="container mt-5 margen">
        <div className="row">
          <div className="col-md-5">
            <img
              src={pelicula.cover}
              alt={pelicula.titulo}
              className="img-fluid shadow-sm mb-4 imagen-pelicula"
            />
          </div>
          <div className="col-md-7">
            <h2 className="mb-3">{pelicula.titulo}</h2>
            <hr />
            <p><strong>Fecha:</strong> {fecha}</p>
            <p><strong>Hora:</strong> {hora}</p>
            <p><strong>Género:</strong> {pelicula.genero}</p>
            <p><strong>Público:</strong> {pelicula.publico}</p>
            <p><strong>Cantidad de boletos:</strong> {cantidad}</p>
            <p><strong>Asientos seleccionados:</strong> {Array.isArray(asientos) ? asientos.join(', ') : asientos}</p>
            <p className="total-destacado">
              <strong>Total a pagar:</strong> <span>${totalPagar}</span>
            </p>

            <div className="botones-confirmacion mt-4">
               <button className="btn btn-outline-danger btn-cancelar" onClick={() => navigate('/')}>
                Cancelar
              </button>
              <button className="btn btn-sesion me-2" onClick={handlePago}>
                Confirmar y pagar
              </button>    
            </div>
          </div>
        </div>
      </div>

      {/* Modal de éxito */}
      <div className="modal fade" tabIndex="-1" ref={modalRef}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Pago exitoso</h5>
            </div>
            <div className="modal-body">
              <p>¡Llegará a tu correo la factura y el código QR para que disfrutes tu función!</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-modal-confirmar btn-rounded" onClick={handleAceptar}>
                Volver al inicio
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Confirmacion;
