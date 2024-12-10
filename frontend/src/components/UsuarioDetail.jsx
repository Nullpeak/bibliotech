// src/components/UsuarioDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import '../styles/formlibro.css';

function UsuarioDetail() {
    const { slug } = useParams();
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const res = await api.get(`api/libro/usuarios/${slug}/`);
                setUsuario(res.data);
            } catch (error) {
                alert('Error al obtener los detalles del usuario');
            }
        };

        fetchUsuario();
    }, [slug]);

    if (!usuario) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="formlibro-container">
            <div className="formlibro-form-container">
                <h2>Detalles del Usuario</h2>
                <p><strong>Nombre:</strong> {usuario.nombre}</p>
                <p><strong>RUT:</strong> {usuario.rut}</p>
                <p><strong>Rol:</strong> {usuario.rol}</p>
                <p><strong>Número:</strong> {usuario.numero}</p>
                {usuario.imagen && <img src={usuario.imagen} alt={usuario.nombre} style={{ maxWidth: '100%' }} />}
            </div>
        </div>
    );
}

export default UsuarioDetail;
