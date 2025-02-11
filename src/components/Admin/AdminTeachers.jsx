import AdminLayout from "./AdminLayout.jsx";
import Table from "../Table/Table.jsx";
import { useGetData } from "../../hooks/useGetData.js";
import { Delete } from "@mui/icons-material";

import { Avatar, Box, Button } from "@mui/material";
import MainButton from "../../UI/MainButton.jsx";
import { usePostUpdate } from "../../hooks/usePostUpdate.js";
import Spinner from "../../UI/Spinner.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setAdminTeachers } from "../../redux/reducers/admin.js";
import { useEffect, useMemo } from "react";
import moment from "moment";
const AdminTeachers = () => {
  const column = [
    {
      field: "_id",
      headerName: "ID",
      headerClassName: "table-heading",
      width: "200",
    },
    {
      field: "avatar",
      headerName: "Aavtar",
      headerClassName: "table-heading",
      renderCell: (params) => {
        console.log(params);
        return <Avatar src={params.row.avatar.url} />;
      },

      width: "100",
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "table-heading",
      width: "150",
    },

    {
      field: "subjects",
      headerName: "Subjects",
      headerClassName: "table-heading",
      width: "200",
    },
    {
      field: "bio",
      headerName: "Bio",
      headerClassName: "table-heading",

      width: "200",
    },
    {
      field: "actions",
      flex: 0.3,
      headerClassName: "table-heading",
      headerName: "Actions",
      minWidth: 230,
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
            <Button
              onClick={() => {
                deleteTeacherHandler(params.id);
              }}
              startIcon={<Delete sx={{ color: "red" }} />}
            ></Button>
          </Box>
        );
      },
    },
  ];

  const [data, getInitialData] = useGetData("api/v1/teacher/getAllTeachers");

  const [loader, putPostmethod] = usePostUpdate();
  const deleteTeacherHandler = async (id) => {
    const payload = {
      method: "DELETE",
      url: `api/v1/teacher/delete/${id}`,
      message: "Delete Successfully",
    };
    const response = await putPostmethod(payload);
    console.log(response);
    getInitialData();
  };
  //   const filterArray = data?.teachers?.map((teacher) => ({
  //     ...teacher,
  //     id: teacher._id,
  //   }));
  const { teachers } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.teachers) {
      dispatch(setAdminTeachers(data?.teachers));
    }
  }, [data, dispatch]);
  const filteredArray = useMemo(() => {
    return teachers?.map((teacher) => ({
      ...teacher,
      id: teacher._id,
      updated: moment(teacher?.createdAt).format("YYYY-MM-DD"),
    }));
  }, [teachers]);
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
            <MainButton title={"+ Add Teacher"} url={"/admin/add-teacher"} />
          </Box>
          <Table
            columns={column}
            heading={"All Courses"}
            rows={filteredArray}
          />
        </AdminLayout>
      )}
    </>
  );
};

export default AdminTeachers;
