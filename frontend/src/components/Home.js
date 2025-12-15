import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero">
        <h1 className="hero-title">🧠 Bienvenido a Mind Games</h1>
        <p className="hero-subtitle">
          Desafía tu mente con nuestros juegos mentales
        </p>
        <div className="hero-description">
          <p>
            Una plataforma completa para entrenar tu cerebro con juegos diseñados
            para mejorar tu memoria, atención y agilidad mental.
          </p>
        </div>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">👥</div>
          <h3>Gestión de Usuarios</h3>
          <p>Crea y administra perfiles de jugadores</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🎮</div>
          <h3>Variedad de Juegos</h3>
          <p>Múltiples juegos mentales con diferentes dificultades</p>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🏆</div>
          <h3>Sistema de Puntajes</h3>
          <p>Compite y mira tu posición en los rankings</p>
        </div>
      </div>

      <div className="stats">
        <div className="stat-card">
          <h2>Microservicios</h2>
          <p className="stat-number">4</p>
          <p className="stat-label">Servicios independientes</p>
        </div>

        <div className="stat-card">
          <h2>Tecnología</h2>
          <p className="stat-number">Java 17</p>
          <p className="stat-label">Spring Boot + React</p>
        </div>

        <div className="stat-card">
          <h2>Base de Datos</h2>
          <p className="stat-number">PostgreSQL</p>
          <p className="stat-label">Alta disponibilidad</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

