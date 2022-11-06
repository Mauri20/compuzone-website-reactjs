import Swal from 'sweetalert2';
// Creating functions to validate the inputs of the form
export const validateForm = (event, user, password) => {
  event.preventDefault();
  if (user.length === 0 || password.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Los campos no pueden quedar vacíos'
    });
    return false;
  } else {
    return true;
  }
};
