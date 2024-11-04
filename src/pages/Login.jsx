import { useEffect, useState } from "react";
import "./Login.css";
import { Container, Paper, TextField, Typography } from "@mui/material";


import { toast } from "react-toastify";
import { usePostUpdate } from "../hooks/usePostUpdate";
import { isAuthenticated, isNotAuthenticated } from "../redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../UI/Spinner";
import MainButton from "../UI/MainButton";
const Login = () => {
  const [login, setIsLogin] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const { isLogin } = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const isEmailValid = email.trim().includes("@");
  const isPasswordValid = password.trim().length === 8;
  const isUserNameValid = username.trim().length > 5;

  const [loader, putPostmethod] = usePostUpdate();
  const onRegisterHandler = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      toast.error("Email is Invalid, Please Try Again");
    } else if (!isPasswordValid) {
      toast.error("Password Shoud Be 8 Character");
    } else if (!isUserNameValid) {
      toast.error("Username is Invalid , Username Should Be Above 5 Character");
    } else if (isEmailValid && isUserNameValid && isPasswordValid) {
      const data = {
        method: "POST",
        url: "api/v1/user/register",
        payload: { email, username, password },
        message: "Register Successfully",
      };
      const response = await putPostmethod(data);
      console.log(response);
      if (response?.status === 200) {
        dispatch(isAuthenticated(response?.data.user));
        navigate("/");
      } else {
        dispatch(isNotAuthenticated());
      }
    }
  };

  const onLoginHandler = async (e) => {
    e.preventDefault();
    if (!isUserNameValid) {
      toast.error("Email is Invalid, Please Try Again");
    } else if (!isPasswordValid) {
      toast.error("Password Shoud Be 8 Character");
    } else if (isUserNameValid && isPasswordValid) {
      const data = {
        method: "POST",
        url: "api/v1/user/login",
        payload: { username, password },
        message: "Login Successfully",
      };
      const response = await putPostmethod(data);
      if (response.status === 200) {
        dispatch(isAuthenticated(response?.data.user));
        navigate("/home");
      } else {
        dispatch(isNotAuthenticated());
      }
    }
  };
  const changeFormHandler = () => {
    setIsLogin((prev) => !prev);
    setEmail("");
    setPassword("");
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
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "2rem",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    type="username"
                    className="username"
                    label="username"
                    variant="outlined"
                    style={{ width: "25rem" }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    value={username}
                  />
                  <TextField
                    type="password"
                    className="email"
                    label="Password"
                    variant="outlined"
                    style={{ width: "25rem" }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                  <span
                    style={{ alignSelf: "flex-start" }}
                    color={!isPasswordValid ? "red" : "black"}
                  >
                    Password Must Be 8 Character
                  </span>
                  <MainButton onclick={onLoginHandler} title={"Login"} />
                </form>
              </>
            ) : (
              <>
                <Typography variant="h4">Register</Typography>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    type="text"
                    className="text"
                    label="Username"
                    variant="outlined"
                    style={{ width: "25rem" }}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    value={username}
                  />
                  <TextField
                    type="email"
                    className="email"
                    label="Email"
                    variant="outlined"
                    style={{ width: "25rem" }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                  <TextField
                    type="password"
                    className="email"
                    label="Password"
                    variant="outlined"
                    style={{ width: "25rem" }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                  <p
                    color="red !important"
                    style={{
                      alignSelf: "flex-start",
                      color: !isPasswordValid ? "red" : "black",
                    }}
                  >
                    Password Must Be 8 Character
                  </p>
                  <MainButton onclick={onRegisterHandler} title={"Register"} />
                </form>
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
