export const validate = (values) => {
  const errors = {};
  //validating the username is text and is required
  if (!values.userName) {
    errors.userName = 'Obligatorio';
  } else if (!/^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g.test(values.userName)) {
    errors.userName = 'El nombre de usuario solo debe contener letras y comenzar con mayúscula';
  } else if (values.userName.length < 10) {
    errors.userName = 'El nombre de usuario no debe ser tan corto';
  }
  //validating the phone number is required and is a number with area from Central America
  if (!values.phone) {
    errors.phone = 'Obligatorio';
  } else if( values.phone.length < 9 ) {
    errors.phone = 'El número de teléfono debe contener al menos 8 caracteres';
  }
  //==============================================
  //if (!values.phone) {
  //  errors.phone = 'Obligatorio';
  //} else if (!/^[6-7]\d{3}-\d{4}$/.test(values.phone)) {
  //  errors.phone = 'El número de teléfono debe tener el formato 6000-0000 o 7000-0000';
  //}
  //==============================================
  //validating the user is required
  if (!values.user) {
    errors.user = 'Obligatorio';
  }else if(values.user.length < 5){
    errors.user = 'El usuario debe contener al menos 5 caracteres';
  }
  //validating the address is required
  if (!values.address) {
    errors.address = 'Obligatorio';
  }else if( values.address.length < 10 ){
    errors.address = 'La dirección no debe ser tan corta';
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
