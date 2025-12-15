import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../services/dataService';
import './Profile.css';

const Profile = ({ user, onLogout }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    try {
      await userService.deleteUser(user.id);
      localStorage.removeItem('user');
      onLogout();
      navigate('/login');
      alert('Tu cuenta ha sido eliminada exitosamente');
    } catch (error) {
      console.error('Error eliminando cuenta:', error);
      alert('Error al eliminar la cuenta');
    }
  };

  if (!user) {
    return (
      <div className="container">
        <div className="profile-card">
          <h2>No hay sesión activa</h2>
          <p>Por favor inicia sesión para ver tu perfil.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="page-title">👤 Mi Perfil</h1>
      
      <div className="profile-card">
        <div className="profile-header">
          <div className="profile-avatar">
            {user.username.charAt(0).toUpperCase()}
          </div>
          <div className="profile-info">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
            {user.fechaRegistro && (
              <p className="profile-date">
                Miembro desde: {new Date(user.fechaRegistro).toLocaleDateString()}
              </p>
            )}
          </div>
        </div>
        
        <div className="profile-actions">
          <h3>Acciones de Cuenta</h3>
          
          <div className="danger-zone">
            <h4>⚠️ Zona Peligrosa</h4>
            <p>Una vez que elimines tu cuenta, no hay vuelta atrás. Por favor, está seguro.</p>
            
            {!showDeleteConfirm ? (
              <button 
                className="btn btn-danger" 
                onClick={() => setShowDeleteConfirm(true)}
              >
                Eliminar Mi Cuenta
              </button>
            ) : (
              <div className="delete-confirm">
                <p className="confirm-text">¿Estás completamente seguro?</p>
                <div className="confirm-actions">
                  <button 
                    className="btn btn-danger" 
                    onClick={handleDeleteAccount}
                  >
                    Sí, eliminar permanentemente
                  </button>
                  <button 
                    className="btn btn-secondary" 
                    onClick={() => setShowDeleteConfirm(false)}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
