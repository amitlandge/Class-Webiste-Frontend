// src/components/VerticalNavbar.js

import { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  Collapse,
  ListItemButton,
  ListItem,
} from "@mui/material";
import {
  Home,
  School,
  Info,
  ExpandMore,
  ExpandLess,
  BackHand,
  ArrowRight,
  GroupAdd,
  AccountCircle,
  AdminPanelSettings,
  MoreVert,
  Collections,
  ThumbUp,
  RecordVoiceOver,
  Send,
  Book,
  RecordVoiceOverRounded,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setSideMenu } from "../redux/reducers/misc";
import { isNotAuthenticated } from "../redux/reducers/auth";

import axios from "axios";
import { server } from "../constants/server";
import { useEnroll } from "../hooks/useUserData";

const Navbar = () => {
  const { isLogin, user } = useSelector((state) => state.auth);
  const { enrollDetails } = useSelector((state) => state.enroll);
  const navigate = useNavigate();
  const { getInitialData } = useEnroll();

  const [openMoreLinks, setOpenMoreLinks] = useState(false);
  const dispatch = useDispatch();
  const handleMoreLinksToggle = () => {
    setOpenMoreLinks(!openMoreLinks);
  };
  const oncloseMenubar = () => {
    dispatch(setSideMenu(false));
  };
  const logoutHandler = async () => {
    const res = await axios.get(`${server}/api/v1/user/logout`, {
      withCredentials: true,
    });
    if (res.status === 200) {
      dispatch(isNotAuthenticated());
      navigate("/login");
      oncloseMenubar();
    }
  };
  useEffect(() => {
    getInitialData();
  }, []);
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        flexShrink: 0,

        [`& .MuiDrawer-paper`]: { width: 250, boxSizing: "border-box" },
      }}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <Link to={"/home"} onClick={oncloseMenubar}>
            Home
          </Link>
        </ListItem>
        {isLogin && (
          <>
            <ListItemButton>
              <ListItemIcon>
                <School />
              </ListItemIcon>

              <Link to={"/enroll"} onClick={oncloseMenubar}>
                Enroll
              </Link>
            </ListItemButton>
            {enrollDetails && enrollDetails?.request === "Accepted" && (
              <ListItemButton>
                <ListItemIcon>
                  <GroupAdd />
                </ListItemIcon>

                <Link to={"/qAnda"} onClick={oncloseMenubar}>
                  Student Portal
                </Link>
              </ListItemButton>
            )}
            <ListItemButton>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>

              <Link to={"/profile"} onClick={oncloseMenubar}>
                Profile
              </Link>
            </ListItemButton>
            {enrollDetails && enrollDetails?.request === "Accepted" && (
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircle />
                </ListItemIcon>

                <Link to={"/attendance"} onClick={oncloseMenubar}>
                  Attendance
                </Link>
              </ListItemButton>
            )}
            {enrollDetails && enrollDetails?.request === "Accepted" && (
              <ListItemButton>
                <ListItemIcon>
                  <RecordVoiceOverRounded />
                </ListItemIcon>

                <Link to={"/ask"} onClick={oncloseMenubar}>
                  Ask Your Doubt
                </Link>
              </ListItemButton>
            )}
            {user?.role === "ADMIN" && (
              <ListItemButton>
                <ListItemIcon>
                  <AdminPanelSettings />
                </ListItemIcon>

                <Link to={"/admin/dashboard"} onClick={oncloseMenubar}>
                  Admin
                </Link>
              </ListItemButton>
            )}
          </>
        )}
        <ListItemButton>
          <ListItemIcon>
            <Book />
          </ListItemIcon>
          <Link to={"/courses"} onClick={oncloseMenubar}>
            Courses
          </Link>
        </ListItemButton>

        <ListItemButton onClick={handleMoreLinksToggle}>
          <ListItemIcon>
            <MoreVert />
          </ListItemIcon>
          <ListItemText primary="More" />
          {openMoreLinks ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={openMoreLinks} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <Collections />
              </ListItemIcon>

              <Link to={"/gallery"} onClick={oncloseMenubar}>
                Gallery
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <ThumbUp />
              </ListItemIcon>

              <Link to={"/success"} onClick={oncloseMenubar}>
                Success Stories
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <RecordVoiceOver />
              </ListItemIcon>

              <Link to={"/teachers"} onClick={oncloseMenubar}>
                Teachers
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>

              <Link to={"/about"} onClick={oncloseMenubar}>
                About
              </Link>
            </ListItemButton>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <Send />
              </ListItemIcon>

              <Link to={"/contact"} onClick={oncloseMenubar}>
                {" "}
                Contact
              </Link>
            </ListItemButton>
          </List>
        </Collapse>

        {isLogin ? (
          <ListItemButton>
            <ListItemIcon>
              <BackHand />
            </ListItemIcon>
            <Link onClick={logoutHandler}>Logout</Link>
          </ListItemButton>
        ) : (
          <ListItemButton>
            <ListItemIcon>
              <ArrowRight />
            </ListItemIcon>

            <Link to={"/login"} onClick={oncloseMenubar}>
              Login
            </Link>
          </ListItemButton>
        )}
      </List>
    </Drawer>
  );
};

export default Navbar;
