import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import { useGetData } from "../../hooks/useGetData";

const Teachers = () => {
  const [data] = useGetData("api/v1/teacher/getAllTeachers");
  return (
    <Container>
      <Box sx={{ my: 4, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Meet Our Teachers
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Our team of experienced teachers is dedicated to nurturing students
          and fostering a love for learning.
        </Typography>
      </Box>

      <Grid container justifyContent={"space-around"} spacing={"2rem"}>
        {data?.teachers.map((teacher, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} textAlign={"center"}>
            <Card elevation={3}>
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "2rem",
                }}
              >
                <Avatar
                  src={teacher?.avatar?.url}
                  sx={{ width: "7rem", height: "7rem" }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {teacher.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {teacher.subjects}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {teacher.bio}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Teachers;
