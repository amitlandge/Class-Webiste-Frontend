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

const Courses = () => {
  const [data] = useGetData("api/v1/course/getAllCourses");

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
        {data?.courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                borderRadius: 4,
                boxShadow: 5,
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={course.attachment?.url}
                alt={`${course.grade} image`}
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
                <MainButton
                  title={"View Details"}
                  url={`/course/details/${course._id}`}
                >
                  View Details
                </MainButton>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Courses;
