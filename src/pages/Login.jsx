import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { login as loginApi } from '../api/ApiPeliculas';

const Login = () => {
    const [usuario, setUsuario] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    const login = () => {
        loginApi(usuario, contrasena, navigate, state);
    };

    return (
        <>
           <Header />
                <main className="login-scroll-wrapper">
                    <div className="login-container">
                        <h2 className="login-title anim-text">Bienvenido a CINE ECU</h2>
                        <div className="login-box shadow">
                            <label>Usuario:</label>
                            <input
                                className="login-input"
                                type="text"
                                placeholder="Ingresa: usuario@cine.com"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                            />
                            <label>Contraseña:</label>
                            <input
                                className="login-input"
                                type="password"
                                placeholder="Ingresa: 123456"
                                value={contrasena}
                                onChange={(e) => setContrasena(e.target.value)}
                            />
                            <button className="btn btn-sesion mt-3" onClick={login}>
                                Ingresar
                            </button>
                        </div>
                    </div>
                </main>
            <Footer />
        </>
    );
};

export default Login;