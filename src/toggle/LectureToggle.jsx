import {
  Dialog,
  DialogContent,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";
import { useState } from "react";

const LectureToggle = (prop) => {
  const selectedLecture = prop.selectedLecture;
  console.log(selectedLecture);
  const [selectedVideo, setSelectedVideo] = useState(
    selectedLecture.attachments[0].url
  );
  console.log(selectedLecture);
  console.log(selectedVideo);

  return (
    <Dialog open={prop.open} onClose={prop.handleClose} maxWidth="md" fullWidth>
      <DialogContent>
        <IconButton
          aria-label="close"
          onClick={prop.handleClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <GridCloseIcon />
        </IconButton>
        {selectedLecture && (
          <>
            <Typography variant="h5" gutterBottom>
              {selectedLecture.title} - {selectedLecture.subject}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <List>
                  {selectedLecture.attachments.map((video, index) => (
                    <ListItem key={index} disablePadding>
                      <ListItemButton
                        onClick={() => setSelectedVideo(video.url)}
                        selected={selectedVideo === video.url}
                      >
                        <ListItemText
                          primary={`${selectedLecture.title}-${index + 1}`}
                        />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Grid>
              <Grid item xs={12} md={8}>
                <video controls width="100%" key={selectedVideo}>
                  <source src={selectedVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </Grid>
            </Grid>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LectureToggle;
