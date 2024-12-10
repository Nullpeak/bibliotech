import { useState } from "react";
import api from "../api";

function AgregarAutor() {
    const [nombre, setNombre] = useState("");
    const [fechaNacimiento, setFechaNacimiento] = useState("");

    const createAutor = (e) => {
        e.preventDefault();
        api
            .post("/api/libro/autores/", { nombre})
            .then((res) => {
                if (res.status === 201) alert("Autor creado!");
                else alert("Error al crear el autor.");
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <h2>Agregar Autor</h2>
            <form onSubmit={createAutor}>
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
                <label htmlFor="apellido">Apellido:</label>
                <br />
                <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    required
                    onChange={(e) => setApellido(e.target.value)}
                    value={apellido}
                />
                <input type="submit" value="Agregar Autor"></input>
            </form>
        </div>
    );
}

export default AgregarAutor;
