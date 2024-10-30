import { Box, Drawer, IconButton, Stack } from "@mui/material";
import Navbar from "./Navbar";
import { Menu } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setSideMenu } from "../redux/reducers/misc";

const SideMenu = () => {
  const { sideMenu } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const sideMenuOpen = () => {
    dispatch(setSideMenu(true));
  };
  const oncloseHandler = () => {
    dispatch(setSideMenu(false));
  };
  return (
    <Box>
      <IconButton
        sx={{
          position: "fixed",
          top: "2rem",
          left: "2rem",
          background: "gray",
          color: "white",
          ":hover": {
            background: "gray",
            color: "white",
          },
          zIndex: 1000,
        }}
        onClick={sideMenuOpen}
      >
        <Menu />
      </IconButton>
      <Drawer
        open={sideMenu}
        onClose={oncloseHandler}
        sx={{
          width: "240",
          height: "100%",
        }}
      >
        <Navbar />
      </Drawer>
    </Box>
  );
};

export default SideMenu;
