import { Container, Typography, TextField, Grid, Box } from "@mui/material";
import MainButton from "../UI/MainButton";
import { useState } from "react";
import { toast } from "react-toastify";

import { usePostUpdate } from "../hooks/usePostUpdate";
import Spinner from "../UI/Spinner";

const Contact = () => {
  const [loader, putPostMethod] = usePostUpdate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();
  const sendMessage = async () => {
    if (!name && !email && !subject && !message) {
      toast("Please Fill All Information");
      return;
    }
    const data = {
      method: "POST",
      url: "api/v1/user/createContact",
      payload: {
        subject,
        message,
        email,
        name,
      },
      message: "Send Message Successfully",
    };
    try {
      const res = await putPostMethod(data);
      if (res?.status === 200) {
        setEmail("", setName(""), setMessage(""), setSubject(""));
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
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
              We’d love to hear from you! If you have any questions,
              suggestions, or concerns, feel free to reach out using the form
              below.
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
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Subject"
                variant="outlined"
                margin="normal"
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                value={subject}
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
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Box sx={{ textAlign: "center", mt: 3 }}>
            <MainButton title={"Send Message"} onclick={sendMessage} />
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
      )}
    </>
  );
};

export default Contact;
