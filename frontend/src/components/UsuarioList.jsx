// src/components/UsuarioList.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import '../styles/formlibro.css';

function UsuarioList() {
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            try {
                const res = await api.get('api/libro/usuarios/');
                setUsuarios(res.data);
            } catch (error) {
                alert('Error al obtener la lista de usuarios');
            }
        };

        fetchUsuarios();
    }, []);

    return (
        <div className="formlibro-container">
            <div className="formlibro-form-container">
                <h2>Lista de Usuarios</h2>
                <ul>
                    {usuarios.map(usuario => (
                        <li key={usuario.id}>
                            <Link to={`${usuario.slug}/`}>
                                {usuario.nombre}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default UsuarioList;
