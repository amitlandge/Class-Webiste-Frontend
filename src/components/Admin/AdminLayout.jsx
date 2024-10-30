import { Grid, IconButton, Menu } from "@mui/material";
import Sidebar from "../Admin/Sidebar";

const AdminLayout = (prop) => {
  const { children } = prop;
  const menuIcon = (
    <>
      <IconButton
        sx={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
        }}
      >
        <Menu />
      </IconButton>
    </>
  );
  return (
    <div
      style={{
        position: "relative",
      }}
    >
      <Grid container height={"auto"}>
        <Grid
          item
          lg={12}
          md={12}
          sm={12}
          sx={{
            display: {
              // xs: "none",
              sm: "block",
            },
          }}
        >
          <Sidebar />
        </Grid>
        <Grid item lg={12} padding={"2%"}>
          {children}
        </Grid>
      </Grid>
      {menuIcon}
    </div>
  );
};

export default AdminLayout;
