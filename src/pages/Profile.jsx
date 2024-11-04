import { Avatar, Box, Grid, Paper, Typography } from "@mui/material";
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
      <Paper sx={{ p: 4, mb: 4, textAlign: "center" }}>
        <Avatar
          alt={enrollDetails?.firstName}
          src={enrollDetails?.avatar.url}
          sx={{ width: 100, height: 100, margin: "auto" }}
        />
        <Typography variant="h4" sx={{ mt: 2 }}>
          {user?.username}
        </Typography>
        <Typography variant="body1">
          <strong>Email:</strong> {user?.email}
        </Typography>
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
                <strong>Course:</strong> {enrollDetails?.course}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: "flex",

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
            <MainButton title={"Edit Enroll Details"} url={"/edit-enroll"} />
            {enrollDetails?.request !== "Pending" && (
              <>
                <MainButton
                  title={"Payment"}
                  bgcolor="green"
                  url={"/payment"}
                />
                <MainButton
                  title={"View Payment Details"}
                  url={"/payment-details"}
                  bgcolor="blue"
                />
              </>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default Profile;
