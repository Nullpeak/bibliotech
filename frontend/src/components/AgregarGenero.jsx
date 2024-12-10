import { useState } from "react";
import api from "../api";

function AgregarGenero() {
    const [nombre, setNombre] = useState("");

    const createGenero = (e) => {
        e.preventDefault();
        api
            .post("/api/libro/generos/", { nombre })
            .then((res) => {
                if (res.status === 201) alert("Género creado!");
                else alert("Error al crear el género.");
            })
            .catch((err) => alert(err));
    };

    return (
        <div>
            <h2>Agregar Género</h2>
            <form onSubmit={createGenero}>
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
                <br />
                <input type="submit" value="Agregar Género"></input>
            </form>
        </div>
    );
}

export default AgregarGenero;
