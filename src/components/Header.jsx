import React from 'react';
import { useNavigate } from 'react-router-dom';
import marcaImg from '../assets/marca_img.svg';

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header className="shadow-sm py-3 bg">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-6">
            <img 
              src={marcaImg} 
              alt="Marca Cine Ecuador" 
              className="marca-img" 
              onClick={handleLogoClick} 
              style={{ cursor: 'pointer' }} 
            />
          </div>

          {/* Aquí está el botón para acceder a la cuenta */}
          <div className="col-6 text-end">
            <button className="btn-sesion btn btn-outline-light">
              <span className="material-symbols-outlined me-1">login</span>
              Acceder
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
