import React from 'react';
import eraHieloImg from '../assets/era_hielo_img.webp';
import jumanjiImg from '../assets/jumanji_img.webp';
import toyStoryImg from '../assets/toystory_img.jpg';

const Carrousell = () => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide">
  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div className="carousel-inner">
    <div className="carousel-item active">
       <img src={toyStoryImg} className="d-block w-100" alt="Facebook" />
      <div className="carousel-caption d-none d-md-block fondo-titulo">
         <p className="estreno-texto">PRÓXIMO ESTRENO</p>
        <h2>Toy Story 5</h2>
        <h5>Junio 19, 2026</h5>
      </div>
    </div>
    <div className="carousel-item">
      <img src={jumanjiImg} className="d-block w-100" alt="Facebook" />
      <div className="carousel-caption d-none d-md-block fondo-titulo">
         <p className="estreno-texto">PRÓXIMO ESTRENO</p>
        <h2>Jumanji 3</h2>
        <h5>Diciembre 11, 2026</h5>
      </div>
    </div>
    <div className="carousel-item">
       <img src={eraHieloImg} className="d-block w-100" alt="Facebook" />
      <div className="carousel-caption d-none d-md-block fondo-titulo">
         <p className="estreno-texto">PRÓXIMO ESTRENO</p>
        <h2>Era del Hielo 6</h2>
        <h5>Diciembre 18, 2026</h5>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>
  );
};

export default Carrousell;
