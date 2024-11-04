import AdminLayout from "./AdminLayout.jsx";
import Table from "../Table/Table.jsx";
import { useGetData } from "../../hooks/useGetData.js";
import { Delete, Edit } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";
import MainButton from "../../UI/MainButton.jsx";
import { usePostUpdate } from "../../hooks/usePostUpdate.js";
import Spinner from "../../UI/Spinner.jsx";
const AdminCourses = () => {
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
      field: "subjects",
      headerName: "Subjects",
      headerClassName: "table-heading",
      width: "250",
    },
    {
      field: "topic",
      headerName: "Topic",
      headerClassName: "table-heading",

      width: "210",
    },
    {
      field: "actions",
      flex: 0.3,
      headerClassName: "table-heading",
      headerName: "Actions",
      minWidth: 250,
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
            <Link to={`/admin/course/edit/${params.id}`}>
              <Button>
                <Edit />
              </Button>
            </Link>
            <Button
              onClick={() => {
                deleteCourseHandler(params.id);
              }}
              startIcon={<Delete sx={{ color: "red" }} />}
            ></Button>
          </Box>
        );
      },
    },
  ];
  const [data, getInitialData] = useGetData("api/v1/course/getAllCourses");

  const [loader, putPostmethod] = usePostUpdate();
  const deleteCourseHandler = async (id) => {
    const payload = {
      method: "DELETE",
      url: `api/v1/course/delete/${id}`,
      message: "Delete Successfully",
    };
    await putPostmethod(payload);
    
    getInitialData();
  };
  const filterArray = data?.courses?.map((course) => ({
    ...course,
    id: course._id,
  }));
  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <AdminLayout>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "2rem",
            }}
          >
            <MainButton title={"+ Add Course"} url={"/admin/add-course"} />
          </Box>
          <Table
            columns={column}
            heading={"All Courses"}
            rows={filterArray}
          
          />
        </AdminLayout>
      )}
    </>
  );
};

export default AdminCourses;
