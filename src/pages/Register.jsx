import { Box, TextField, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SubmitButton from "../UI/SubmitButton";
import { usePostUpdate } from "../hooks/usePostUpdate.js";
import { useDispatch } from "react-redux";
import { isAuthenticated, isNotAuthenticated } from "../redux/reducers/auth.js";
import { Navigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidation } from "../utils/validationSchema.js";
import Spinner from "../UI/Spinner.jsx";

const Register = () => {
  const [loader, putPostmethod] = usePostUpdate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidation),
  });
  const dispatch = useDispatch();
  let registerformSubmitHandler = async (regData) => {
    console.log(regData);
    const data = {
      method: "POST",
      url: "api/v1/user/register",
      payload: regData,
      message: "Register Successfully",
    };
    const response = await putPostmethod(data);
    console.log(response);
    if (response?.status === 200) {
      dispatch(isAuthenticated(response?.data.user));
      Navigate("/");
    } else {
      dispatch(isNotAuthenticated());
    }
  };
  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <Box>
          <Typography variant="h4" mb={"1rem"} textAlign={"center"}>
            Register
          </Typography>
          <Box
            component={"form"}
            onSubmit={handleSubmit(registerformSubmitHandler)}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="text"
                  label="Username"
                  variant="outlined"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  sx={{ mb: 2, width: "25rem" }}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  fullWidth
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{ mb: 2, width: "25rem" }}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  variant="outlined"
                  fullWidth
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  sx={{ mb: 2, width: "25rem" }}
                />
              )}
            />

            <SubmitButton title={"Register"} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Register;
