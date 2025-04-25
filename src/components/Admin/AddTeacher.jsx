import styled from "@emotion/styled";
import { Cloud } from "@mui/icons-material";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";

import { toast } from "react-toastify";
import { usePostUpdate } from "../../hooks/usePostUpdate";
import { useNavigate } from "react-router-dom";
import Spinner from "../../UI/Spinner";
import AdminLayout from "./AdminLayout";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addTeacherValidation } from "../../utils/validationSchema";
import SubmitButton from "../../UI/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { postDataHandler } from "../../utils/postData";

const AddTeacher = () => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const [file, setFile] = useState();

  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addTeacherValidation),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: postDataHandler,
    onSuccess: () => {
      toast("Create Teacher Successfully");
      navigate("/admin/teachers");
    },
    onError: (error) => {
      toast.error(error?.info?.message);
    },
  });
  const addTeacherHandler = async (addTeacherData) => {
    let formData = new FormData();
    formData.append("name", addTeacherData.name);
    formData.append("subjects", addTeacherData.subjects);
    formData.append("bio", addTeacherData.bio);
    formData.append("avatar", file);
    mutate({
      url: "api/v1/teacher/add-teacher",
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
        <AdminLayout>
          <Container
            sx={{
              padding: "2rem",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Add Teacher
            </Typography>
            <Grid
              component={"form"}
              onSubmit={handleSubmit(addTeacherHandler)}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                width: "70vw",
                margin: "0 auto",
              }}
            >
              <Grid item>
                <Controller
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      {...field}
                      error={!!errors.name}
                      helperText={errors.name?.message}
                      label="Name"
                      variant="outlined"
                      type="text"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name="subjects"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={!!errors.subjects}
                      helperText={errors.subjects?.message}
                      label="Subjects"
                      variant="outlined"
                      type="text"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  name="bio"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      {...field}
                      label="Bio"
                      error={!!errors.bio}
                      helperText={errors.bio?.message}
                      variant="outlined"
                      type="text"
                    />
                  )}
                />
              </Grid>

              <Grid item>
                <Button
                  component="label"
                  role={undefined}
                  variant="contained"
                  tabIndex={-1}
                  startIcon={<Cloud />}
                >
                  Upload files
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                </Button>
              </Grid>
              {file && (
                <Grid
                  item
                  sx={{
                    width: "10rem",
                    height: "10rem",
                    border: "2px solid gray",
                  }}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    alt="course-image"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </Grid>
              )}
              <Grid item>
                <SubmitButton title={"+ Add Teacher"} />
              </Grid>
            </Grid>
          </Container>
        </AdminLayout>
      )}
    </>
  );
};

export default AddTeacher;
