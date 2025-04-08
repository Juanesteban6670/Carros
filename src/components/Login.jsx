import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const Login = () => {
  const { setToken } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await fetch('https://carros-electricos.wiremockapi.cloud/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error('Credenciales inválidas');

      const data = await res.json();
      setToken(data.token);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default Login;
