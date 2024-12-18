import { Avatar, Box, Button, Typography } from "@mui/material";
import { useGetData } from "../../hooks/useGetData";
import Table from "../Table/Table";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import { usePostUpdate } from "../../hooks/usePostUpdate";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { setEnrolls } from "../../redux/reducers/admin";

const AdminEnroll = () => {
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

      width: "150",
    },

    {
      field: "firstName",
      headerName: "Firstname",
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
      field: "request",
      headerName: "Status",
      headerClassName: "table-heading",
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              color: params?.row?.request === "Pending" ? "red" : "green",
              display: "flex",
            }}
            variant="body1"
          >
            {params?.row?.request}
          </Typography>
        );
      },
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
            <Link to={`/admin/enroll/${params.id}`}>
              <Button>
                <Edit />
              </Button>
            </Link>
            <Button
              onClick={() => {
                deleteEnrollHandler(params.id);
              }}
              startIcon={<Delete sx={{ color: "red" }} />}
            ></Button>
          </Box>
        );
      },
    },
  ];
  const [data, getInitialData] = useGetData("api/v1/getAllEnrolls");

  const { enrolls } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.enrolls) {
      dispatch(setEnrolls(data?.enrolls));
    }
  }, [data, dispatch]);
  const filteredArray = useMemo(() => {
    return enrolls?.map((enroll) => ({
      ...enroll,
      id: enroll._id,
      updated: moment(enroll?.createdAt).format("YYYY-MM-DD"),
    }));
  }, [enrolls]);

  const [, putPostmethod] = usePostUpdate();
  const deleteEnrollHandler = async (id) => {
    const payload = {
      method: "DELETE",
      url: `api/v1/enroll/delete/${id}`,
      message: "Delete Successfully",
    };
    await putPostmethod(payload);
    getInitialData();
  };
  return (
    <AdminLayout>
      <Table
        columns={column}
        heading={"All Enrollments"}
        rows={filteredArray}
        height={"90vh"}
      />
    </AdminLayout>
  );
};

export default AdminEnroll;
