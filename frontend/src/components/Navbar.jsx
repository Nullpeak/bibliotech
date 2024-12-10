import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

const Navbar = () => {
    const [greeting, setGreeting] = useState('');
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Obtener el nombre del usuario del localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setUsername(user.name);
        }

        // Obtener la hora actual
        const currentHour = new Date().getHours();

        // Establecer el mensaje según la hora del día
        if (currentHour < 12) {
            setGreeting('Buenos días');
        } else if (currentHour < 18) {
            setGreeting('Buenas tardes');
        } else {
            setGreeting('Buenas noches');
        }
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Biblioteca</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                <i className="bi bi-house-door"></i> Inicio
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/login">
                                <i className="bi bi-box-arrow-in-right"></i> Login
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/register">
                                <i className="bi bi-person-plus"></i> Registro
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/logout">
                                <i className="bi bi-box-arrow-right"></i> Logout
                            </Link>
                        </li>
                    </ul>
                    <span className="navbar-text">
                        {greeting}, {username}
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
