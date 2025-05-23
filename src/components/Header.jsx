import React from 'react';
import { useNavigate } from 'react-router-dom';
import marcaImg from '../assets/marca_img.svg';
import tiktokImg from '../assets/tiktok_img.svg';
import facebookImg from '../assets/facebook_img.svg';
import instagramImg from '../assets/instagram_img.svg';

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
            <img src={tiktokImg} alt="Link a TikTok" className="redes-img" />
            <img src={facebookImg} alt="Link a Facebook" className="redes-img" />
            <img src={instagramImg} alt="Link a Instagram" className="redes-img" />         
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
