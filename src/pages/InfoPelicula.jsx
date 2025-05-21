import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DetallePelicula from '../components/DetallePelicula';

const InfoPelicula = () => {
  const { id } = useParams();

  return (
    <>
      <Header />
      <DetallePelicula id={id} />
      <Footer />
    </>
  );
};

export default InfoPelicula;
