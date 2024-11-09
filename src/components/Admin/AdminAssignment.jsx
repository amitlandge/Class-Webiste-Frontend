import { Box, Button } from "@mui/material";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import MainButton from "../../UI/MainButton";
import Table from "../Table/Table";
import { useGetData } from "../../hooks/useGetData";
import { usePostUpdate } from "../../hooks/usePostUpdate";
import DownloadButton from "../../UI/DownloadButton";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { setAdminAssignment } from "../../redux/reducers/admin";

const downloadAssignments = (e) => {};
const AdminAssignment = () => {
  const column = [
    {
      field: "_id",
      headerName: "ID",
      headerClassName: "table-heading",
      width: "200",
    },

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
      width: "150",
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
              <Button onClick={downloadAssignments}>
                <DownloadButton id={params.id} />
              </Button>
            </Link>
            <Button
              onClick={() => {
                deleteAssignmentHandler(params.id);
              }}
              startIcon={<Delete sx={{ color: "red" }} />}
            ></Button>
          </Box>
        );
      },
    },
  ];

  const [, putPostmethod] = usePostUpdate();
  const [data, getInitialData] = useGetData("api/v1/course/getAllAssignment");

  const deleteAssignmentHandler = async (id) => {
    const payload = {
      method: "DELETE",
      url: `api/v1/course/assignments/delete/${id}`,
      message: "Delete Successfully",
    };
    const response = await putPostmethod(payload);
    console.log(response);
    getInitialData();
  };

  const { assignments } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.assignments) {
      dispatch(setAdminAssignment(data?.assignments));
    }
  }, [data, dispatch]);
  const filteredArray = useMemo(() => {
    return assignments?.map((assignment) => ({
      ...assignment,
      id: assignment._id,
      updated: moment(assignment?.createdAt).format("YYYY-MM-DD"),
    }));
  }, [assignments]);

  return (
    <AdminLayout>
      <Box
        sx={{
          textAlign: "center",
          margin: "2rem",
        }}
      >
        <MainButton
          title={"+ Create Assignment"}
          url={"/admin/create-assignment"}
        />
      </Box>
      <Table
        columns={column}
        heading={"All Assignments"}
        rows={filteredArray}
        height={"90vh"}
      />
    </AdminLayout>
  );
};

export default AdminAssignment;
