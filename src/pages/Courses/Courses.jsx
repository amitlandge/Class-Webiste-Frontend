import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";

import { useGetData } from "../../hooks/useGetData";
import MainButton from "../../UI/MainButton";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../../redux/reducers/courses.js";

const Courses = () => {
  const [data] = useGetData("api/v1/course/getAllCourses");
  const { courses } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.courses) {
      dispatch(setCourses(data?.courses));
    }
  }, [data, dispatch]);
  return (
    <Container>
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Courses We Offer
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Explore our curriculum from 5th to 10th grade, designed to foster
          academic growth and personal development.
        </Typography>
      </Box>

      <Grid
        container
        spacing={8}
        justifyContent={"stretch"}
        alignItems={"stretch"}
      >
        {useMemo(() => {
          return courses?.map((course, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  borderRadius: 0,
                  boxShadow: 5,
                  alignItems: "stretch",
                  justifyContent: "space-between",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={course?.attachment?.url}
                  alt={`${course.course} image`}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h5" component="h2" gutterBottom>
                    {course.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {course.description}
                  </Typography>
                </CardContent>
                <MainButton
                  title={"View Details"}
                  url={`/course/details/${course._id}`}
                >
                  View Details
                </MainButton>
              </Card>
            </Grid>
          ));
        }, [courses])}
      </Grid>
    </Container>
  );
};

export default Courses;
