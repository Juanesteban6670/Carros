import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import Login from './components/Login.jsx';
import CarList from './components/CarList.jsx';

const App = () => {
  const { token } = useContext(AuthContext);

  return (
    <div>
      <h1>App de carros</h1>
      {token ? <CarList /> : <Login />}
    </div>
  );
};

export default App;
