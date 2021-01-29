import isEmpty from "../isEmpty";
import validator from "validator";

/* 
 jobTitle: jobTitle || "",
      companyName: companyName || "",
      companyCountry: companyCountry || "",
      companyState: companyState || "",
      startDate: startDate || null,
      endDate: endDate || null
*/
export const experienceValidator = data => {
  // const errors = {};
  // for (let key in data) {
  //   if (isEmpty(data[key]) && key !== "errors") {
  //     errors[key] = `${key} is required!`;
  //     console.log(data);
  //     console.log(key.companyState);
  //   }
  // }
  let errors = {};
  if (isEmpty(data.title && data.at && data.companyCountry && data.from && data.to && data.fromMonth && data.toMonth)) {
    errors = 'field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors) ? true : false
  };
};

export const educationValidator = data => {
  let errors = {};
  if (isEmpty(data.title && data.at && data.schoolCountry && data.from && data.to && data.fromMonth && data.toMonth)) {
    errors = 'field is required';
  }
  return {
    errors,
    isValid: isEmpty(errors) ? true : false
  };
};

export const briefValidator = data => {
  const errors = {};
  const { /*  userName, */ jobTitle } = data;
  /*   if (!validator.isLength(userName, { min: 2, max: 50 })) {
    errors.userName = "user name have to be between 2 and 50 characters!";
  } */
  if (!validator.isLength(jobTitle, { min: 2, max: 50 })) {
    errors.jobTitle = "job title have to be between 2 and 50 characters!";
  }
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
