import { useState } from "react";
import { Box, TextField, Typography, Grid } from "@mui/material";
import { usePostUpdate } from "../../hooks/usePostUpdate";
import { useNavigate } from "react-router-dom";
import MainButton from "../../UI/MainButton";
import AttendanceMenu from "./AttendanceMenu";
import Spinner from "../../UI/Spinner";

const Attendance = () => {
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Present");
  const [loader, putPostmethod] = usePostUpdate();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        method: "POST",
        url: "api/v1/attendance/create",
        payload: {
          date,
          status,
        },
        message: "Apply Attendance Successfully",
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await putPostmethod(data);
      if (response?.status === 200) {
        navigate("/view/attendance");
      }
      setDate("");
      setStatus("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <AttendanceMenu>
          <Box sx={{ p: 4 }}>
            <Typography variant="h4" textAlign="center" gutterBottom>
              Student Attendance
            </Typography>
            <form>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    type="date"
                    variant="outlined"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={8}>
                  <TextField
                    select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    SelectProps={{
                      native: true,
                    }}
                    fullWidth
                    variant="outlined"
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                  </TextField>
                </Grid>
                <Grid item xs={12} textAlign="center">
                  <MainButton
                    title={"Submit Attendance"}
                    onclick={handleSubmit}
                  />
                </Grid>
              </Grid>
            </form>
          </Box>
        </AttendanceMenu>
      )}
    </>
  );
};

export default Attendance;
