import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">🧠 Bienvenido a Mind Games</h1>
        <p className="hero-subtitle">
          Desafía tu mente con nuestros juegos mentales interactivos
        </p>
        <div className="hero-description">
          <p>
            Una plataforma completa para entrenar tu cerebro con juegos diseñados
            para mejorar tu memoria, atención y agilidad mental.
          </p>
        </div>
        <Link to="/play" className="hero-button">
          🎮 ¡Comenzar a Jugar!
        </Link>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">🧠</div>
          <h3>Memoria Visual</h3>
          <p>Secuencia Flash - Memoriza y repite patrones iluminados</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🧮</div>
          <h3>Cálculo Rápido</h3>
          <p>Math Rush - Resuelve operaciones contra el reloj</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔍</div>
          <h3>Lógica</h3>
          <p>Patrón Oculto - Descubre secuencias matemáticas</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👁️</div>
          <h3>Atención</h3>
          <p>Encuentra el Diferente - Detecta elementos distintos</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Gestión de Usuarios</h3>
          <p>Crea y administra perfiles de jugadores</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🏆</div>
          <h3>Sistema de Puntajes</h3>
          <p>Compite y mira tu posición en los rankings</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h2>🎮 Juegos</h2>
          <p className="stat-number">4</p>
          <p className="stat-label">Juegos interactivos disponibles</p>
        </div>

        <div className="stat-card">
          <h2>💻 Tecnología</h2>
          <p className="stat-number">Java 17</p>
          <p className="stat-label">Spring Boot + React</p>
        </div>

        <div className="stat-card">
          <h2>🗄️ Base de Datos</h2>
          <p className="stat-number">PostgreSQL</p>
          <p className="stat-label">Alta disponibilidad</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

