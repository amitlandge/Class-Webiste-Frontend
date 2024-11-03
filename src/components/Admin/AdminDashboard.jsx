import { Box, Paper, Typography } from "@mui/material";
import AdminLayout from "./AdminLayout.jsx";
import StudentChart, { DonutChart } from "./Charts.jsx";
import { useGetData } from "../../hooks/useGetData.js";

const AdminDashboard = () => {
  const [data] = useGetData("api/v1/course/getAdminData");
  const [count] = useGetData("api/v1/enroll/get/counts");
  const counts = count?.count;
  console.log(data);
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
                {data?.enroll}
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
                {data?.user}
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
                {data?.assignments}
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
                {data?.course}
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
          <DonutChart value={[counts?.girls, counts?.boys]} width={"50vw"} />
        </Paper>
      </Box>
    </AdminLayout>
  );
};

export default AdminDashboard;
