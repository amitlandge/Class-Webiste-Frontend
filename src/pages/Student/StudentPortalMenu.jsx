import { Box, MenuList } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const StudentPortalMenu = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <Box
      sx={{
        display: "flex",

        boxShadow: "0px 10px 10px rgba(0, 0, 0, 0.1)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MenuList
        sx={{
          display: "flex",
          // flexDirection: "column",
          gap: "2rem",
        }}
      >
        <Link
          to={"/qAnda"}
          style={
            location.pathname === "/qAnda"
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
          Q And A Portal
        </Link>

        <Link
          to={"/assignments"}
          style={
            location.pathname === "/assignments"
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
          Assignments
        </Link>
      </MenuList>
    </Box>
  );
};

export default StudentPortalMenu;
