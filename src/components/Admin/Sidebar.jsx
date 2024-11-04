import {
  ArrowBack,
  CastForEducation,
  ChatBubble,
  Dashboard,
  Groups,
  Message,
} from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
const SidebarLinks = [
  {
    url: "/admin/dashboard",
    name: "Dashboard",
    icon: <Dashboard />,
  },
  {
    url: "/admin/users",
    name: "Users",
    icon: <Groups />,
  },
  {
    url: "/admin/enroll",
    name: "Enroll",
    icon: <ChatBubble />,
  },
  {
    url: "/admin/assignment",
    name: "Assignment",
    icon: <Message />,
  },
  {
    url: "/admin/courses",
    name: "Courses",
    icon: <CastForEducation />,
  },
  {
    url: "/admin/teachers",
    name: "Teachers",
    icon: <CastForEducation />,
  },
];

const Sidebar = () => {
  const location = useLocation();

  const navigate = useNavigate();
  return (
    <div>
      <Stack direction={"column"} spacing={"2rem"} padding={"2rem"}>
        <Typography
          variant="h5"
          sx={{
            width: "100%",
            fontSize: "2rem",
            letterSpacing: "4px",

            color: "gray",
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          Yashaswi
        </Typography>
        <Stack
          sx={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {SidebarLinks &&
            SidebarLinks.map((item) => {
              return (
                <Link
                  to={item.url}
                  key={item.name}
                  style={
                    location.pathname === item.url
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
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}

          <Button
            variant="text"
            sx={{ color: "black", padding: "1rem 2rem" }}
            startIcon={<ArrowBack />}
            onClick={() => {
              navigate("/home");
            }}
          >
            Go Back
          </Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default Sidebar;
