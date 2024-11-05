import { Box, Typography } from "@mui/material";

import "./Style.css";

import CustomButton from "../../UI/Button";
import { useSelector } from "react-redux";
const Hero = () => {
  const { isLogin } = useSelector((state) => state.auth);
  return (
    <Box className="hero-section">
      <Typography
        sx={{
          width: "35%",
          fontSize: "2rem",
          textShadow: "0px 1px 2px black",
          paddingBottom: "1rem",
          borderBottom: "1px solid white",
          fontWeight: "800",
          letterSpacing: "1px",
        }}
        variant="h3"
      >
        Yashashwi
      </Typography>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          fontSize: "2rem",
          wordSpacing: "5px",
          width: "60%",
        }}
      >
        Expert Guidance for Academic Success and Beyond...
      </Typography>
      <CustomButton
        title={isLogin ? "Enroll Now" : "Sign up Now"}
        redirect={isLogin ? "/enroll" : "/login"}
      />
    </Box>
  );
};

export default Hero;
