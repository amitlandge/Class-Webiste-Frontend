import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Divider,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#454141",
        color: "white",
        py: 6,
        mt: 8,
      }}
    >
      <Container>
        <Grid container spacing={4}>
          {/* Column 1 - Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              <Link to={"/home"} color="inherit">
                Home
              </Link>

              <li>
                <Link
                  to={"/about"}
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to={"/courses"}
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  color="inherit"
                  sx={{ textDecoration: "none" }}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </Grid>

          {/* Column 2 - Contact Information */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2">
              Email:{" "}
              <Link href="mailto:amitlandge333@gmail.com" color="inherit">
                amitlandge333@gmail.com
              </Link>
            </Typography>
            <Typography variant="body2">Phone:8669369593</Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Box>
              <IconButton
                color="inherit"
                href="https://facebook.com"
                target="_blank"
              >
                <Facebook />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://twitter.com"
                target="_blank"
              >
                <Twitter />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://instagram.com"
                target="_blank"
              >
                <Instagram />
              </IconButton>
              <IconButton
                color="inherit"
                href="https://linkedin.com"
                target="_blank"
              >
                <LinkedIn />
              </IconButton>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, bgcolor: "white" }} />

        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Your Class Website. All Rights Reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
