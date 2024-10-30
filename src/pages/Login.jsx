import { Suspense, useEffect, useState } from "react";
import "./Login.css";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";

// import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { usePostUpdate } from "../hooks/usePostUpdate";
import { isAuthenticated, isNotAuthenticated } from "../redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../UI/Spinner";
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
                  onSubmit={onLoginHandler}
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
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      background: "#006A4E",
                      color: "white",
                      ":hover": {
                        background: "#006A4E",
                        color: "white",
                      },
                    }}
                  >
                    Login
                  </Button>
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
                  onSubmit={onRegisterHandler}
                >
                  {/* <div> */}
                  {/* <Avatar
                  src={file ? URL.createObjectURL(file) : ""}
                  sx={{ width: "10rem", height: "10rem" }}
                ></Avatar>
                <div style={{ position: "absolute", cursor: "pointer" }}>
                  <CameraAltOutlined
                    style={{
                      cursor: "pointer",
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    style={{
                      position: "relative",
                      top: "-10px",
                      left: "-2rem",
                      opacity: "0.0",
                    }}
                    onChange={(e) => {
                      setFile(e.target.files[0]);
                      console.log(e.target.files[0]);
                    }}
                  />
                </div>
              </div> */}
                  {/* <TextField
                type="text"
                className="name"
                label="Name"
                variant="outlined"
                style={{ width: "25rem" }}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
              /> */}
                  {/* <TextField
                type="text"
                className="bio"
                label="Bio"
                variant="outlined"
                style={{ width: "25rem" }}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                value={bio}
              /> */}
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
                  <Button
                    variant="contained"
                    type="submit"
                    sx={{
                      background: "#006A4E",
                      color: "white",
                      ":hover": {
                        background: "#006A4E",
                        color: "white",
                      },
                    }}
                  >
                    Register
                  </Button>
                </form>
              </>
            )}
            OR
            <Button
              onClick={changeFormHandler}
              sx={{
                background: "#006A4E",
                color: "white",
                ":hover": {
                  background: "#006A4E",
                  color: "white",
                },
              }}
            >
              Switch To {login ? "Register" : "Login"}
            </Button>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default Login;
