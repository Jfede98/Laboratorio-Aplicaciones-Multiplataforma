import React from 'react';
import tiktokImg from '../assets/tiktok_img.svg'; 
import facebookImg from '../assets/facebook_img.svg'; 
import instagramImg from '../assets/instagram_img.svg'; 

const Footer = () => {
  return (
    <footer className="bg-light border-top shadow-sm mt-5">
      <div className="container-fluid">
        <div className="row py-3">
          <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center">
            <p className="mb-2 mb-md-0 text-muted text-center text-md-start">
              © 2025 Cine Ecuador. Todos los derechos reservados.
            </p>
            <div className="d-flex justify-content-center justify-content-md-end align-items-center gap-3">
                <img src={tiktokImg} alt="Link a TikTok" className="redes-img" />
                <img src={facebookImg} alt="Link a Facebook" className="redes-img" />
                <img src={instagramImg} alt="Link a Instagram" className="redes-img" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
