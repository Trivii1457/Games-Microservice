import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Profile from './components/Profile';
import Scores from './components/Scores';
import Home from './components/Home';
import GamesMenu from './components/GamesMenu';
import FlashSequence from './components/FlashSequence';
import MathRush from './components/MathRush';
import PatternGame from './components/PatternGame';
import FindDifferent from './components/FindDifferent';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Protected route wrapper
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="App">
        {user && (
          <nav className="navbar">
            <div className="nav-container">
              <Link to="/" className="nav-logo">
                🧠 Mind Games
              </Link>
              <ul className="nav-menu">
                <li className="nav-item">
                  <Link to="/" className="nav-link">🏠 Inicio</Link>
                </li>
                <li className="nav-item">
                  <Link to="/play" className="nav-link">🎮 Jugar</Link>
                </li>
                <li className="nav-item">
                  <Link to="/scores" className="nav-link">🏆 Puntajes</Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">👤 Mi Perfil</Link>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="nav-link logout-btn">
                    🚪 Salir
                  </button>
                </li>
                <li className="nav-item user-info">
                  <span>👋 {user.username}</span>
                </li>
              </ul>
            </div>
          </nav>
        )}

        <div className="content">
          <Routes>
            <Route path="/login" element={
              user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
            } />
            <Route path="/" element={
              <ProtectedRoute><Home /></ProtectedRoute>
            } />
            <Route path="/play" element={
              <ProtectedRoute><GamesMenu /></ProtectedRoute>
            } />
            <Route path="/play/flash-sequence" element={
              <ProtectedRoute><FlashSequence /></ProtectedRoute>
            } />
            <Route path="/play/math-rush" element={
              <ProtectedRoute><MathRush /></ProtectedRoute>
            } />
            <Route path="/play/pattern-game" element={
              <ProtectedRoute><PatternGame /></ProtectedRoute>
            } />
            <Route path="/play/find-different" element={
              <ProtectedRoute><FindDifferent /></ProtectedRoute>
            } />
            <Route path="/scores" element={
              <ProtectedRoute><Scores /></ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute><Profile user={user} onLogout={handleLogout} /></ProtectedRoute>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

