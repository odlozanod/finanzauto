import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import type { User } from '../types/User';

interface Props {
  show: boolean;
  onHide: () => void;
  user: User | null;
}

export const UserDetailsModal: React.FC<Props> = ({ show, onHide, user }) => {
  if (!user) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Detalle del Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><strong>Id:</strong> {user.id}</p>
        <p><strong>Título:</strong> {user.title}</p>
        <p><strong>Nombres:</strong> {user.firstName}</p>
        <p><strong>Apellidos:</strong> {user.lastName}</p>
        <p><strong>Imagen:</strong> <a href={user.picture} target="_blank" rel="noopener noreferrer">{user.picture}</a></p>
        <p><strong>Género:</strong> {user.gender}</p>
        <p><strong>Correo electrónico:</strong> {user.email}</p>
        <p><strong>Fecha de nacimiento:</strong> {new Date(user.dateOfBirth).toLocaleDateString()}</p>
        <p><strong>Teléfono:</strong> {user.phone}</p>

        <div className="text-center mt-3">
          <img src={user.picture} alt="Foto del usuario" className="rounded" width={100} height={100} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
