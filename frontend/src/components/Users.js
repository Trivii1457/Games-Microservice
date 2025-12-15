import React, { useState, useEffect } from 'react';
import { userService } from '../services/dataService';
import './Common.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await userService.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error cargando usuarios:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await userService.updateUser(editingId, formData);
        setEditingId(null);
      } else {
        await userService.createUser(formData);
      }
      setFormData({ username: '', email: '', password: '' });
      loadUsers();
    } catch (error) {
      console.error('Error guardando usuario:', error);
      alert('Error al guardar usuario');
    }
  };

  const handleEdit = (user) => {
    setFormData({
      username: user.username,
      email: user.email,
      password: '',
    });
    setEditingId(user.id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      try {
        await userService.deleteUser(id);
        loadUsers();
      } catch (error) {
        console.error('Error eliminando usuario:', error);
      }
    }
  };

  const handleCancel = () => {
    setFormData({ username: '', email: '', password: '' });
    setEditingId(null);
  };

  return (
    <div className="container">
      <h1 className="page-title">👥 Gestión de Usuarios</h1>

      <div className="form-card">
        <h2>{editingId ? 'Editar Usuario' : 'Nuevo Usuario'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre de Usuario:</label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required={!editingId}
              placeholder={editingId ? 'Dejar vacío para mantener actual' : ''}
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Actualizar' : 'Crear'}
            </button>
            {editingId && (
              <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="table-card">
        <h2>Lista de Usuarios</h2>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Email</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.fechaRegistro).toLocaleDateString()}</td>
                  <td>
                    <button className="btn btn-sm btn-edit" onClick={() => handleEdit(user)}>
                      Editar
                    </button>
                    <button className="btn btn-sm btn-delete" onClick={() => handleDelete(user.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <p className="empty-message">No hay usuarios registrados</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;

