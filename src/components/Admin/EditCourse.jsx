import styled from "@emotion/styled";
import { Cloud } from "@mui/icons-material";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import MainButton from "../../UI/MainButton";
import { toast } from "react-toastify";
import { usePostUpdate } from "../../hooks/usePostUpdate";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../UI/Spinner";
import { useGetData } from "../../hooks/useGetData";
import { useDispatch, useSelector } from "react-redux";
import { setCourseDetails } from "../../redux/reducers/course";
import AdminLayout from "./AdminLayout";

const EditCourse = () => {
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
  const param = useParams();
  const dispatch = useDispatch();
  const [data, getInitialData] = useGetData(
    `api/v1/course/getCourseDetails/${param.cid}`
  );
  useEffect(() => {
    dispatch(setCourseDetails(data?.course));
  }, [dispatch, data?.course]);
  const { courseDetails } = useSelector((state) => state.course);
  const [title, setTitle] = useState();
  const [subjects, setSubjects] = useState();
  const [description, setDescription] = useState();
  const [topic, setTopic] = useState();
  const [file, setFile] = useState();
  const [loader, putPostmethod] = usePostUpdate();
  const navigate = useNavigate();

  console.log(data?.course);
  const addCourseHandler = async () => {
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
      method: "PUT",
      url: `api/v1/course//update/${param.cid}`,
      payload: formData,
      message: "Upadate Course Successfully",
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
  useEffect(() => {
    getInitialData();
    if (courseDetails?._id !== param?.cid) {
      getInitialData();
    } else {
      setTitle(courseDetails?.title);
      setDescription(courseDetails?.description);
      setTopic(courseDetails?.topic);
      setSubjects(courseDetails?.subjects);
    }
  }, [courseDetails?._id, param?.cid]);
  
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
              Edit Course
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
                  placeholder="Enter Your Course Title"
                  fullWidth
                  id="outlined-basic"
                  type="text"
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  value={title}
                />
              </Grid>
              <Grid item>
                <TextField
                  placeholder="Enter Your Course Subjects"
                  fullWidth
                  id="outlined-basic"
                  type="text"
                  onChange={(e) => {
                    setSubjects(e.target.value);
                  }}
                  value={subjects}
                />
              </Grid>
              <Grid item>
                <TextField
                  placeholder="Enter Your Course Description"
                  fullWidth
                  id="outlined-basic"
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
                  placeholder="Enter Your Course Topics"
                  id="outlined-basic"
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
                  Upload New file
                  <VisuallyHiddenInput
                    type="file"
                    accept="image/*"
                    onChange={(event) => setFile(event.target.files[0])}
                  />
                </Button>
              </Grid>

              <Grid
                item
                sx={{
                  width: "10rem",
                  height: "10rem",
                  border: "2px solid gray",
                }}
              >
                {file && (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="course-image"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                )}
              </Grid>

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

export default EditCourse;
