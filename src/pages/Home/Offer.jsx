import { Paper } from "@mui/material";

const Offer = () => {
  return (
    <Paper
      sx={{
        width: "85%",
        padding: "2rem",
        // textTransform: "uppercase",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        borderRadius: "1rem",
        margin: "0% auto",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          textTransform: "uppercase",
        }}
      >
        What we offer
      </h2>
      <ul
        style={{
          marginLeft: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.2rem",
          listStyle: "square",
        }}
        className="offerList"
      >
        <li>
          We specialize in teaching essential subjects such as Mathematics,
          Science, English, and Social Studies. Our expert instructors ensure
          that every concept is understood in-depth.
        </li>
        <li>
          Each student’s learning path is customized based on their strengths
          and areas for improvement. With small class sizes, we ensure that
          every child receives the individual attention they need to succeed.
        </li>
        <li>
          We believe in making learning enjoyable through interactive
          discussions, activities, and modern teaching tools that help students
          grasp concepts better.
        </li>
        {/* <li>Social Studies</li>
        <li>History</li> */}
      </ul>
    </Paper>
  );
};

export default Offer;
