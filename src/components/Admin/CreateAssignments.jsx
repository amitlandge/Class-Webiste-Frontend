import styled from "@emotion/styled";
import { Cloud } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import Spinner from "../../UI/Spinner";
import { useCourseName } from "../../hooks/useCourseName";
import AdminLayout from "./AdminLayout";
import { Controller, useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { assignmentValidation } from "../../utils/validationSchema.js";
import SubmitButton from "../../UI/SubmitButton.jsx";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { postDataHandler } from "../../utils/postData.js";
import { toast } from "react-toastify";

const CreateAssignments = () => {
  const [file, setFile] = useState([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(assignmentValidation),
  });
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

  const navigate = useNavigate();
  const [data] = useCourseName();
  const { mutate, isPending } = useMutation({
    mutationFn: postDataHandler,
    onSuccess: () => {
      toast("Create Assignment Successfully");
      navigate("/admin/assignment");
    },
    onError: (error) => {
      toast.error(error?.info?.message);
    },
  });
  const addAssignmentsHandler = async (assignData) => {
    console.log(assignData);

    let formData = new FormData();
    formData.append("title", assignData.title);
    formData.append("note", assignData.note);
    formData.append("course", assignData.course);

    Array.from(file).forEach((file) => {
      console.log(file);
      formData.append("images", file);
    });
    mutate({
      url: "api/v1/course/create-assignment",
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
          <Typography variant="h4" textAlign={"center"}>
            Create Assignment
          </Typography>

          <Box
            width={"70vw"}
            component={"form"}
            onSubmit={handleSubmit(addAssignmentsHandler)}
            encType="multipart/form-data"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "2rem",
              margin: "2rem auto",
            }}
          >
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.title}
                  helperText={errors.title?.message}
                  fullWidth
                  id="title"
                  label="Title"
                  variant="outlined"
                  type="text"
                />
              )}
            />

            <Controller
              name="note"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  error={!!errors.note}
                  helperText={errors.note?.message}
                  fullWidth
                  id="note"
                  label="Note"
                  variant="outlined"
                  type="text"
                />
              )}
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Course</InputLabel>
              <Controller
                name="course"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    error={!!errors.course}
                    labelId="demo-simple-select-label"
                    id="course"
                    label="Course"
                  >
                    {data?.courses?.map((c, index) => {
                      return (
                        <MenuItem key={index} value={c}>
                          {c}
                        </MenuItem>
                      );
                    })}
                  </Select>
                )}
              />
            </FormControl>
            <Box>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<Cloud />}
              >
                Upload files
                <VisuallyHiddenInput
                  onChange={(e) => {
                    setFile(e.target.files);
                  }}
                  error={!!errors.file}
                  type="file"
                  multiple
                  id="file"
                />
              </Button>
            </Box>
            {file?.length >= 1 ? (
              <Typography>{file?.length} File Added</Typography>
            ) : (
              <Typography color={"red"}>Please Add File</Typography>
            )}

            <SubmitButton title={"+ Add Assignment"} />
          </Box>
        </AdminLayout>
      )}
    </>
  );
};

export default CreateAssignments;
