import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const SubmitButton = (prop) => {
  const color = prop.bgcolor || "rgb(40, 44, 52)";
  const title = prop.title || "Submit";

  return (
    <Button
      type="submit"
      sx={{
        background: color,
        color: "white",
        borderRadius: 0,
        ":hover": {
          background: color,
          color: "white",
        },
      }}
    >
      {prop.url ? (
        <Link
          to={prop.url}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          {title}
        </Link>
      ) : (
        title
      )}
    </Button>
  );
};

export default SubmitButton;
