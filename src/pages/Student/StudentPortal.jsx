import { Box, Grid } from "@mui/material";
import StudentPortalMenu from "./StudentPortalMenu";

const StudentPortal = (prop) => {
  return (
    <Box
      sx={{
        marginTop: "1rem",
      
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <StudentPortalMenu />
        </Grid>
        <Grid item xs={12}>
          {prop.children}
        </Grid>
      </Grid>
    </Box>
  );
};

export default StudentPortal;
