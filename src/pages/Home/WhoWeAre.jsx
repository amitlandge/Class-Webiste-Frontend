import { Box, Container, Grid, Typography } from "@mui/material";

const WhoWeAre = () => {
  return (
    <Box>
      <Container>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src="https://res.cloudinary.com/dow92cdi4/image/upload/v1730174957/images/trjhxmlzwreqm9te0rhd.jpg" // Replace with your image URL
              alt="Classroom"
              sx={{
                width: "100%",

                // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" component="h2" gutterBottom>
              Who We Are
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Welcome to <strong>Yashashwi</strong>, where education meets
              excellence. We are a passionate team dedicated to providing
              high-quality learning experiences for students from{" "}
              <strong>5th to 10th grade</strong>. With a focus on nurturing
              young minds, we aim to empower every student to achieve their
              academic and personal goals.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              At <strong>Yashashwi</strong>, we believe in fostering a positive
              learning environment through personalized attention, engaging
              teaching methods, and comprehensive study resources. Our mission
              is to make education accessible, enjoyable, and impactful for
              every student.
            </Typography>
            <Typography variant="body1">
              Join us to unlock your full potential and become a part of our
              success story!
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default WhoWeAre;
