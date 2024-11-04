import { CameraAltOutlined } from "@mui/icons-material";
import {
  Avatar,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import { usePostUpdate } from "../hooks/usePostUpdate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MainButton from "../UI/MainButton";
import Spinner from "../UI/Spinner";
import { useCourseName } from "../hooks/useCourseName";

const Enroll = () => {
  const [file, setFile] = useState();
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState();
  const [age, setAge] = useState();
  const [course, setCourse] = useState();
  const [gender, setGender] = useState("");
  const [loader, putPostmethod] = usePostUpdate();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [data] = useCourseName();

  const submitEnrollData = async () => {
    // e.preventDefault();
    const phoneNumber = toString(phone);
    if (phoneNumber.trim().length === 10) {
      toast.error("Phone Number Should be 10 Number");
      return;
    }
    if (age < 10 && age > 50) {
      toast.error("Age is Invalid");
      return;
    }
    if (
      !firstName &&
      !middleName &&
      !lastName &&
      !address &&
      !age &&
      !course &&
      !gender
    ) {
      toast.error("Please Fill All Information");
      return;
    } else {
      let formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("middleName", middleName);
      formData.append("lastName", lastName);
      formData.append("gender", gender);
      formData.append("age", age);
      formData.append("course", course);
      formData.append("address", address);
      formData.append("phone", phone);
      formData.append("avatar", file);
      formData.append("userId", user._id);
      const data = {
        method: "POST",
        url: "api/v1/enroll",
        payload: formData,
        message: "Enroll Request Successfully",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      try {
        const response = await putPostmethod(data);

        if (response?.status === 200) {
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "80%",
            margin: "0 auto",
            padding: "2rem",
            gap: "2rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" align="center" gutterBottom>
            Enrollment Form
          </Typography>
          <Container
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",

              alignItems: "center",
              gap: "2rem",
              width: "70vw",
            }}
          >
            <div>
              <Avatar
                src={file ? URL.createObjectURL(file) : ""}
                sx={{ width: "7rem", height: "7rem" }}
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
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  type="text"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                  value={firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Middle Name"
                  variant="outlined"
                  type="text"
                  onChange={(e) => {
                    setMiddleName(e.target.value);
                  }}
                  value={middleName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  value={phone}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Home Address"
                  variant="outlined"
                  type="address"
                  onChange={(e) => {
                    setAddress(e.target.value);
                  }}
                  value={address}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" fullWidth>
                    Gender
                  </InputLabel>
                  <Select
                    fullWidth
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
                    label="Gender"
                    onChange={(e) => {
                      setGender(e.target.value);
                    }}
                  >
                    <MenuItem value={"male"}>Male</MenuItem>
                    <MenuItem value={"female"}>Female</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Age"
                  variant="outlined"
                  type="number"
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  value={age}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Course</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={course}
                    label="Course"
                    onChange={(e) => {
                      setCourse(e.target.value);
                    }}
                  >
                    {data?.courses.map((c, index) => {
                      return (
                        <MenuItem key={index} value={c}>
                          {c}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Container>
          <MainButton onclick={submitEnrollData} title={"Request For Enroll"} />
        </div>
      )}
    </>
  );
};

export default Enroll;
