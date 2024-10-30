import { Grid, Paper } from "@mui/material";
import Offer from "./Offer";

const Introduction = () => {
  return (
    <Grid container>
      {/* <Grid item xs={4}>
        <Paper
          elevation={2}
          sx={{
            width: "50%",
            margin: "0 auto",
            padding: "2rem",
            textTransform: "uppercase",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            borderRadius: "1rem",
          }}
        >
          <h4
            style={{
              fontSize: "1.5rem",
            }}
          >
            Subjects
          </h4>

          <ul
            style={{
              marginLeft: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
              listStyle: "square",
            }}
          >
            <li>Mathematics</li>
            <li>Science</li>
            <li>English</li>
            <li>Social Studies</li>
            <li>History</li>
          </ul>
        </Paper>
      </Grid> */}
      <Grid xs={12}>
        <Offer />
      </Grid>
    </Grid>
  );
};

export default Introduction;
