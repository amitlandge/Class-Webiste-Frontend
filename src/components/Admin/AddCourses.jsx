import styled from "@emotion/styled";
import { Cloud } from "@mui/icons-material";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import MainButton from "../../UI/MainButton";
import { toast } from "react-toastify";
import { usePostUpdate } from "../../hooks/usePostUpdate";
import { useNavigate } from "react-router-dom";
import Spinner from "../../UI/Spinner";
import AdminLayout from "./AdminLayout";

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
  const [title, setTitle] = useState("");
  const [subjects, setSubjects] = useState("");
  const [description, setDescription] = useState("");
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState();
  const [loader, putPostmethod] = usePostUpdate();
  const navigate = useNavigate();
  console.log(file);
  const addCourseHandler = async () => {
    console.log("Enter");
    if (!title && !subjects && !description && !topic && !file) {
      toast.error("Please Fill All Information");
      return;
    }
    console.log(file);
    let formData = new FormData();
    formData.append("title", title);
    formData.append("subjects", subjects);
    formData.append("description", description);
    formData.append("topic", topic);
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
      console.log(response);
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
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "2rem",
                width: "70vw",
                margin: "0 auto",
              }}
            >
              <Grid item>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Title"
                  variant="outlined"
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Subjects"
                  variant="outlined"
                  type="text"
                  onChange={(e) => {
                    setSubjects(e.target.value);
                  }}
                  value={subjects}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Description"
                  variant="outlined"
                  type="text"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  value={description}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Topics"
                  variant="outlined"
                  type="text"
                  onChange={(e) => {
                    setTopic(e.target.value);
                  }}
                  value={topic}
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
                    //   objectFit: "cover",
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
                <MainButton title={"Add Course"} onclick={addCourseHandler} />
              </Grid>
            </Grid>
          </Container>
        </AdminLayout>
      )}
    </>
  );
};

export default AddCourses;
