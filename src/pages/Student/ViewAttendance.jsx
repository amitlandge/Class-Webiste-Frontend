import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";
import AttendanceMenu from "./AttendanceMenu";
import { useGetData } from "../../hooks/useGetData";
import { setAttendace } from "../../redux/reducers/attendance.js";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const ViewAttendance = () => {
  const { attendance } = useSelector((state) => state.attendance);
  const [data] = useGetData(`api/v1/attendance/getAttendance`);
  const dispatch = useDispatch();
  console.log(attendance);
  useEffect(() => {
    if (data?.attendance) {
      dispatch(setAttendace(data.attendance));
    }
  }, [data, dispatch]);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    const data = Array.from({ length: daysInMonth }, (_, i) => {
      const date = `${selectedYear}-${String(selectedMonth).padStart(
        2,
        "0"
      )}-${String(i + 1).padStart(2, "0")}`;
      const record = attendance.find(
        (d) => moment(d?.date).format("YYYY-MM-DD") === date
      );
      return {
        date,
        status: record?.status === "Present" ? record.status : "Absent",
      };
    });
    setAttendanceData(data);
  }, [selectedMonth, selectedYear, attendance]);

  return (
    <AttendanceMenu>
      <Box
        sx={{
          padding: "20px",
          width: "90%",
          margin: "0 auto",

          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ marginBottom: "20px", textAlign: "center" }}
        >
          Attendance
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <FormControl sx={{ marginRight: 2 }}>
            <Select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => (
                <MenuItem key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <Select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              {Array.from({ length: 5 }, (_, i) => (
                <MenuItem key={i} value={2024 - i}>
                  {2024 - i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Attendance Grid */}
        <Grid
          container
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          {attendanceData.map((entry, index) => (
            <Grid
              item
              xs={1.2}
              key={index}
              sx={{
                height: "40px",
                backgroundColor:
                  entry.status === "Present" ? "#4caf50" : "#f44336",
                borderRadius: "4px",
                textAlign: "center",
                lineHeight: "40px",
                color: "#fff",
                fontWeight: "bold",
              }}
            >
              {new Date(entry.date).getDate()}
            </Grid>
          ))}
        </Grid>
      </Box>
    </AttendanceMenu>
  );
};

export default ViewAttendance;
