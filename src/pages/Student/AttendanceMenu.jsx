import { Grid, MenuList } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useLocation } from "react-router-dom";

function AttendanceMenu(prop) {
  const location = useLocation();
  return (
    <Box
      sx={{
        marginTop: "1rem",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MenuList
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
            }}
          >
            <Link
              to={"/attendance"}
              style={
                location.pathname === "/attendance"
                  ? {
                      background: "gray",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "1rem 2rem",
                      borderRadius: "3rem",
                    }
                  : {
                      display: "flex",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "1rem 2rem",
                      borderRadius: "3rem",
                    }
              }
            >
              Attendance
            </Link>
            <Link
              to={"/view/attendance"}
              style={
                location.pathname === "/view/attendance"
                  ? {
                      background: "gray",
                      color: "white",
                      display: "flex",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "1rem 2rem",
                      borderRadius: "3rem",
                    }
                  : {
                      display: "flex",
                      justifyContent: "center",
                      gap: "0.5rem",
                      padding: "1rem 2rem",
                      borderRadius: "3rem",
                    }
              }
            >
              View Attendance
            </Link>
          </MenuList>
        </Grid>
        <Grid item xs={12}>
          {prop.children}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AttendanceMenu;
