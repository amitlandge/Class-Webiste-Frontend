import { TaskAlt } from "@mui/icons-material";
import { Paper, Typography } from "@mui/material";

const Offer = () => {
  return (
    <Paper
      sx={{
        width: "85%",
        padding: "2rem",

        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        borderRadius: "1rem",
        margin: "0% auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
        }}
      >
        What We Offer
      </Typography>
      <ul
        style={{
          marginLeft: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          listStyle: "none",
        }}
        className="offerList"
      >
        <div style={{ display: "flex", gap: "1rem" }}>
          <TaskAlt />
          <li>
            We specialize in teaching essential subjects such as Mathematics,
            Science, English, and Social Studies. Our expert instructors ensure
            that every concept is understood in-depth.
          </li>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <TaskAlt />
          <li>
            Each student’s learning path is customized based on their strengths
            and areas for improvement. With small class sizes, we ensure that
            every child receives the individual attention they need to succeed.
          </li>
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <TaskAlt />
          <li>
            We believe in making learning enjoyable through interactive
            discussions, activities, and modern teaching tools that help
            students grasp concepts better.
          </li>
        </div>
      </ul>
    </Paper>
  );
};

export default Offer;
