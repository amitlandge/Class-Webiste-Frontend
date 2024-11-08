import { Box, Typography } from "@mui/material";

const MainSection = () => {
  return (
    <Box className="main-section">
      <Typography
        variant="h5"
        sx={{
          fontWeight: "600",
        }}
      >
        Welcome to Yashasvi Class, Where Learning Meets Excellence!
      </Typography>
      <Typography variant="body1">
        We offer expert-guided classes for students from 5th to 10th grade,
        designed to help them master key subjects and succeed academically. With
        a focus on personalized learning, we ensure that every student receives
        the attention they need to excel in their studies.
      </Typography>
      <Typography variant="body1">
        Our classes cover a wide range of subjects, including Mathematics,
        Science, English, and Social Studies, providing students with a strong
        foundation for their academic journey. We believe in interactive
        learning, where students actively participate in discussions,
        problem-solving, and practice exercises to reinforce their
        understanding.
      </Typography>
    </Box>
  );
};

export default MainSection;
