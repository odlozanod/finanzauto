import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';
import type { User } from '../types/User';
import { translateTitle } from '../utils/translateTitle';

interface Props {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UserTable: React.FC<Props> = ({ users, onView, onEdit, onDelete }) => {
  return (
    <Table responsive bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombres y Apellidos</th>
          <th>Foto</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td><strong>{user.id}</strong></td>
            <td>{`${translateTitle(user.title)} ${user.firstName} ${user.lastName}`}</td>
            <td>
              {user.picture ? (
                <Image src={user.picture} roundedCircle width={40} height={40} />
              ) : (
                <span>Sin imagen</span>
              )}
            </td>
            <td>
              <Button variant="info" size="sm" onClick={() => onView(user)}>👁️</Button>{' '}
              <Button variant="secondary" size="sm" onClick={() => onEdit(user)}>✏️</Button>{' '}
              <Button variant="danger" size="sm" onClick={() => onDelete(user)}>🗑️</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
