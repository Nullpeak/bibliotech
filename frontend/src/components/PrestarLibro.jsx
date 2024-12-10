// src/components/PrestarLibro.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api';
import '../styles/formlibro.css';

function PrestarLibro() {
    const { libroId } = useParams();
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUsuario, setSelectedUsuario] = useState('');
    const [fechaCaducidad, setFechaCaducidad] = useState('');
    const navigate = useNavigate();

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

    const handlePrestar = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('libro', libroId);
        formData.append('usuario', selectedUsuario);

        try {
            const res = await api.post('api/libro/prestamo/', formData);
            if (res.status === 201) {
                alert('Libro prestado exitosamente');
                setFechaCaducidad(res.data.fecha_caducidad);
                navigate('/prestamos');
            } else {
                alert('Error al prestar el libro');
            }
        } catch (error) {
            alert('Error al prestar el libro');
        }
    };

    return (
        <div className="formlibro-container">
            <div className="formlibro-form-container">
                <h2>Prestar Libro</h2>
                <form onSubmit={handlePrestar}>
                    <label htmlFor="usuario">Usuario:</label>
                    <br />
                    <select
                        id="usuario"
                        name="usuario"
                        required
                        onChange={(e) => setSelectedUsuario(e.target.value)}
                        value={selectedUsuario}
                    >
                        <option value="">Selecciona un usuario</option>
                        {usuarios.map(usuario => (
                            <option key={usuario.id} value={usuario.id}>
                                {usuario.nombre}
                            </option>
                        ))}
                    </select>
                    <br />
                    <input type="submit" value="Prestar Libro" />
                </form>
                {fechaCaducidad && (
                    <div>
                        <h3>Fecha de Caducidad: {new Date(fechaCaducidad).toLocaleDateString()}</h3>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PrestarLibro;
