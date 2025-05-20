import React, { useEffect, useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import type { User } from '../types/User';

interface Props {
  show: boolean;
  onHide: () => void;
  onSave: (user: Partial<User>) => void;
  userToEdit: User | null;
}

const titles = ['mr', 'ms', 'mrs', 'miss', 'dr'];
const genders = ['male', 'female', 'other'];

const UserFormModal: React.FC<Props> = ({ show, onHide, onSave, userToEdit }) => {
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    setFormData(userToEdit || {});
  }, [userToEdit]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, picture: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{userToEdit ? 'Modificación de Usuario' : 'Crear Usuario'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {userToEdit && (
            <Form.Group className="mb-3">
              <Form.Label>Id:</Form.Label>
              <Form.Control value={formData.id} readOnly />
              <Alert variant="danger" className="mt-1 p-1 text-center">
                ¡Este campo es de sólo lectura!
              </Alert>
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Título :</Form.Label>
            <Form.Select
              name="title"
              value={formData.title || ''}
              onChange={handleChange}
            >
              <option value="">-- select --</option>
              {titles.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Nombres:</Form.Label>
            <Form.Control
              name="firstName"
              value={formData.firstName || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Apellidos:</Form.Label>
            <Form.Control
              name="lastName"
              value={formData.lastName || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagen:</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formData.picture && (
              <div className="mt-2 text-center">
                <img
                  src={formData.picture}
                  alt="Vista previa"
                  style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px' }}
                />
              </div>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Género:</Form.Label>
            <Form.Select
              name="gender"
              value={formData.gender || ''}
              onChange={handleChange}
            >
              <option value="">-- select --</option>
              {genders.map(g => (
                <option key={g} value={g}>{g}</option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo electrónico:</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={formData.email || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de nacimiento:</Form.Label>
            <Form.Control
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth || ''}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Teléfono:</Form.Label>
            <Form.Control
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleSubmit}>
          Guardar
        </Button>
        <Button variant="dark" onClick={onHide}>
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserFormModal;
