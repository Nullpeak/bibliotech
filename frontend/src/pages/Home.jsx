import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import Libro from "../components/Libro";
import "../styles/Home.css";

function Home() {
    const [libros, setLibros] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getLibros();
    }, []);

    const getLibros = () => {
        api
            .get("/api/libro/")
            .then((res) => res.data)
            .then((data) => {
                setLibros(data);
                console.log(data);
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

    const filteredLibros = libros.filter(libro =>
        libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        libro.autor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        libro.genero.some(genero => genero.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <div className="header-container">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Buscar libro, autor o género..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Link to="/crear-libro" style={{ textDecoration: 'none', color: 'blue' }}>
                    <button className="crear-libro-button">Agregar Libro</button>
                </Link>
            </div>
            <div className="libro-container">
                {filteredLibros.map((libro) => (
                    <Libro key={libro.id} libro={libro} onDelete={deleteLibro} />
                ))}
            </div>
        </div>
    );
}

export default Home;
