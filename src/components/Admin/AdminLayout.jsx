import { Grid, IconButton, Menu } from "@mui/material";
import Sidebar from "../Admin/Sidebar";
import Grid2 from "@mui/material/Unstable_Grid2";

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
      <Grid2
        container
        height={"auto"}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid2
          item
          lg={12}
          md={12}
          sm={12}
          sx={{
            display: {
              sm: "block",
            },
          }}
        >
          <Sidebar />
        </Grid2>
        <Grid2 item lg={12} md={12} sm={12} padding={"2%"}>
          {children}
        </Grid2>
      </Grid2>
      {menuIcon}
    </div>
  );
};

export default AdminLayout;
