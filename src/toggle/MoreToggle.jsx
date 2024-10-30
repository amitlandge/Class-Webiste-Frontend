import { Menu, MenuItem, MenuList } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import { setMoreToggle, setSideMenu } from "../redux/reducers/misc";

const MoreToggle = (prop) => {
  const dispatch = useDispatch();
  const { moreToggle } = useSelector((state) => state.misc);
  const closeMoreToggle = () => {
    dispatch(setMoreToggle(false));
  };
  const closeMenuOrMore = () => {
    dispatch(setMoreToggle(false));
    dispatch(setSideMenu(false));
  };
  console.log(prop.anchorEl);

  return (
    <>
      <Menu
        anchorEl={prop.anchorEl}
        open={moreToggle}
        onClose={closeMoreToggle}
        sx={{
          marginLeft: "8%",
        }}
      >
        <MenuList>
          <MenuItem onClick={closeMenuOrMore}>
            <Link to="/courses">Courses</Link>
          </MenuItem>
          <MenuItem onClick={closeMenuOrMore}>
            <Link to="/success">Success Stories</Link>
          </MenuItem>
          <MenuItem onClick={closeMenuOrMore}>
            <Link to="/gallery">Gallery</Link>
          </MenuItem>
          <MenuItem onClick={closeMenuOrMore}>
            <Link to="/about">About Us</Link>
          </MenuItem>
          <MenuItem onClick={closeMenuOrMore}>
            <Link to="/contact">Contact Us</Link>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default MoreToggle;
