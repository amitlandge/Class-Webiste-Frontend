import { Box, Typography } from "@mui/material";

import "./Style.css";

import CustomButton from "../../UI/Button";
import { useSelector } from "react-redux";
const Hero = () => {
  const { isLogin } = useSelector((state) => state.auth);
  return (
    <Box className="hero-section">
      <h1
        style={{
          width: "30%",
          fontSize: "1.7rem",
          paddingBottom: "1rem",
          borderBottom: "1px solid white",

          textShadow: "0px 2px 3px black",
        }}
      >
        Yashashwi
      </h1>
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
