import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Icon,
} from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import PeopleIcon from "@mui/icons-material/People";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

const WhyChoose = () => {
  const features = [
    {
      icon: <SchoolIcon fontSize="large" color="#454141" />,
      title: "Expert Educators",
      description:
        "Learn from highly experienced teachers who are passionate about teaching and dedicated to your success.",
    },
    {
      icon: <PeopleIcon fontSize="large" color="#454141" />,
      title: "Personalized Attention",
      description:
        "Small class sizes ensure every student gets individual attention and customized learning support.",
    },
    {
      icon: <LocalLibraryIcon fontSize="large" color="#454141" />,
      title: "Comprehensive Resources",
      description:
        "Access a wide range of study materials, practice tests, and interactive resources to enhance learning.",
    },
  ];

  return (
    <Box
      id="why-choose-us"
      sx={{
        bgcolor: "",
        py: 8,
      }}
    >
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Why Choose Us
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 6, color: "text.secondary", maxWidth: "700px", mx: "auto" }}
        >
          At <strong>Yashashwi</strong>, we strive to provide the best
          educational experience for our students, ensuring they achieve
          excellence in their academic journey.
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  textAlign: "center",
                  p: 3,
                  boxShadow: 1,
                  borderRadius: 0,
                }}
              >
                <CardContent>
                  <Icon
                    sx={{
                      mb: 2,
                      width: "5rem",
                      height: "5rem",
                      fontSize: "5rem",
                    }}
                  >
                    {feature.icon}
                  </Icon>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default WhyChoose;
