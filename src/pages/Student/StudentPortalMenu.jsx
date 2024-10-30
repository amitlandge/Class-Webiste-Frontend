import { Box, MenuItem, MenuList } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const StudentPortalMenu = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MenuList
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <MenuItem
          sx={
            location.pathname === "/qAnda"
              ? {
                  background: "black",
                  color: "whitesmoke",
                  width: "max-content",
                  padding: "1rem",
                  borderRadius: "5px",
                  ":hover": {
                    color: "black",
                  },
                }
              : {
                  // background: "black",
                  color: "black",
                  width: "max-content",
                  padding: "1rem",
                  borderRadius: "5px",
                  ":hover": {
                    color: "black",
                  },
                }
          }
        >
          <Link to={"/qAnda"}>Q and A</Link>
        </MenuItem>
        <MenuItem
          sx={
            location.pathname === "/assignments"
              ? {
                  background: "black",
                  color: "whitesmoke",
                  width: "max-content",
                  padding: "1rem",
                  borderRadius: "5px",
                  ":hover": {
                    color: "black",
                  },
                }
              : {
                  // background: "black",
                  color: "black",
                  width: "max-content",
                  padding: "1rem",
                  borderRadius: "5px",
                  ":hover": {
                    color: "black",
                  },
                }
          }
        >
          <Link to={"/assignments"}>Assignments</Link>
        </MenuItem>
      </MenuList>
    </Box>
  );
};

export default StudentPortalMenu;
