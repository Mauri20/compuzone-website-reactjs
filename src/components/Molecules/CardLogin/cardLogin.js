import './style.css';
import Swal from 'sweetalert2'; //importing the sweetalert2 library to show alerts
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CardLogin = () => {
  // Creating states for the inputs of the form
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); //importing the hook to redirect to another page

  //creating a function to handle the submit of the form to login
  async function handleSubmit(e) {
    e.preventDefault();
    //sending the data to the backend
    //const url = 'http://localhost:8080';
    //const url = 'http://192.168.6.141:8080';
    const url = 'https://zeligstore-api-nodejs-production-e0d5.up.railway.app';
    const response = await fetch(url + '/v1/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password }) //sending the data to the backend
    });
    const data = await response.json();

    if (data.status === 'ok') {
      localStorage.setItem('token', data.token); //saving the token in the local storage
      Swal.fire({
        title: '¡Bienvenido!',
        text: data.message,
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/trademarks'); //redirecting to the home page
        }
      });
    } else {
      Swal.fire({
        title: '¡Error!',
        text: data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  // creating a function to handle the submit of the form to registerlogin
  async function handleSubmitRegister(e) {
    e.preventDefault();
    navigate('/users/registerlogin'); //redirecting to the register page
  }

  return (
    <div className="login-form">
      <h1>ZeligStore</h1>
      <div className="container">
        <div className="main">
          <div className="content">
            <h2>Inicio de sesión</h2>
            <form className="form1" action="" method="" onSubmit={handleSubmit}>
              <input
                type="text"
                name=""
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Escriba su Usuario"
                required=""
                autoFocus
              />
              <input
                type="password"
                name=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Escriba su Contraseña"
                required=""
              />
              <button className="boton-go" type="submit">
                Verificar
              </button>
              <p className="account">¿Aún no tienes cuenta? ¡Registrate Ahora!</p>
            </form>
            <form action="" onSubmit={handleSubmitRegister}>
              <button className="boton-registrar" type="submit">
                Registrarse
              </button>
            </form>
          </div>
          <div className="form-img">
            <img src="/ZeligStore_Icon.png" alt="form" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardLogin;
