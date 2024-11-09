import { Box, Paper, Typography } from "@mui/material";
import AdminLayout from "./AdminLayout.jsx";
import StudentChart, { DonutChart } from "./Charts.jsx";
import { useGetData } from "../../hooks/useGetData.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAdminDataCount,
  setCountGirlsBoys,
} from "../../redux/reducers/admin.js";

const AdminDashboard = () => {
  const [data] = useGetData("api/v1/course/getAdminData");
  const [girlsBoys] = useGetData("api/v1/enroll/get/counts");
  const { dataCount, countGirlsBoys } = useSelector((state) => state.admin);

  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(setAdminDataCount(data));
    }
  }, [data, dispatch]);
  useEffect(() => {
    if (girlsBoys) {
      dispatch(setCountGirlsBoys(girlsBoys?.count));
    }
  }, [girlsBoys, dispatch]);
  return (
    <AdminLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "4rem",
        }}
      >
        <Paper
          sx={{
            width: "80vw",
            height: "auto",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
          }}
        >
          <Typography variant="h6">Students</Typography>
          <StudentChart labels={"Students"} />
        </Paper>
        <Paper elevation={0}>
          <Box
            sx={{
              width: "100%",
              margin: "0% auto",
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "4rem",
            }}
          >
            <Box className="box_container">
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "700",
                  fontSize: "4rem",
                }}
              >
                {dataCount?.enroll}
              </Typography>
              <Typography variant="body" sx={{ fontSize: "1.2rem" }}>
                Students
              </Typography>
            </Box>
            <Box className="box_container">
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "700",
                  fontSize: "4rem",
                }}
              >
                {dataCount?.user}
              </Typography>
              <Typography variant="body" sx={{ fontSize: "1.2rem" }}>
                Users
              </Typography>
            </Box>
            <Box className="box_container">
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "700",
                  fontSize: "4rem",
                }}
              >
                {dataCount?.assignments}
              </Typography>
              <Typography variant="body" sx={{ fontSize: "1.2rem" }}>
                Assignments
              </Typography>
            </Box>
            <Box className="box_container">
              <Typography
                variant="h2"
                sx={{
                  fontWeight: "700",
                  fontSize: "4rem",
                }}
              >
                {dataCount?.course}
              </Typography>
              <Typography variant="body" sx={{ fontSize: "1.2rem" }}>
                Courses
              </Typography>
            </Box>
          </Box>
        </Paper>
        <Paper
          sx={{
            width: "80vw",
            height: "auto",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",

            alignItems: "center",
          }}
        >
          <Typography variant="h6">Girls And Boys</Typography>
          <DonutChart
            value={[countGirlsBoys?.girls, countGirlsBoys?.boys]}
            width={"50vw"}
          />
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
