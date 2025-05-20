import React from 'react';
import { Navbar, Container, Image, Button } from 'react-bootstrap';
import { FaTh } from 'react-icons/fa';

interface HeaderProps {
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const userName = localStorage.getItem('userName') || 'Usuario';
  const userPicture = localStorage.getItem('userPicture');

  return (
    <Navbar className="navbar-custom w-100 m-0 p-0" variant="dark" expand="lg">
      <Container fluid className="d-flex justify-content-between align-items-center px-4 py-2">
        <div className="text-light-custom fw-bold fs-5">
          Módulo de Consulta y Registro de Usuarios al Sistema
        </div>
        <div className="d-flex align-items-center gap-3">
          <FaTh size={20} className="text-light-custom" />
          {userPicture ? (
            <Image
              src={userPicture}
              roundedCircle
              width={36}
              height={36}
              alt="User"
              style={{ objectFit: 'cover' }}
            />
          ) : (
            <div
              className="bg-light d-flex justify-content-center align-items-center rounded-circle"
              style={{ width: 36, height: 36, fontSize: 14, color: '#000' }}
            >
              {userName.charAt(0)}
            </div>
          )}
          <span className="text-light-custom">{userName}</span>
          <Button variant="outline-light" size="sm" onClick={onLogout}>
            Cerrar sesión
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header;
