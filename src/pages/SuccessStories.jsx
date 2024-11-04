import { Avatar, Box, Stack, Typography } from "@mui/material";

import "./Success.css";
import { success } from "../utils/successStories";
const SuccessStories = () => {
  return (
    <Box>
      <Typography variant="h3" margin={"2% auto"} textAlign={"center"}>
        Success Stories
      </Typography>

      <Stack
        className={"successContainer"}
        sx={{
          width: "100%",
          marginTop: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        {success.map((story) => {
          return (
            <Box
              className={"successCard"}
              key={story._id}
              sx={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "rgb(69,65,65)",
                padding: "2rem",
                color: "white",
                width: "60%",
                margin: "0 auto",
                borderRadius: "10px",
                boxShadow: "2px 3px 4px solid gray",
                gap: "1rem",
              }}
            >
              <Avatar src=""></Avatar>
              <em>{story.description}</em>
              <b>
                {story.name}, {story.course} Student
              </b>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default SuccessStories;
