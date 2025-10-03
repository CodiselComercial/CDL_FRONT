import React, { useState } from 'react';
import { Users } from 'lucide-react';
import ActionButton from '../Components/atoms/ActionButton/ActionButton.jsx';
import AddButton from '../Components/atoms/AddButton/AddButton.jsx';
import Modal from '../Components/atoms/Modal/Modal.jsx';
import UserForm from '../Components/molecules/UserForm/UserForm.jsx';
import Toast from '../Components/atoms/Toast/Toast.jsx';
import styles from './UserCrudPage.module.css';

const UserCrudPage = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'juan.proveedor',
      fullName: 'Juan Pérez',
      email: 'juan@constructoraabc.com',
      role: 'proveedor'
    },
    {
      id: 2,
      username: 'maria.compras',
      fullName: 'María García',
      email: 'maria@empresa.com',
      role: 'compras'
    },
    {
      id: 3,
      username: 'carlos.admin',
      fullName: 'Carlos López',
      email: 'carlos@empresa.com',
      role: 'compras'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [toast, setToast] = useState(null);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      setToast({ message: 'Usuario eliminado correctamente', type: 'success' });
    }
  };

  const handleSaveUser = (formData) => {
    if (editingUser) {
      // Editar usuario existente
      const updatedUser = { ...editingUser, ...formData };
      // Si no se proporcionó nueva contraseña, mantener la actual
      if (!formData.password) {
        delete updatedUser.password;
      }
      setUsers(prev => prev.map(u => 
        u.id === editingUser.id ? updatedUser : u
      ));
      setToast({ message: 'Usuario actualizado correctamente', type: 'success' });
    } else {
      // Crear nuevo usuario
      const newUser = {
        id: Date.now(), // ID temporal
        ...formData
      };
      setUsers(prev => [...prev, newUser]);
      setToast({ message: 'Usuario creado correctamente', type: 'success' });
    }
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const getRoleBadge = (role) => {
    const roleClasses = {
      proveedor: styles.provider,
      compras: styles.purchases
    };
    return `${styles.roleBadge} ${roleClasses[role] || ''}`;
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.header}>
          <div className={styles.titleSection}>
            <Users className={styles.icon} size={32} />
            <h2 className={styles.title}>CRUD de Usuarios</h2>
          </div>
          <p className={styles.subtitle}>
            Administra los usuarios que acceden al sistema
          </p>
        </div>

        <div className={styles.actionsBar}>
          <AddButton onClick={handleAddUser}>
            Agregar Usuario
          </AddButton>
        </div>

        <div className={styles.usersTable}>
          <div className={styles.tableHeader}>
            <div className={styles.headerCell}>Usuario</div>
            <div className={styles.headerCell}>Nombre Completo</div>
            <div className={styles.headerCell}>Email</div>
            <div className={styles.headerCell}>Rol</div>
            <div className={styles.headerCell}>Acciones</div>
          </div>
          <div className={styles.tableBody}>
            {users.map((user) => (
              <div key={user.id} className={styles.userRow}>
                <div className={styles.username}>{user.username}</div>
                <div className={styles.fullName}>{user.fullName}</div>
                <div className={styles.email}>{user.email}</div>
                <div className={styles.role}>
                  <span className={getRoleBadge(user.role)}>
                    {user.role}
                  </span>
                </div>
                <div className={styles.actions}>
                  <ActionButton
                    type="edit"
                    onClick={() => handleEditUser(user)}
                    size="small"
                  />
                  <ActionButton
                    type="delete"
                    onClick={() => handleDeleteUser(user.id)}
                    size="small"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {users.length === 0 && (
          <div className={styles.emptyState}>
            <Users size={48} className={styles.emptyIcon} />
            <h3>No hay usuarios</h3>
            <p>Agrega tu primer usuario para comenzar</p>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={editingUser ? 'Editar Usuario' : 'Agregar Usuario'}
          size="medium"
        >
          <UserForm
            user={editingUser}
            onSave={handleSaveUser}
            onCancel={handleCloseModal}
            isEditing={!!editingUser}
          />
        </Modal>

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </div>
    </div>
  );
};

export default UserCrudPage;
