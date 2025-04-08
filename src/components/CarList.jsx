import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx';

const CarList = () => {
  const { token } = useContext(AuthContext);
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    fetch('https://carros-electricos.wiremockapi.cloud/carros', {
      method: 'GET',
      headers: {
        'Authentication': token
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener los carros');
        return res.json();
      })
      .then(data => {
        setCars(data);
      })
      .catch(err => {
        console.error(err);
        setError('No se pudieron cargar los carros');
      });
  }, [token]);

  return (
    <div>
      <h2>Mis carros</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {cars.map((carro, i) => (
          <li key={i}>{carro.nombre || JSON.stringify(carro)}</li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
