import { useEffect, useState } from "react";
import {
  Container,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import MainButton from "../../UI/MainButton";

const CourseDetails = () => {
  const param = useParams(); // Extract course ID from URL params
  const [data] = useGetData(`api/v1/course/getCourseDetails/${param.cid}`);
  const course = data?.course;
  console.log(course);
  //   useEffect(() => {
  //     // Fetch course details from backend
  //     const fetchCourse = async () => {
  //       try {
  //         const response = await axios.get(`/api/courses/${courseId}`); // Replace with your backend endpoint
  //         setCourse(response.data);
  //       } catch (error) {
  //         console.error("Error fetching course:", error);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchCourse();
  //   }, [courseId]);

  //   if (loading) {
  //     return (
  //       <Container
  //         sx={{
  //           display: "flex",
  //           justifyContent: "center",
  //           alignItems: "center",
  //           height: "100vh",
  //         }}
  //       >
  //         <CircularProgress />
  //       </Container>
  //     );
  //   }

  if (!course) {
    return (
      <Container sx={{ textAlign: "center", marginTop: 4 }}>
        <Typography variant="h5">Course not found</Typography>
        <MainButton title={"Go Back"} />
      </Container>
    );
  }

  return (
    <Container sx={{ marginTop: 4 }}>
      <Typography variant="h4" textAlign={"center"} margin={"2rem"}>
        Course Details
      </Typography>
      <Card sx={{ maxWidth: 800, margin: "auto", padding: "2rem" }}>
        {course?.attachmet?.url && (
          <CardMedia
            component="img"
            height="300"
            image={course?.attachmet?.url} // Adjust path based on backend response
            alt={course.title}
          />
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {course?.title}
          </Typography>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            Subjects
          </Typography>
          <Typography variant="body1" paragraph>
            {course.subjects}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Description:
          </Typography>
          <Typography variant="body1" paragraph>
            {course.description}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Topics:
          </Typography>
          <Typography variant="body1" paragraph>
            {course?.topic}
          </Typography>
          {/* <Grid container spacing={1}>
            {course?.topics.map((topic, index) => (
              <Grid item key={index}>
                <Chip label={topic} color="primary" />
              </Grid>
            ))}
          </Grid> */}
        </CardContent>
        <MainButton title={"Go Back"} url={"/courses"} />
      </Card>
    </Container>
  );
};

export default CourseDetails;
