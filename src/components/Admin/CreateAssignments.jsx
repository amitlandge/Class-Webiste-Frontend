import styled from "@emotion/styled";
import { Cloud } from "@mui/icons-material";
import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import MainButton from "../../UI/MainButton";
import { toast } from "react-toastify";
import { usePostUpdate } from "../../hooks/usePostUpdate";
import { useNavigate } from "react-router-dom";
import Spinner from "../../UI/Spinner";

const CreateAssignments = () => {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [grade, setGrade] = useState("");
  const [file, setFile] = useState([]);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  console.log(file);
  const [loader, putPostmethod] = usePostUpdate();
  const navigate = useNavigate();
  const addAssignmentsHandler = async () => {
    if (!title && !note && !grade && !file) {
      toast.error("Please Fill All Information");
      return;
    }
    console.log(file);
    let formData = new FormData();
    formData.append("title", title);
    formData.append("note", note);
    formData.append("grade", grade);

    file.forEach((file) => {
      formData.append("images", file);
    });
    const data = {
      method: "POST",
      url: "api/v1/course/create-assignment",
      payload: formData,
      message: "Create Assignment Successfully",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const response = await putPostmethod(data);
      console.log(response);
      if (response?.status === 200) {
        navigate("/admin/assignment");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <Container
          sx={{
            width: "70%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
            margin: "2rem auto",
          }}
        >
          <Typography variant="h4">Create Assignment</Typography>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Title"
            variant="outlined"
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            value={title}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="Note"
            variant="outlined"
            type="text"
            onChange={(e) => {
              setNote(e.target.value);
            }}
            value={note}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Grade</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={grade}
              label="Grade"
              onChange={(e) => {
                setGrade(e.target.value);
              }}
            >
              <MenuItem value={"5"}>5th</MenuItem>
              <MenuItem value={"6"}>6th</MenuItem>
              <MenuItem value={"7"}>7th</MenuItem>
              <MenuItem value={"8"}>8th</MenuItem>
              <MenuItem value={"9"}>9th</MenuItem>
              <MenuItem value={"10"}>10th</MenuItem>
            </Select>
          </FormControl>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<Cloud />}
          >
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => setFile(Array.from(event.target.files))}
              multiple
            />
          </Button>
          {file.length >= 1 && (
            <Typography>{file.length} Files Added</Typography>
          )}
          <MainButton
            title={"+ Add Assignment"}
            onclick={addAssignmentsHandler}
          />
        </Container>
      )}
    </>
  );
};

export default CreateAssignments;
