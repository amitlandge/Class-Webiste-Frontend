import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const Offer = () => {
  const offerings = [
    {
      title: "Interactive Learning",
      description:
        "Engaging and interactive lessons designed to make learning enjoyable and effective for every student.",
      image:
        "https://res.cloudinary.com/dow92cdi4/image/upload/v1732653750/interactive_learning_jocjhw.jpg", // Replace with your image URL
    },
    {
      title: "Doubt Solving Sessions",
      description:
        "Get your doubts cleared with dedicated sessions focused on helping students understand complex concepts.",
      image:
        "https://res.cloudinary.com/dow92cdi4/image/upload/v1730121452/images/r6kg0pnzlxq2eyaxnisb.jpg", // Replace with your image URL
    },
    {
      title: "Regular Assessments",
      description:
        "Track your progress with regular tests and feedback to ensure continuous improvement.",
      image:
        "https://res.cloudinary.com/dow92cdi4/image/upload/v1730124782/images/xjjq4p8qu8lfcwohxdwm.jpg", // Replace with your image URL
    },
    {
      title: "Career Guidance",
      description:
        "Personalized career guidance to help students make informed decisions about their future paths.",
      image:
        "https://res.cloudinary.com/dow92cdi4/image/upload/v1732654431/carrier_nelmd5.jpg", // Replace with your image URL
    },
  ];

  return (
    <Box
      id="what-we-offer"
      sx={{
        py: 8,
      }}
    >
      <Container>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          What We Offer
        </Typography>
        <Typography
          variant="body1"
          align="center"
          sx={{ mb: 6, color: "text.secondary", maxWidth: "700px", mx: "auto" }}
        >
          Explore the wide range of services and features we provide to help our
          students excel in their academic journey.
        </Typography>
        <Grid container spacing={4}>
          {offerings.map((offer, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  boxShadow: 1,
                  borderRadius: 0,
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: { xs: "100%", sm: "150px" }, height: "auto" }}
                  image={offer.image}
                  alt={offer.title}
                />
                <CardContent>
                  <Typography variant="h6" component="h3" gutterBottom>
                    {offer.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {offer.description}
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

export default Offer;
