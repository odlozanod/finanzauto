import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import API from "../api/userApi";

interface UserBasic {
  id: string;
  firstName: string;
  lastName: string;
}

interface UserDetail extends UserBasic {
  email: string;
  picture: string;
}

interface LoginProps {
  onLogin: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const usersResponse = await API.get("/user?limit=100");
      const users: UserBasic[] = usersResponse.data.data;

      const matchedUser = users.find((user) => user.id === userId);

      if (!matchedUser) {
        alert("ID de usuario no encontrado");
        return;
      }

      const detailResponse = await API.get(`/user/${userId}`);
      const userDetail: UserDetail = detailResponse.data;

      if (userDetail.email === username) {
        const fakeToken = btoa(`${username}:${userId}`);
        localStorage.setItem("token", fakeToken);
        localStorage.setItem("userEmail", userDetail.email);
        localStorage.setItem(
          "userName",
          `${userDetail.firstName} ${userDetail.lastName}`
        );
        localStorage.setItem("userPicture", userDetail.picture);

        onLogin(fakeToken);
        navigate("/home");
      } else {
        alert("Correo electrónico incorrecto");
      }
    } catch (error) {
      alert("Error de red: " + error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-image"></div>

      <div className="login-box">
        <h2>Bienvenido</h2>
        <p>Ingrese con sus credenciales de acceso</p>
        <p>
          Correo electrónico: caro.herreraa@email.com <br />
          Id: 67f7894fddd2b69b2bca2a27
        </p>

        <input
          type="text"
          className="form-control"
          placeholder="Correo electrónico"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          className="form-control"
          placeholder="ID de usuario"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />

        <button className="btn btn-info w-100 mt-3" onClick={handleLogin}>
          Ingresar
        </button>

        <p className="text-center mt-3">
          <a href="#" className="text-info">
            ¿Olvidó su contraseña?
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
