import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/NavBar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import AgregarAutor from './components/AgregarAutor';
import AgregarGenero from './components/AgregarGenero';
import PrestarLibro from './components/PrestarLibro';
import CrearLibro from './components/CrearLibro';
import UsuarioCreate from './components/CrearUsuario';
import UsuarioDetail from './components/UsuarioDetail';
import UsuarioList from './components/UsuarioList';
import PrestamoList from './components/PrestamoList';
import DevolverLibro from './components/DevolverLibro';

function Logout() {
    localStorage.clear();
    return <Navigate to="/login" />;
}

function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
}

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/register" element={<RegisterAndLogout />} />
                <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/agregar-autor" element={<ProtectedRoute><AgregarAutor /></ProtectedRoute>} />
                <Route path="/agregar-genero" element={<ProtectedRoute><AgregarGenero /></ProtectedRoute>} />
                <Route path="/prestar-libro/:libroId" element={<ProtectedRoute><PrestarLibro /></ProtectedRoute>} />
                <Route path="/crear-libro" element={<ProtectedRoute><CrearLibro /></ProtectedRoute>} />
                <Route path="/usuarios" element={<ProtectedRoute><UsuarioList /></ProtectedRoute>} />
                <Route path="usuarios/crear" element={<ProtectedRoute><UsuarioCreate /></ProtectedRoute>} />
                <Route path="usuarios/:slug" element={<ProtectedRoute><UsuarioDetail /></ProtectedRoute>} />
                <Route path="/prestamos/" element={<PrestamoList />} />
                <Route path="/prestamos/:prestamoId/devolver/" element={<DevolverLibro />} />
                <Route path="*" element={<NotFound />}></Route>
            </Routes>
        </Router>
    );
}

export default App;
