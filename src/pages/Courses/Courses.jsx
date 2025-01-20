import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";

import MainButton from "../../UI/MainButton";

import { fetchData } from "../../utils/fetchData.js";
import { toast } from "react-toastify";

const Courses = () => {
  const { data } = useQuery({
    queryKey: ["allCourses", "api/v1/course/getAllCourses"], // Unique key for caching
    queryFn: fetchData,
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });
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
        {data?.courses?.map((course, index) => (
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
        ))}
      </Grid>
    </Container>
  );
};

export default Courses;
