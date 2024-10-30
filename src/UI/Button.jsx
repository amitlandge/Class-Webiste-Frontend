import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CustomButton = (prop) => {
  const navigate = useNavigate();
  return (
    <Button
      sx={{
        background: "none",
        color: "white",
        padding: "3px 1.2rem",
        border: "1px solid white",
        borderRadius: "1rem",
      }}
      onClick={() => {
        navigate(prop.redirect);
      }}
    >
      {prop.title}
    </Button>
  );
};

export default CustomButton;
