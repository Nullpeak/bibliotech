// src/components/DevolverLibro.js
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import '../styles/formlibro.css';

function DevolverLibro() {
    const { prestamoId } = useParams();
    const navigate = useNavigate();

    const handleDevolver = async (e) => {
        e.preventDefault();

        try {
            const res = await api.put(`api/libro/prestamo/${prestamoId}/devolver/`);
            if (res.status === 200) {
                alert('Libro devuelto exitosamente');
                navigate('/prestamos');
            } else {
                alert('Error al devolver el libro');
            }
        } catch (error) {
            alert('Error al devolver el libro');
        }
    };

    return (
        <div className="formlibro-container">
            <div className="formlibro-form-container">
                <h2>Devolver Libro</h2>
                <form onSubmit={handleDevolver}>
                    <input type="submit" value="Devolver Libro" />
                </form>
            </div>
        </div>
    );
}

export default DevolverLibro;
