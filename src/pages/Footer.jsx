import { Box, Typography, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#282c34",
        color: "white",
        py: 4,
        px: 2,
        mt: 4,
      }}
    >
      <Grid container spacing={4} justifyContent="center">
        {/* About Section */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            About Us
          </Typography>
          <p>
            We provide quality education to students from 5th to 10th grade,
            helping them succeed in their exams and build a strong academic
            foundation.
          </p>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Quick Links
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Link to={"/"}>Home</Link>
            <Link>Courses</Link>
            <Link>About Us</Link>
            <Link>Contact Us</Link>
          </Box>
        </Grid>

        {/* Contact Information */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body2">
            Phone: 8669369593
            <br />
            Email: yashaswiClass@gmail.com
          </Typography>
        </Grid>

        {/* Social Media Links */}
        <Grid item xs={12} md={3}>
          <Typography variant="h6" gutterBottom>
            Follow Us
          </Typography>
          <IconButton
            href="https://facebook.com"
            target="_blank"
            color="inherit"
          >
            <Facebook />
          </IconButton>
          <IconButton
            href="https://twitter.com"
            target="_blank"
            color="inherit"
          >
            <Twitter />
          </IconButton>
          <IconButton
            href="https://instagram.com"
            target="_blank"
            color="inherit"
          >
            <Instagram />
          </IconButton>
        </Grid>
      </Grid>

      {/* Footer Bottom Section */}
      <Box mt={4} textAlign="center">
        <Typography variant="body2">
          &copy; {new Date().getFullYear()} Yashaswi Class.. All Rights
          Reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
