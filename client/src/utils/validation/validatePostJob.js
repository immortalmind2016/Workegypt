import isEmpty from "../isEmpty";

export default data => {
  const errors = {};
  for (let key in data) {
    if (isEmpty(data[key]) && key !== "errors") {
      errors[key] = `${key} is required!`;
    }
  }
  return {
    errors,
    isValid: isEmpty(errors) ? true : false
  };
};
