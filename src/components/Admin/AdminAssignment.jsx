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
  // const deleteProductHandler = (id) => {};
  const [, putPostmethod] = usePostUpdate();
  const [data, getInitialData] = useGetData("api/v1/course/getAllAssignment");
  console.log(data?.assignments);
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
  const filterArray = data?.assignments?.map((assignment) => ({
    ...assignment,
    id: assignment._id,
    updated: moment(assignment?.createdAt).format("YYYY-MM-DD"),
  }));
  console.log(filterArray);
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
        rows={filterArray}
        height={"90vh"}
      />
    </AdminLayout>
  );
};

export default AdminAssignment;
