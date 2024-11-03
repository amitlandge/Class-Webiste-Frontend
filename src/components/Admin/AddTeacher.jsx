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
  const [name, setName] = useState("");
  const [subjects, setSubjects] = useState("");
  const [bio, setBio] = useState("");

  const [file, setFile] = useState();
  const [loader, putPostmethod] = usePostUpdate();
  const navigate = useNavigate();

  const addTeacherHandler = async () => {
    if (!name && !subjects && !bio && !file) {
      toast.error("Please Fill All Information");
      return;
    }
    console.log(file);
    let formData = new FormData();
    formData.append("name", name);
    formData.append("subjects", subjects);
    formData.append("bio", bio);
    formData.append("avatar", file);
    const data = {
      method: "POST",
      url: "api/v1/teacher/add-teacher",
      payload: formData,
      message: "Add Teacher Successfully",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await putPostmethod(data);
      console.log(response);
      if (response?.status === 200) {
        navigate("/admin/teachers");
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
              Add Teacher
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
                  label="Name"
                  variant="outlined"
                  type="text"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
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
                  label="Bio"
                  variant="outlined"
                  type="text"
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                  value={bio}
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
                <MainButton title={"Add Teacher"} onclick={addTeacherHandler} />
              </Grid>
            </Grid>
          </Container>
        </AdminLayout>
      )}
    </>
  );
};

export default AddTeacher;
