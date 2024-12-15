import * as Yup from "yup";

export const registerValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be  8 characters")
    .max(8, "Password must be  8 characters")
    .required("Password is required"),
  username: Yup.string()
    .min(5, "Username must be at least 5 characters")
    .required("Username is required"),
});

export const loginValidation = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be  8 characters")
    .max(8, "Password must be  8 characters")
    .required("Password is required"),
  username: Yup.string()
    .min(5, "Username must be at least 5 characters")
    .required("Username is required"),
});
