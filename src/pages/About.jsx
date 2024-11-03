
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,

  Box,
} from "@mui/material";

const About = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          About Us
        </Typography>
        <hr style={{ marginBottom: "2rem" }}></hr>

        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          paragraph
        >
          Welcome to <strong>Yashashwi</strong>, your one-stop platform for
          comprehensive education and learning for students from 5th to 10th
          grade. Our goal is to create an engaging, interactive, and supportive
          environment where students can enhance their knowledge and excel in
          their studies.
        </Typography>
      </Box>

      <Grid container spacing={4}>
     
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Our Mission
              </Typography>
              <Typography variant="body2" color="textSecondary">
                At <strong>Yashashwi</strong>, we are committed to delivering
                high-quality education that caters to each student &apos s
                learning needs. We aim to provide a dynamic curriculum,
                encourage critical thinking, and create a supportive community.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Why Choose Us?
              </Typography>
              <Typography variant="body2" color="textSecondary">
                - Grade-specific learning content for 5th to 10th grades.
                <br />
                - Interactive resources like quizzes, video tutorials, and
                real-time doubt-clearing sessions.
                <br />
                - Project-based learning and hands-on activities.
                <br />- Expert tutors and continuous progress evaluation.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Our Approach
              </Typography>
              <Typography variant="body2" color="textSecondary">
                We blend traditional learning methods with modern technology,
                providing a user-friendly platform where students can ask
                questions, access study materials, and collaborate with their
                peers in a supportive environment.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        
        <Grid item xs={12} md={6}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Our Commitment
              </Typography>
              <Typography variant="body2" color="textSecondary">
                We are dedicated to supporting each student &apos s academic
                growth with the best educational resources and continuously
                updated content, ensuring students stay ahead in their studies.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

   
    </Container>
  );
};

export default About;
