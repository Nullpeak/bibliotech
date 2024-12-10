// src/components/CrearLibro.js
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Select from 'react-select';
import "../styles/formlibro.css";

function CrearLibro() {
    const [libros, setLibros] = useState([]);
    const [autores, setAutores] = useState([]);
    const [generos, setGeneros] = useState([]);
    const [titulo, setTitulo] = useState("");
    const [isbn, setIsbn] = useState("");
    const [cantidad, setCantidad] = useState(0);
    const [fecha, setFecha] = useState("");
    const [selectedGeneros, setSelectedGeneros] = useState([]);
    const [selectedAutor, setSelectedAutor] = useState(null);
    const [imagen, setImagen] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        getLibros();
        getAutores();
        getGeneros();
    }, []);

    const getLibros = () => {
        api
            .get("/api/libro/crear/")
            .then((res) => res.data)
            .then((data) => {
                setLibros(data);
                console.log(data);
            })
            .catch((err) => alert(err));
    };

    const getAutores = () => {
        api
            .get("/api/libro/autores/")
            .then((res) => res.data)
            .then((data) => {
                setAutores(data);
            })
            .catch((err) => alert(err));
    };

    const getGeneros = () => {
        api
            .get("/api/libro/generos/")
            .then((res) => res.data)
            .then((data) => {
                setGeneros(data);
            })
            .catch((err) => alert(err));
    };

    const deleteLibro = (id) => {
        api
            .delete(`/api/libro/${id}/`)
            .then((res) => {
                if (res.status === 204) alert("Libro eliminado!");
                else alert("Error al eliminar el libro.");
                getLibros();
            })
            .catch((error) => alert(error));
    };

    const createLibro = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('isbn', isbn);
        formData.append('cantidad', cantidad);
        formData.append('fecha', fecha);
        formData.append('autor', selectedAutor.value);
        selectedGeneros.forEach((genero) => formData.append('genero', genero.value));
        formData.append('imagen', imagen);

        api
            .post("/api/libro/crear/", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((res) => {
                if (res.status === 201) alert("Libro creado!");
                else alert("Error al crear el libro.");
                getLibros();
            })
            .catch((err) => alert(err));
    };

    return (
        
            <div className="formlibro-form-container">
                <h2>Crear un Libro</h2>
                <form onSubmit={createLibro}>
                    <label htmlFor="titulo">Título:</label>
                    <br />
                    <input
                        type="text"
                        id="titulo"
                        name="titulo"
                        required
                        onChange={(e) => setTitulo(e.target.value)}
                        value={titulo}
                    />
                    <label htmlFor="isbn">ISBN:</label>
                    <br />
                    <input
                        type="text"
                        id="isbn"
                        name="isbn"
                        required
                        onChange={(e) => setIsbn(e.target.value)}
                        value={isbn}
                    />
                    <label htmlFor="cantidad">Cantidad:</label>
                    <br />
                    <input
                        type="number"
                        id="cantidad"
                        name="cantidad"
                        required
                        onChange={(e) => setCantidad(e.target.value)}
                        value={cantidad}
                    />
                    <label htmlFor="fecha">Fecha:</label>
                    <br />
                    <input
                        type="date"
                        id="fecha"
                        name="fecha"
                        required
                        onChange={(e) => setFecha(e.target.value)}
                        value={fecha}
                    />
                    <label htmlFor="genero">Género:</label>
                    <br />
                    <Select
                        id="genero"
                        name="genero"
                        isMulti
                        options={generos.map(genero => ({ value: genero.id, label: genero.nombre }))}
                        onChange={setSelectedGeneros}
                        value={selectedGeneros}
                    />
                    <button type="button" onClick={() => navigate('/agregar-genero')} style={{ marginTop: '10px' }}>
                        + Agregar Género
                    </button>
                    <div>
                        <h3>Géneros Seleccionados:</h3>
                        <ul>
                            {selectedGeneros.map((genero) => (
                                <li key={genero.value}>{genero.label}</li>
                            ))}
                        </ul>
                    </div>
                    <label htmlFor="autor">Autor:</label>
                    <br />
                    <Select
                        id="autor"
                        name="autor"
                        options={autores.map(autor => ({ value: autor.id, label: autor.nombre }))}
                        onChange={setSelectedAutor}
                        value={selectedAutor}
                    />
                    <button type="button" onClick={() => navigate('/agregar-autor')} style={{ marginTop: '10px' }}>
                        + Agregar Autor
                    </button>
                    <label htmlFor="imagen">Imagen:</label>
                    <br />
                    <input
                        type="file"
                        id="imagen"
                        name="imagen"
                        onChange={(e) => setImagen(e.target.files[0])}
                    />
                    <br />
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
    );
}

export default CrearLibro;
