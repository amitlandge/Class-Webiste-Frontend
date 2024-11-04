import { Container, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import MainButton from "../../UI/MainButton";

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", padding: "50px 0" }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <ErrorOutlineIcon style={{ fontSize: "100px", color: "#f44336" }} />
        <Typography variant="h3" color="textPrimary" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" color="textSecondary" gutterBottom>
          Oops! Page Not Found
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          The page you are looking for does not exist or has been moved.
        </Typography>
        <MainButton url={"/home"} title={"Go Back"} />
      </Box>
    </Container>
  );
};

export default NotFoundPage;
