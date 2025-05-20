// src/components/ConfirmModal.tsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface ConfirmModalProps {
  show: boolean;
  title?: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ show, title = "Confirmación", message, onCancel, onConfirm }) => (
  <Modal show={show} onHide={onCancel} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onCancel}>Cancelar</Button>
      <Button variant="danger" onClick={onConfirm}>Eliminar</Button>
    </Modal.Footer>
  </Modal>
);

export default ConfirmModal;

