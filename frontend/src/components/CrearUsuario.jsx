// src/components/UsuarioCreate.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import '../styles/formlibro.css';

function UsuarioCreate() {
    const [nombre, setNombre] = useState('');
    const [rut, setRut] = useState('');
    const [rol, setRol] = useState('estudiante');
    const [numero, setNumero] = useState('+56');
    const [imagen, setImagen] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('rut', rut);
        formData.append('rol', rol);
        formData.append('numero', numero);
        if (imagen) {
            formData.append('imagen', imagen);
        }

        try {
            const res = await api.post('api/libro/usuarios/crear/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status === 201) {
                alert('Usuario creado exitosamente');
                navigate('/');
            } else {
                alert('Error al crear el usuario');
            }
        } catch (error) {
            alert('Error al crear el usuario');
        }
    };

    return (
        <div className="formlibro-container">
            <div className="formlibro-form-container">
                <h2>Crear Usuario</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="nombre">Nombre:</label>
                    <br />
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        onChange={(e) => setNombre(e.target.value)}
                        value={nombre}
                    />
                    <label htmlFor="rut">RUT:</label>
                    <br />
                    <input
                        type="text"
                        id="rut"
                        name="rut"
                        required
                        onChange={(e) => setRut(e.target.value)}
                        value={rut}
                    />
                    <label htmlFor="rol">Rol:</label>
                    <br />
                    <select
                        id="rol"
                        name="rol"
                        required
                        onChange={(e) => setRol(e.target.value)}
                        value={rol}
                    >
                        <option value="estudiante">Estudiante</option>
                        <option value="trabajador">Trabajador</option>
                        <option value="tercero">Tercero</option>
                    </select>
                    <label htmlFor="numero">Número:</label>
                    <br />
                    <input
                        type="text"
                        id="numero"
                        name="numero"
                        required
                        onChange={(e) => setNumero(e.target.value)}
                        value={numero}
                    />
                    <label htmlFor="imagen">Imagen:</label>
                    <br />
                    <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={(e) => setImagen(e.target.files[0])}
                    />
                    <br />
                    <input type="submit" value="Crear Usuario" />
                </form>
            </div>
        </div>
    );
}

export default UsuarioCreate;
