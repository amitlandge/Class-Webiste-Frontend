import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
} from "@mui/material";

// Sample data for teachers
const teachers = [
  {
    name: "Ms. Sonal Landge",
    subject: "Mathematics",
    bio: "Sonal has over 10 years of experience in teaching Algebra, Trigonometry, and Calculus.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Mr. Sumit Landge",
    subject: "Science",
    bio: "Sumit specializes in Physics and Chemistry, inspiring students through practical experiments.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Ms.Komal Tikone",
    subject: "Social Studies",
    bio: "Komal focuses on History and Political Science, making complex concepts easy to understand.",
    image: "https://via.placeholder.com/150",
  },
  {
    name: "Ms. Priya Singh",
    subject: "English",
    bio: "Priya has a passion for literature and language, helping students excel in writing and grammar.",
    image: "https://via.placeholder.com/150",
  },
];

const Teachers = () => {
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

      <Grid container spacing={4}>
        {teachers.map((teacher, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card elevation={3}>
              <CardMedia
                component="img"
                height="150"
                image={teacher.image}
                alt={`${teacher.name} photo`}
              />
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {teacher.name}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {teacher.subject}
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
