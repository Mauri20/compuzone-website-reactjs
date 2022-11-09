import './style.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { validate } from './validation';

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
    const errors = validate({ userName, phone, user, address, password, confirmPassword });
    if (Object.keys(errors).length === 0) {
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
          title: 'Registro exitoso',
          text: 'El usuario se ha creado correctamente',
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
    } else {
      Swal.fire({
        title: '¡Error!',
        text:
          errors.userName || errors.phone || errors.user || errors.address || errors.password || errors.confirmPassword,
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  const handleChangePhone = (e) => {
    const {value} = e.target;
    const regexObj = {
      regex9: /^([0-9]{4})(-)([0-9]{4})$/,
      regex8: /^([0-9]{4})(-)([0-9]{3})$/,
      regex7: /^([0-9]{4})(-)([0-9]{2})$/,
      regex6: /^([0-9]{4})(-)([0-9])$/,
      regex5: /^([0-9]{4})(-)$/,
      regex4: /^([0-9]{4})$/,
      regex3: /^([0-9]{3})$/,
      regex2: /^([0-9]{2})$/,
      regex1: /^([0-9])$/,
    }
    if (value.length > 0) {
      setPhone((prevState) => {
        if (value.length > prevState.length && value.length <= 9) {
          if (regexObj[`regex${value.length}`].test(value)) {
            if (value.length === 4) {
              return value + '-';
            }
            return value;
          }
        } else if (value.length < prevState.length) {
          if (value.length === 4) {
            return value.slice(0, -1);
          }
          return value;
        }
        return prevState;
      });
    } else if (value.length === 0) {
      setPhone('');
    }
  };

  //creating a function to handle the submit of the form to login
  async function handleSubmitLogin(e) {
    e.preventDefault();
    navigate('/users/login'); //redirecting to the login page
  }

  return (
    <div className="login-form">
      <h1
        onClick={() => {
          navigate('/trademarks');
        }}
      >
        ZeligStore
      </h1>
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
                type="tel" //This pattern is for the phone number format
                name=""
                //pattern="[6-7]{1}[0-9]{3}-[0-9]{4}"
                value={phone}
                onChange={handleChangePhone}
                placeholder="Tel&eacute;fono: Ej. 7953-8765" //This pattern is for the phone number format
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
