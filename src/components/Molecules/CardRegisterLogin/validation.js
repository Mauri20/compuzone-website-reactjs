export const validate = (values) => {
  const errors = {};
  //validating the username is text and is required
  if (!values.userName) {
    errors.userName = 'Obligatorio';
  } else if (!/^[A-Za-z ]+$/.test(values.userName)) {
    errors.userName = 'El nombre de usuario solo debe contener letras';
  }
  //validating the phone number is required and is a number with area from Central America
  if (!values.phone) {
    errors.phone = 'Obligatorio';
  } else if (!/^[6-7]\d{3}-\d{4}$/.test(values.phone)) {
    errors.phone = 'El número de teléfono debe tener el formato 6000-0000 o 7000-0000';
  }
  //validating the user is required
  if (!values.user) {
    errors.user = 'Obligatorio';
  }
  //validating the address is required
  if (!values.address) {
    errors.address = 'Obligatorio';
  }
  //validating the password larger than 6 characters
  if (!values.password) {
    errors.password = 'Obligatorio';
  } else if (values.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }
  //validating the password is required and is equal to the confirm password
  if (!values.confirmPassword) {
    errors.confirmPassword = 'Obligatorio';
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Las contraseñas no coinciden';
  }
  return errors;
};
