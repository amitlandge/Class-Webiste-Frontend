import { Avatar, Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useGetData } from "../hooks/useGetData";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEnrollDetails } from "../redux/reducers/enroll";

import "./Profile.css";
import MainButton from "../UI/MainButton";
const Profile = () => {
  const [data, getIntialData] = useGetData("api/v1/enrollDetails");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { enrollDetails } = useSelector((state) => state.enroll);
  useEffect(() => {
    getIntialData();
  }, []);
  const details = data?.enrolldetails;
  dispatch(getEnrollDetails(details));

  return (
    <Box sx={{ p: 4 }}>
      {/* Header Section */}
      <Paper sx={{ p: 4, mb: 4, textAlign: "center" }}>
        <Avatar
          alt={enrollDetails?.firstName}
          src={enrollDetails?.avatar.url} // Add path to student's image
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
        <Typography variant="h4" sx={{ mt: 2 }}>
          {user?.username}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user?.email}
        </Typography>

        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Edit Profile
        </Button>
      </Paper>

      {/* Personal Information Section */}
      {enrollDetails && (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper
              sx={{
                p: 5,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography variant="h6">Personal Information</Typography>
              <Typography variant="body1">
                <strong>Full Name:</strong>{" "}
                {`${enrollDetails?.firstName} ${enrollDetails?.middleName} ${enrollDetails?.lastName}`}
              </Typography>
              <Typography variant="body1">
                <strong>Phone:</strong> {enrollDetails?.phone}
              </Typography>
              <Typography variant="body1">
                <strong>Address:</strong> {enrollDetails?.address}
              </Typography>
              <Typography variant="body1">
                <strong>Age:</strong> {enrollDetails?.age} Years old
              </Typography>
              <Typography variant="body1">
                <strong>Grade:</strong> {enrollDetails?.grade}th
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",
                  // justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <strong>Status:</strong>
                {enrollDetails?.request === "Accepted" ? (
                  <Box
                    sx={{
                      padding: "5px",
                      background: "green",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Accepted
                  </Box>
                ) : (
                  <Box
                    sx={{
                      padding: "5px",
                      background: "red",
                      color: "white",
                      borderRadius: "5px",
                    }}
                  >
                    Pending
                  </Box>
                )}
              </Typography>
            </Paper>
          </Grid>

          <Grid
            item
            xs={12}
            md={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <MainButton title={"Payment"} bgcolor="green" url={"/payment"} />
            <MainButton title={"Edit Enroll Details"} url={"/edit-enroll"} />
            <MainButton
              title={"View Payment Details"}
              url={"/payment-details"}
              bgcolor="blue"
            />
          </Grid>
        </Grid>
      )}

      {/* Academic Progress Section */}
      {/* <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Academic Progress</Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3}>
              <Typography variant="body1"><strong>Mathematics:</strong> {studentData.progress.math}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body1"><strong>Science:</strong> {studentData.progress.science}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body1"><strong>English:</strong> {studentData.progress.english}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Typography variant="body1"><strong>Social Studies:</strong> {studentData.progress.socialStudies}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box> */}

      {/* Achievements Section */}
      {/* <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6">Achievements</Typography>
          <ul>
            {studentData.achievements.map((achievement, index) => (
              <li key={index}>
                <Typography variant="body1">{achievement}</Typography>
              </li>
            ))}
          </ul>
        </Paper>
      </Box> */}
    </Box>
  );
};

export default Profile;
