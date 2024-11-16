import React, { useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
} from "@mui/material";

import LectureToggle from "../../toggle/LectureToggle";
import { useDispatch, useSelector } from "react-redux";
import { setLectureOpen } from "../../redux/reducers/misc";
import MainButton from "../../UI/MainButton";
import { useGetData } from "../../hooks/useGetData";
import StudentPortal from "./StudentPortal";

const lectures = [
  {
    title: "Introduction to Algebra",
    subject: "Mathematics",
    videos: [
      { title: "Part 1", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { title: "Part 2", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
  {
    title: "Photosynthesis Explained",
    subject: "Biology",
    videos: [
      {
        title: "Full Lecture",
        url: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
    ],
  },
  {
    title: "World War II Overview",
    subject: "History",
    videos: [
      { title: "Part 1", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { title: "Part 2", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
      { title: "Summary", url: "https://www.w3schools.com/html/mov_bbb.mp4" },
    ],
  },
];

const Lectures = () => {
  const { enrollDetails } = useSelector((state) => state.enroll);

  const course = enrollDetails?.course;
  const [data] = useGetData(`api/v1/lecture/course?course=${course}`);
  console.log(data);
  const [selectedLecture, setSelectedLecture] = useState("");
  const { openLecture } = useSelector((state) => state.misc);
  const dispatch = useDispatch();
  const handleOpen = (lecture) => {
    setSelectedLecture(lecture);

    dispatch(setLectureOpen(true));
  };

  const handleClose = () => {
    dispatch(setLectureOpen(false));
    setSelectedLecture(null);
  };

  return (
    <StudentPortal>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          sx={{
            display: "flex",

            alignItems: "stretch",
          }}
        >
          {data?.lectures.map((lecture, index) => (
            <Grid
              item
              xs={12}
              sm={5}
              md={3}
              key={index}
              sx={{ display: "flex" }}
            >
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <CardMedia>
                  <video
                    width="100%"
                    controls={false}
                    muted
                    onClick={() => handleOpen(lecture)}
                  >
                    <source
                      src={lecture?.attachments[0].url}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </CardMedia>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {lecture.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Subject: {lecture.subject}
                  </Typography>
                </CardContent>
                <CardActions sx={{ alignSelf: "center" }}>
                  <MainButton
                    title={"Watch"}
                    onclick={() => {
                      handleOpen(lecture);
                    }}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Video Dialog */}
        {openLecture && (
          <LectureToggle
            handleClose={handleClose}
            open={openLecture}
            selectedLecture={selectedLecture}
          />
        )}
      </Container>
    </StudentPortal>
  );
};

export default Lectures;
