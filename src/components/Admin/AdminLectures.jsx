import { Box, Button } from "@mui/material";
import AdminLayout from "./AdminLayout";

import { Delete } from "@mui/icons-material";
import MainButton from "../../UI/MainButton";
import Table from "../Table/Table";
import { useGetData } from "../../hooks/useGetData";
import { usePostUpdate } from "../../hooks/usePostUpdate";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { setAdminLecture } from "../../redux/reducers/admin";

const AdminLectures = () => {
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
      field: "subject",
      headerName: "Subject",
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
            <Button
              onClick={() => {
                deleteLectureHandler(params.id);
              }}
              startIcon={<Delete sx={{ color: "red" }} />}
            ></Button>
          </Box>
        );
      },
    },
  ];

  const [, putPostmethod] = usePostUpdate();
  const [data, getInitialData] = useGetData("api/v1/lecture/getAllLecture ");

  const deleteLectureHandler = async (id) => {
    const payload = {
      method: "DELETE",
      url: `api/v1/lecture/delete/${id}`,
      message: "Delete Successfully",
    };
    const response = await putPostmethod(payload);
    console.log(response);
    getInitialData();
  };

  const { lectures } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.lectures) {
      dispatch(setAdminLecture(data?.lectures));
    }
  }, [data, dispatch]);
  const filteredArray = useMemo(() => {
    return lectures?.map((lec) => ({
      ...lec,
      id: lec._id,
      updated: moment(lec?.createdAt).format("YYYY-MM-DD"),
    }));
  }, [lectures]);

  return (
    <AdminLayout>
      <Box
        sx={{
          textAlign: "center",
          margin: "2rem",
        }}
      >
        <MainButton title={"+ Create Lecture"} url={"/admin/create-lecture"} />
      </Box>
      <Table
        columns={column}
        heading={"All Lectures"}
        rows={filteredArray}
        height={"90vh"}
      />
    </AdminLayout>
  );
};

export default AdminLectures;
