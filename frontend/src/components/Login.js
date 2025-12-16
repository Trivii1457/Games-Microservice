import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/dataService';
import './Login.css';

const Login = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      if (isRegister) {
        // Register new user
        await userService.createUser(formData);
        alert('Cuenta creada exitosamente. Por favor inicia sesión.');
        setIsRegister(false);
        setFormData({ username: '', email: '', password: '' });
      } else {
        // Login
        const response = await userService.login({
          username: formData.username,
          password: formData.password,
        });
        
        // Store user info in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
        onLogin(response.data);
        navigate('/');
      }
    } catch (err) {
      setError(isRegister ? 'Error al crear cuenta. El usuario o email ya existe.' : 'Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">🧠 Mind Games</h1>
        <h2>{isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          
          {isRegister && (
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary">
            {isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <div className="login-switch">
          <button 
            type="button"
            className="btn-link" 
            onClick={() => {
              setIsRegister(!isRegister);
              setError('');
              setFormData({ username: '', email: '', password: '' });
            }}
          >
            {isRegister ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
