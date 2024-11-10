import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const MainButton = (prop) => {
  const color = prop.bgcolor || "rgb(40, 44, 52)";
  return (
    <Button
      sx={{
        background: color,
        color: "white",
        borderRadius: 0,
        ":hover": {
          background: color,
          color: "white",
        },
      }}
      onClick={prop.onclick}
    >
      <Link to={prop?.url}>{prop.title}</Link>
    </Button>
  );
};

export default MainButton;
