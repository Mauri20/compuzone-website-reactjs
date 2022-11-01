import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const CardRegisterLogin = () => {
  //Creating states for the inputs of the form
  const [userName, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('0'); // 0 = client, 1 = admin
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  //creating a function to handle the submit of the form
  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'The passwords do not match!'
      });
    } else {
      //sending the data to the backend
      //const url = 'http://localhost:8080';
      //const url = 'http://192.168.6.141:8080';
      const url = 'https://zeligstore-api-nodejs-production-e0d5.up.railway.app';
      const response = await fetch(url + '/v1/users/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userName, phone, user, address, password, userType }) //sending the data to the backend
      });
      const data = await response.json();

      if (data.status === 'ok') {
        Swal.fire({
          title: 'Register successful!',
          text: 'Now you can Logging in!',
          icon: 'success',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/users/login');
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
  }

  //creating a function to handle the submit of the form to login
  async function handleSubmitLogin(e) {
    e.preventDefault();
    navigate('/users/login'); //redirecting to the login page
  }

  return (
    <div className="login-form">
      <h1>ZeligStore</h1>
      <div className="container">
        <div className="main">
          <div className="content">
            <h2>Registro de Usuarios</h2>
            <form className="form1" onSubmit={handleSubmit} method="">
              <input
                type="text"
                name=""
                value={userName}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre Completo"
                required
                autoFocus
              />
              <input
                type="tel"
                pattern="\d{8}" //This pattern is for the phone number format
                name=""
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Formato: 88888888" //This pattern is for the phone number format
                required
              />
              <input
                type="text"
                name=""
                value={user}
                onChange={(e) => setUser(e.target.value)}
                placeholder="Usuario"
                required
              />
              <input
                type="text"
                name=""
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Direcci&oacute;n"
                required
              />
              <input
                type="password"
                name=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contrase&ntilde;a"
                required
              />
              <input
                type="password"
                name=""
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirmar Contraseña"
                required
              />
              <input type="hidden" name="action" value={userType} onLoad={() => setUserType('0')} />
              <button className="boton-go" type="submit">
                Registrar
              </button>
              <p className="account">¿Ya tienes una cuenta? ¡Inicia sesión!</p>
            </form>
            <form action="" onSubmit={handleSubmitLogin}>
              <button className="boton-registrar" type="submit">
                Iniciar Sesión
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
export default CardRegisterLogin;
