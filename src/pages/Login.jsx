import { useEffect, useState } from "react";
import "./Login.css";
import { Box, Container, Paper, TextField, Typography } from "@mui/material";

import { usePostUpdate } from "../hooks/usePostUpdate";
import { isAuthenticated, isNotAuthenticated } from "../redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../UI/Spinner";
import MainButton from "../UI/MainButton";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "../utils/validationSchema.js";
import { Controller, useForm } from "react-hook-form";
import SubmitButton from "../UI/SubmitButton.jsx";
import Register from "./Register.jsx";
const Login = () => {
  const [login, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const { isLogin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });

  const [loader, putPostmethod] = usePostUpdate();

  const onLoginHandler = async (logData) => {
    const data = {
      method: "POST",
      url: "api/v1/user/login",
      payload: logData,
      message: "Login Successfully",
    };
    const response = await putPostmethod(data);
    if (response?.status === 200) {
      dispatch(isAuthenticated(response?.data.user));
      navigate("/home");
    } else {
      dispatch(isNotAuthenticated());
    }
  };
  const changeFormHandler = () => {
    setIsLogin((prev) => !prev);
  };
  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    } else {
      navigate("/home");
    }
  }, [isLogin, navigate]);
  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <Container
          sx={{
            height: "auto",
            maxWidth: "max-content",
            margin: "2% auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              padding: "3rem",
            }}
            elevation={7}
          >
            {login ? (
              <>
                <Typography variant="h4">Login</Typography>

                <Box
                  component={"form"}
                  onSubmit={handleSubmit(onLoginHandler)}
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
                  <SubmitButton title={"login"} />
                </Box>
              </>
            ) : (
              <>
                <Register />
              </>
            )}
            OR
            <MainButton
              title={`Switch To ${login ? "Register" : "Login"}`}
              onclick={changeFormHandler}
            />
          </Paper>
        </Container>
      )}
    </>
  );
};

export default Login;
