import { Box, Grid } from "@mui/material";
import StudentPortalMenu from "./StudentPortalMenu";

const StudentPortal = (prop) => {
  return (
    <Box
      sx={{
        marginTop: "1rem",
        // background: "skyblue",
      }}
    >
      <Grid container spacing={3} height={"85vh"}>
        <Grid item xs={3}>
          <StudentPortalMenu />
        </Grid>
        <Grid item xs={9}>
          {prop.children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentPortal;
