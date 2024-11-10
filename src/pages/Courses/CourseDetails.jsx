import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import feesAmount from "../../utils/feesAmount";
import {
  Box,
  CardContent,
  Grid,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { AccessTime, Person } from "@mui/icons-material";
import MainButton from "../../UI/MainButton";

const CourseDetails = () => {
  const param = useParams();
  const { isLogin } = useSelector((state) => state.auth);
  const [data] = useGetData(`api/v1/course/getCourseDetails/${param.cid}`);
  const course = data?.course;
  const fess = feesAmount(course?.title);
  return (
    <Box
      sx={{
        width: "90%",
        margin: "2% auto",
        padding: "2rem",
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          height: "auto",
          borderRadius: "2rem",
          overflow: "hidden",
          marginBottom: "3rem",
          color: "white",
          background: `linear-gradient(90deg,rgba(49, 44, 43, 0.8),rgba(30, 32, 33, 0.8)),url(${course?.attachment?.url});`,
          backgroundImage: "center",
          backgroundSize: "cover",
          backgroundPosition: "cover",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundRepeat: "no-repeat",
          padding: "3rem",
        }}
      >
        <Box>
          <Box
            sx={{
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "700",
                fontSize: "3rem",
              }}
            >
              {course?.title} Course Program{" "}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.4rem",
              }}
            >
              Comprehensive academic excellence program designed for{" "}
              {course?.title} Course students
            </Typography>
          </Box>
        </Box>
      </Box>
      <Grid container xs={12} gap={"2rem"}>
        <Grid item xs={12} sm={12} lg={7}>
          <Paper
            sx={{
              padding: "1rem",
            }}
          >
            <Typography variant="h5" marginBottom={"2rem"}>
              Course Details
            </Typography>
            <Grid container>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                <MenuItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <Person sx={{ fontSize: "2.5rem" }} />
                  <Box>
                    <Typography variant="body">Students Enrolled</Typography>
                    <Typography variant="body1">
                      {course?.courseCount} Students
                    </Typography>
                  </Box>
                </MenuItem>
                <MenuItem
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <AccessTime sx={{ fontSize: "2.5rem" }} />
                  <Box>
                    <Typography variant="body">Duration</Typography>
                    <Typography variant="body1">1 Hour Daily</Typography>
                  </Box>
                </MenuItem>
              </Grid>
              <Grid item xs={12}>
                <CardContent>
                  <Typography variant="h6" color="textSecondary" gutterBottom>
                    Subjects
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {course?.subjects}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    Description:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {course?.description}
                  </Typography>

                  <Typography variant="h6" gutterBottom>
                    Topics:
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {course?.topic}
                  </Typography>
                </CardContent>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} lg={4}>
          <Paper
            sx={{
              width: "100%",
              padding: "1rem ",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Typography variant="body">Course Fees</Typography>
            <Typography variant="h4" sx={{ fontWeight: "700" }}>
              {fess} Rs
            </Typography>
            {isLogin && <MainButton title={"Enroll Now"} url={"/enroll"} />}
            <MainButton title={"Go Back"} bgcolor={"gray"} url={"/courses"} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CourseDetails;
