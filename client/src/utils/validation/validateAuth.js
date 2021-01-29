import isEmpty from "../isEmpty";
import validator from "validator";
export default (name, email, password, password2, isRegister = false) => {
  const errors = {};

  if (!validator.isEmail(email)) {
    errors.email = "email is not valid!";
  }

  if (isEmpty(email)) {
    errors.email = "email is required!";
  }

  if (!validator.isLength(password, { min: 6, max: 100 })) {
    errors.password = "password have to be between 6 and 100 characters!";
  }
  if (isEmpty(password)) {
    errors.password = "password is required!";
  }

  // these validations are only performed when it is registeration process
  if (isRegister) {
    if (!validator.isLength(name, { min: 2, max: 50 })) {
      errors.name = "name have to be between 2 and 50 characters!";
    }
    if (isEmpty(name)) {
      errors.name = "name is required!";
    }

    if (isEmpty(password2)) {
      errors.password2 = "password confirmation is required!";
    }
    if (password !== password2) {
      errors.password2 = "password does not match confirmation!";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors) ? true : false
  };
};
