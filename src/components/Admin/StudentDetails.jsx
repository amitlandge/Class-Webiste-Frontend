// src/components/StudentDetails.js

import {
  Card,
  CardContent,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";

import { usePostUpdate } from "../../hooks/usePostUpdate";
import Spinner from "../../UI/Spinner";
import AdminLayout from "./AdminLayout";

// Sample Data

const StudentDetails = () => {
  const param = useParams();
  const [data, getInitialData] = useGetData(`api/v1/enroll/${param.id}`);
  const details = data?.studentDeatils;
  //   const [status, setStatus] = useState(details?.request);
  console.log(data);
  const [loader, putPostmethod] = usePostUpdate();
  const submitStatus = async (val) => {
    if (val === details?.request) {
      return;
    }

    const payload = {
      method: "PUT",
      url: `api/v1/enroll/update/${param.id}`,
      payload: {
        request: val,
      },
      message: "Status Has Been Changed",
    };
    const response = await putPostmethod(payload);
    console.log(response);
    getInitialData();
  };
  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <AdminLayout>
          <Container maxWidth="sm" style={{ marginTop: "30px" }}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Student Details
                </Typography>

                <TableContainer component={Paper} style={{ marginTop: "15px" }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <b>Field</b>
                        </TableCell>
                        <TableCell>
                          <b>Details</b>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>Full Name</TableCell>
                        <TableCell>
                          {details?.firstName} {details?.lastName}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>{details?.phone}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Course</TableCell>
                        <TableCell>{details?.course}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Age</TableCell>
                        <TableCell>{details?.age}</TableCell>
                      </TableRow>
                      {/* <TableRow>
                      <TableCell>Email</TableCell>
                      <TableCell>{details?.email}</TableCell>
                    </TableRow> */}
                      <TableRow>
                        <TableCell>Address</TableCell>
                        <TableCell>{details?.address}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>User Id</TableCell>
                        <TableCell>{details?.user}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Status</TableCell>

                        {details?.request === "Pending" ? (
                          <TableCell sx={{ color: "red" }}>
                            {details?.request}
                          </TableCell>
                        ) : (
                          <TableCell sx={{ color: "green" }}>
                            {details?.request}
                          </TableCell>
                        )}
                      </TableRow>
                      <TableRow>
                        <TableCell>Change Status</TableCell>
                        <TableCell>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label" fullWidth>
                              Status
                            </InputLabel>
                            <Select
                              fullWidth
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label="Age"
                              onChange={(e) => {
                                submitStatus(e.target.value);
                              }}
                            >
                              <MenuItem value={"Pending"}>Pending</MenuItem>
                              <MenuItem value={"Accepted"}>Accepted</MenuItem>
                            </Select>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Container>
        </AdminLayout>
      )}
    </>
  );
};

export default StudentDetails;
