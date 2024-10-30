import {
  Container,
  Stack,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import DownloadButton from "../../UI/DownloadButton";
import StudentPortal from "./StudentPortal";
import { useGetData } from "../../hooks/useGetData";
import { useSelector } from "react-redux";

const Assignments = () => {
  const { enrollDetails } = useSelector((state) => state.enroll);
  const grade = enrollDetails?.grade;
  const [data] = useGetData(`api/v1/course/assignment/course?course=${grade}`);
  console.log(data);
  return (
    <StudentPortal>
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          All Assignments
        </Typography>

        <Stack spacing={3}>
          {data?.assignment.map((assignment) => (
            <Card key={assignment._id} variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {assignment.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  {assignment.note}
                </Typography>
                <Typography variant="subtitle2" color="textSecondary">
                  Course: {assignment.grade}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "flex-end" }}>
                <DownloadButton id={assignment._id} />
              </CardActions>
            </Card>
          ))}
        </Stack>
      </Container>
    </StudentPortal>
  );
};

export default Assignments;
