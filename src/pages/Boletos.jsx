import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PeliResumen from '../components/PeliResumen';
import CantidadBoletos from '../components/CantidadBoletos';

const Boletos = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <>
            <Header />
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

            <PeliResumen id={id}/>

            <div>
                <h3>Selecciona la cantidad de boletos</h3>
            </div>

            <CantidadBoletos id={id} />

            <Footer />
        </>
    );
};

export default Boletos;
