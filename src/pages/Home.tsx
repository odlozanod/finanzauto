import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Pagination } from 'react-bootstrap';
import API from '../api/userApi';
import UserTable from '../components/UserTable';
import { UserDetailsModal } from '../components/UserDetailsModal';
import UserFormModal from '../components/UserFormModal';
import ConfirmModal from '../components/ConfirmModal';
import type { User } from '../types/User';


const ITEMS_PER_PAGE = 5;

const Home: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Traemos todos los usuarios sin paginar (ajusta limit si hay muchos)
  const fetchUsers = async () => {
    try {
      const response = await API.get('/user?limit=1000'); // límite alto para traer todos
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filtramos usuarios por búsqueda (local)
  const filteredUsers = users.filter(u =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase())
  );

  // Usuarios visibles solo de la página actual
  const indexOfLastUser = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstUser = indexOfLastUser - ITEMS_PER_PAGE;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => handlePageChange(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  // El resto de funciones (handleView, handleEdit, etc.) igual que antes...

  const handleView = async (user: User) => {
    try {
      const response = await API.get(`/user/${user.id}`);
      setSelectedUser(response.data);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Error al obtener detalles del usuario:', error);
    }
  };

  const handleEdit = (user: User) => {
    setUserToEdit(user);
    setShowFormModal(true);
  };

  const handleDelete = (user: User) => {
    setUserToDelete(user);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
      setUserToDelete(null);
      setShowConfirmModal(false);
    }
  };

  const handleCreate = () => {
    setUserToEdit(null);
    setShowFormModal(true);
  };

  const handleSave = async (formData: Partial<User>) => {
    try {
      if (userToEdit) {
        const updatedUser = { ...userToEdit, ...formData };
        setUsers(prev =>
          prev.map(u => (u.id === userToEdit.id ? updatedUser : u))
        );
      } else {
        const newUser: User = {
          id: crypto.randomUUID(),
          ...formData,
        } as User;
        setUsers(prev => [newUser, ...prev]);
      }
      setShowFormModal(false);
    } catch (error) {
      console.error('Error al guardar usuario:', error);
    }
  };

return (
  <>    
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h3>Usuarios</h3>
        </Col>
        <Col xs="auto">
          <Form.Control
            type="text"
            placeholder="Buscar..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1); // resetear página al buscar
            }}
          />
        </Col>
        <Col xs="auto">
          <Button onClick={handleCreate}>Crear Usuario</Button>
        </Col>
      </Row>

      <UserTable
        users={currentUsers}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <Row className="mt-3">
        <Col>
          <Pagination>
            <Pagination.Prev
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            />
            {paginationItems}
            <Pagination.Next
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            />
          </Pagination>
        </Col>
      </Row>

      <UserDetailsModal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        user={selectedUser}
      />

      <UserFormModal
        show={showFormModal}
        onHide={() => setShowFormModal(false)}
        onSave={handleSave}
        userToEdit={userToEdit}
      />

      <ConfirmModal
        show={showConfirmModal}
        message={`¿Estás seguro de eliminar a ${userToDelete?.firstName} ${userToDelete?.lastName}?`}
        onCancel={() => {
          setShowConfirmModal(false);
          setUserToDelete(null);
        }}
        onConfirm={confirmDelete}
      />
    </Container>
  </>
);

};

export default Home;
