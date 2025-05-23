import { Routes, Route } from 'react-router-dom';
import Confirmacion from './pages/Confirmacion';
import { Navigate } from 'react-router';


const PrivateRoutes = ({ children }) => {
    const usuario = sessionStorage.getItem("usuario");
    console.log("usuario", usuario);
    if (usuario === null) {
        return (
            <Navigate to="/Login" replace></Navigate>)      
    } 
    return children;
};

export default PrivateRoutes;