import { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  Dialog,
  DialogContent,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { dummyImages } from "../Dummy/dummyImages";

const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Class Gallery
      </Typography>
      <Grid container spacing={3}>
        {dummyImages.map((image) => (
          <Grid item xs={12} sm={6} md={4} key={image.id}>
            <Card
              onClick={() => handleOpen(image)}
              style={{ cursor: "pointer" }}
            >
              <CardMedia
                component="img"
                height="200"
                image={image.img}
                alt={image.title}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for Image Preview */}
      <Dialog open={open} onClose={handleClose} maxWidth="md">
        <DialogContent style={{ position: "relative" }}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            style={{ position: "absolute", top: 10, right: 10 }}
          >
            <CloseIcon />
          </IconButton>
          {selectedImage && (
            <>
              <img
                src={selectedImage.img}
                alt={selectedImage.title}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
              <Typography
                variant="h6"
                align="center"
                style={{ marginTop: "10px" }}
              >
                {selectedImage.title}
              </Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Gallery;
