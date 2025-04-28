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

import { toast } from "react-toastify";

import { useNavigate } from "react-router-dom";
import Spinner from "../../UI/Spinner";
import { useCourseName } from "../../hooks/useCourseName";
import AdminLayout from "./AdminLayout";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createLectureValidation } from "../../utils/validationSchema";
import SubmitButton from "../../UI/SubmitButton";
import { useMutation } from "@tanstack/react-query";
import { postDataHandler } from "../../utils/postData";

const CreateLecture = () => {
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
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createLectureValidation),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: postDataHandler,
    onSuccess: () => {
      toast("Create Lecture Successfully");
      navigate("/admin/lecture");
    },
    onError: (error) => {
      toast.error(error?.info?.message);
    },
  });

  const navigate = useNavigate();
  const [data] = useCourseName();
  const addAssignmentsHandler = async (lecData) => {
    let formData = new FormData();
    formData.append("title", lecData.title);
    formData.append("subject", lecData.subject);
    formData.append("course", lecData.course);

    file.forEach((file) => {
      formData.append("videos", file);
    });
    mutate({
      url: "api/v1/lecture/create-lecture",
      eventData: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };
  return (
    <>
      {isPending ? (
        <Spinner />
      ) : (
        <AdminLayout>
          <Typography variant="h4">Create Lecture</Typography>
          <Container
            component={"form"}
            onSubmit={handleSubmit(addAssignmentsHandler)}
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
            <Controller
              control={control}
              name="title"
              render={({ field }) => (
                <TextField
                  fullWidth
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  {...field}
                  label="Title"
                  variant="outlined"
                  type="text"
                />
              )}
            />
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <TextField
                  fullWidth
                  {...field}
                  error={!!errors.subjects}
                  helperText={errors.subjects?.message}
                  id="outlined-basic"
                  label="Subject"
                  variant="outlined"
                  type="text"
                />
              )}
            />
            <Controller
              name="course"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Course</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="Course"
                    {...field}
                    error={!!errors.course}
                    helperText={errors.course?.message}
                  >
                    {data?.courses.map((c, index) => {
                      return (
                        <MenuItem key={index} value={c}>
                          {c}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
            />

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
                accept="video/mp4"
              />
            </Button>
            {file.length >= 1 && (
              <Typography>{file.length} Video Added</Typography>
            )}
            <SubmitButton title={"Create Lecture"} />
          </Container>
        </AdminLayout>
      )}
    </>
  );
};

export default CreateLecture;
