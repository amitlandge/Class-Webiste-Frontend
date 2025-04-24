import styled from "@emotion/styled";
import { Cloud } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MainButton from "../../UI/MainButton";
import { toast } from "react-toastify";
import { usePostUpdate } from "../../hooks/usePostUpdate";
import { useNavigate } from "react-router-dom";
import Spinner from "../../UI/Spinner";
import AdminLayout from "./AdminLayout";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { courseValidation } from "../../utils/validationSchema";
import SubmitButton from "../../UI/SubmitButton";

const AddCourses = () => {
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
  const [loader, putPostmethod] = usePostUpdate();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(courseValidation),
  });
  const addCourseHandler = async (courseData) => {
    console.log("Enter");

    console.log(file);
    let formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("subjects", courseData.subjects);
    formData.append("description", courseData.description);
    formData.append("topic", courseData.topic);
    formData.append("image", file);
    const data = {
      method: "POST",
      url: "api/v1/course/create-course",
      payload: formData,
      message: "Create Course Successfully",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await putPostmethod(data);

      if (response?.status === 200) {
        navigate("/admin/courses");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <AdminLayout>
          <Container
            sx={{
              padding: "2rem",
            }}
          >
            <Typography variant="h4" align="center" gutterBottom>
              Add Courses
            </Typography>
            <Box
              component={"form"}
              onSubmit={handleSubmit(addCourseHandler)}
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
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={!!errors.title}
                      helperText={errors.title?.message}
                      label="Title"
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
                      fullWidth
                      {...field}
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
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      label="Description"
                      variant="outlined"
                      type="text"
                    />
                  )}
                />
              </Grid>
              <Grid item>
                <Controller
                  control={control}
                  name="topic"
                  render={({ field }) => (
                    <TextField
                      fullWidth
                      {...field}
                      error={!!errors.topic}
                      helperText={errors.topic?.message}
                      label="Topics"
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
                <SubmitButton title={"+ Add Course"} />
              </Grid>
            </Box>
          </Container>
        </AdminLayout>
      )}
    </>
  );
};

export default AddCourses;
