import { useEffect, useState } from "react";
import "./Login.css";
import { Box, Container, Paper, TextField, Typography } from "@mui/material";

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
import { useMutation } from "@tanstack/react-query";
import { postDataHandler } from "../utils/postData.js";
import { toast } from "react-toastify";
const Login = () => {
  const [login, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const { isLogin } = useSelector((state) => state.auth);
  const { mutate, isPending, data } = useMutation({
    mutationFn: postDataHandler,
    onSuccess: () => {
      dispatch(isAuthenticated(data?.data?.user));
      toast("Login Successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.info?.message);
      dispatch(isNotAuthenticated());
    },
  });
  const dispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });

  const onLoginHandler = async (logData) => {
    mutate({ url: "api/v1/user/login", eventData: logData });
  };
  console.log(data?.user);
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
      {isPending ? (
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
