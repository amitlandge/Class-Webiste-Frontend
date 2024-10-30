import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";

const Contact = () => {
  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom>
          Contact Us
        </Typography>
        <hr style={{ marginBottom: "2rem" }}></hr>
        <Typography
          variant="body1"
          align="center"
          color="textSecondary"
          paragraph
        >
          We’d love to hear from you! If you have any questions, suggestions, or
          concerns, feel free to reach out using the form below.
        </Typography>
      </Box>

      {/* Contact Form */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Your Name"
            variant="outlined"
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            required
            label="Email Address"
            variant="outlined"
            margin="normal"
            type="email"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Subject"
            variant="outlined"
            margin="normal"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            label="Your Message"
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
          />
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button variant="contained" color="primary" size="large">
          Send Message
        </Button>
      </Box>

      {/* Contact Details */}
      <Box sx={{ textAlign: "center", mt: 5 }}>
        <Typography variant="h6" component="p" gutterBottom>
          Or reach us at:
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Email: contact@yourwebsite.com
          <br />
          Phone: +91 12345 67890
          <br />
          Address: 123, Your Street, Your City, 123456
        </Typography>
      </Box>
    </Container>
  );
};

export default Contact;
