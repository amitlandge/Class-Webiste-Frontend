import { Box, Typography } from "@mui/material";

function CountSection() {
  return (
    <Box
      sx={{
        width: "85%",
        margin: "0% auto",
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        gap: "2rem",
      }}
    >
      <Box className="box_container">
        <Typography
          variant="h2"
          sx={{
            fontWeight: "700",
            fontSize: "4rem",
          }}
        >
          130+
        </Typography>
        <Typography variant="body" sx={{ fontSize: "1.2rem" }}>
          Students
        </Typography>
      </Box>
      <Box className="box_container">
        <Typography
          variant="h2"
          sx={{
            fontWeight: "700",
            fontSize: "4rem",
          }}
        >
          50+
        </Typography>
        <Typography variant="body" sx={{ fontSize: "1.2rem" }}>
          Enrolled
        </Typography>
      </Box>
      <Box className="box_container">
        <Typography
          variant="h2"
          sx={{
            fontWeight: "700",
            fontSize: "4rem",
          }}
        >
          6+
        </Typography>
        <Typography variant="body" sx={{ fontSize: "1.2rem" }}>
          Subjects
        </Typography>
      </Box>
    </Box>
  );
}

export default CountSection;
