import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Header from './components/Header';
import './App.css';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    window.location.href = '/login';
  };

  useEffect(() => {
    // Si cambió el token, actualiza localStorage (por si acaso)
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <Router>
      {token && <Header onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<Login onLogin={setToken} />} />
        <Route path="/home" element={token ? <Home /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to={token ? "/home" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
