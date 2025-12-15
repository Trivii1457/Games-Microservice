import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Games from './components/Games';
import Scores from './components/Scores';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🧠 Mind Games
            </Link>
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">Usuarios</Link>
              </li>
              <li className="nav-item">
                <Link to="/games" className="nav-link">Juegos</Link>
              </li>
              <li className="nav-item">
                <Link to="/scores" className="nav-link">Puntajes</Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/games" element={<Games />} />
            <Route path="/scores" element={<Scores />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

