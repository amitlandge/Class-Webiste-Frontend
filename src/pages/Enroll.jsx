import { CameraAltOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Spinner from "../UI/Spinner";
import { useCourseName } from "../hooks/useCourseName";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { enrollValidation } from "../utils/validationSchema.js";
import SubmitButton from "../UI/SubmitButton.jsx";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { postDataHandler } from "../utils/postData.js";

const Enroll = () => {
  const [file, setFile] = useState();

  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [course] = useCourseName();
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(enrollValidation),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: postDataHandler,
    onSuccess: () => {
      toast("Enroll Successfully");
      navigate("/");
    },
    onError: (error) => {
      toast.error(error?.info?.message);
      reset();
    },
  });
  const submitEnrollData = async (enrollData) => {
    console.log(enrollData);

    let formData = new FormData();
    formData.append("firstName", enrollData.firstName);
    formData.append("middleName", enrollData.middleName);
    formData.append("lastName", enrollData.lastName);
    formData.append("gender", enrollData.gender);
    formData.append("age", enrollData.age);
    formData.append("course", enrollData.course);
    formData.append("address", enrollData.address);
    formData.append("phone", enrollData.phone);
    formData.append("avatar", enrollData.avatar);
    formData.append("userId", user._id);

    mutate({
      url: "api/v1/enroll",
      eventData: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  return (
    <>
      {isPending ? (
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
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "2rem",
              width: "70vw",
            }}
            onSubmit={handleSubmit(submitEnrollData)}
            encType="multipart/form-data"
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
                <small style={{ fontSize: "10px", color: "red" }}>
                  {errors?.avatar?.message &&
                    "Upload a JPEG or PNG file (Max: 2MB)"}
                </small>
                <Controller
                  name="avatar"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <>
                      <TextField
                        type="file"
                        variant="outlined"
                        sx={{
                          position: "relative",
                          top: "-3rem",
                          left: "-2rem",
                          opacity: "0.0",
                          cursor: "pointer",
                        }}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => {
                          field.onChange(e.target.files[0]);
                          setFile(e.target.files[0]);
                        }}
                        error={!!errors.file}
                        helperText={
                          errors.avatar
                            ? errors.avatar.message
                            : "Upload a JPEG or PNG file (Max: 2MB)"
                        }
                      />
                    </>
                  )}
                />
              </div>
            </div>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      type="text"
                      fullWidth
                      label="First Name"
                      variant="outlined"
                      error={!!errors.firstName}
                      helperText={errors.firstName?.message}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="middleName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      type="text"
                      label="Middle Name"
                      variant="outlined"
                      error={!!errors.middleName}
                      helperText={errors.middleName?.message}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="lastName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      {...field}
                      type="text"
                      label="Last Name"
                      variant="outlined"
                      error={!!errors.lastName}
                      helperText={errors.lastName?.message}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      {...field}
                      type="number"
                      label="Phone Number"
                      variant="outlined"
                      error={!!errors.phone}
                      helperText={errors.phone?.message}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      {...field}
                      type="address"
                      label="Address"
                      variant="outlined"
                      error={!!errors.address}
                      helperText={errors.address?.message}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label" fullWidth>
                    Gender
                  </InputLabel>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Gender"
                        error={!!errors.gender}
                        helperText={errors.gender?.message}
                      >
                        <MenuItem value={"male"}>Male</MenuItem>
                        <MenuItem value={"female"}>Female</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="age"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      {...field}
                      type="number"
                      label="Age"
                      variant="outlined"
                      error={!!errors.age}
                      helperText={errors.age?.message}
                      sx={{ mb: 2 }}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Course</InputLabel>
                  <Controller
                    name="course"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        fullWidth
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Course"
                        error={!!errors.course}
                        helperText={errors.course?.message}
                      >
                        {course?.courses?.map((c, index) => {
                          return (
                            <MenuItem key={index} value={c}>
                              {c}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
            <SubmitButton title={"Request For Enrollment"} />
          </Box>
        </div>
      )}
    </>
  );
};

export default Enroll;
