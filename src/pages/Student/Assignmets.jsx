import { Box, Button } from "@mui/material";

import { Link } from "react-router-dom";

import { useGetData } from "../../hooks/useGetData";

import DownloadButton from "../../UI/DownloadButton";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import StudentPortal from "./StudentPortal.jsx";
import Table from "../../components/Table/Table.jsx";
import { setAssignment } from "../../redux/reducers/assignment.js";
import { useEffect, useMemo } from "react";

const Assignments = () => {
  const column = [
    {
      field: "title",
      headerName: "Title",
      headerClassName: "table-heading",
      width: "150",
    },
    {
      field: "note",
      headerName: "Note",
      headerClassName: "table-heading",
      width: "250",
    },
    {
      field: "course",
      headerName: "Course",
      headerClassName: "table-heading",
      width: "150",
    },
    {
      field: "updated",
      headerName: "Updated",
      headerClassName: "table-heading",
      width: "150",
    },

    {
      field: "actions",
      flex: 0.3,
      headerClassName: "table-heading",
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Link>
              <Button>
                <DownloadButton id={params.id} />
              </Button>
            </Link>
          </Box>
        );
      },
    },
  ];

  const { enrollDetails } = useSelector((state) => state.enroll);
  const { assignment } = useSelector((state) => state.assignment);
  const course = enrollDetails?.course;
  const dispatch = useDispatch();

  const [data] = useGetData(`api/v1/course/assignment/course?course=${course}`);

  useEffect(() => {
    if (data?.assignment) {
      dispatch(setAssignment(data.assignment));
    }
  }, [data, dispatch]);
  const filteredArray = useMemo(() => {
    return assignment?.map((assignment) => ({
      ...assignment,
      id: assignment._id,
      updated: moment(assignment?.createdAt).format("YYYY-MM-DD"),
    }));
  }, [assignment]);
  return (
    <StudentPortal>
      <Table
        columns={column}
        heading={"All Assignments"}
        rows={filteredArray}
        height={"90vh"}
      />
    </StudentPortal>
  );
};

export default Assignments;
