import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css'; // Asegúrate de que la ruta sea correcta

const Libro = ({ libro, onDelete }) => {
    const navigate = useNavigate();

    const handlePrestarClick = () => {
        navigate(`/prestar-libro/${libro.id}`);
    };

    return (
        <div className="libro-card">
            <h3>{libro.titulo}</h3>
            <h6>{libro.autor.nombre} {libro.autor.apellido}</h6>
            {libro.imagen && <img src={libro.imagen} alt={libro.titulo} />}
            {libro.genero.map((genero, index) => (
                <input key={index} type="hidden" value={genero.nombre} />
            ))}
            <div className="stock-indicator">
                {libro.cantidad > 0 ? (
                    <span className="stock-available"></span>
                ) : (
                    <span className="stock-unavailable"></span>
                )}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                <button onClick={handlePrestarClick} className="prestar-button">Prestar Libro</button>
            </div>
        </div>
    );
};

export default Libro;
