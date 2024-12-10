// src/components/PrestamoList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import '../styles/formlibro.css';

function PrestamoList() {
    const [prestamos, setPrestamos] = useState([]);

    useEffect(() => {
        const fetchPrestamos = async () => {
            try {
                const res = await api.get('api/libro/prestamo/');
                setPrestamos(res.data);
            } catch (error) {
                alert('Error al obtener la lista de préstamos');
            }
        };

        fetchPrestamos();
    }, []);

    return (
        <div className="formlibro-container">
            <div className="formlibro-form-container">
                <h2>Lista de Préstamos</h2>
                <ul>
                    {prestamos.map(prestamo => (
                        <li key={prestamo.id}>
                            <Link to={`/prestamos/${prestamo.id}/devolver/`}>
                                {prestamo.libro} - {prestamo.usuario}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default PrestamoList;
