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

export const enrollValidation = Yup.object().shape({
  phone: Yup.string()
    .matches(/^\d{10}$/, "Phone Number Should be 10 digits")
    .required("Phone Number is required"),
  age: Yup.number()
    .required("Age is required")
    .min(10, "Age must be at least 10")
    .max(50, "Age cannot be greater than 50"),
  firstName: Yup.string().required("First Name is required"),
  middleName: Yup.string().required("Middle Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  address: Yup.string().required("Address is required"),
  course: Yup.string().required("Course is required"),
  gender: Yup.string().required("Gender is required"),
  avatar: Yup.mixed()
    .required("File is required")
    .test("fileSize", "File too large", (value) => {
      return value && value && value.size <= 2 * 1024 * 1024; // Max 2MB
    })
    .test("fileType", "Unsupported file type", (value) => {
      return value && value && ["image/jpeg", "image/png"].includes(value.type);
    }),
});

export const assignmentValidation = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  note: Yup.string()
    .min(5, "Note must be at least 10 characters")
    .required("Note is required"),
  course: Yup.string()
    .min(3, "Course must be at least 3 characters")
    .required("Course is required"),
});
export const courseValidation = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters")
    .required("Title is required"),
  description: Yup.string()
    .min(5, "Description must be at least 10 characters")
    .required("Description is required"),
  subjects: Yup.string()
    .min(3, "Subject must be at least 3 characters")
    .required("Subject is required"),
  topic: Yup.string()
    .min(3, "Topic must be at least 3 characters")
    .required("Topic is required"),
});
