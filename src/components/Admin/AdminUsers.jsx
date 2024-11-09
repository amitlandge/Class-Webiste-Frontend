import AdminLayout from "./AdminLayout";
import Table from "../Table/Table.jsx";
import { useGetData } from "../../hooks/useGetData.js";
import moment from "moment";
import { useEffect, useMemo } from "react";
import { setAdminUsers } from "../../redux/reducers/admin.js";
import { useDispatch, useSelector } from "react-redux";
const AdminUsers = () => {
  const column = [
    {
      field: "_id",
      headerName: "ID",
      headerClassName: "table-heading",
      width: "250",
    },

    {
      field: "username",
      headerName: "Username",
      headerClassName: "table-heading",
      width: "250",
    },

    {
      field: "email",
      headerName: "Email",
      headerClassName: "table-heading",
      width: "280",
    },
    {
      field: "updated",
      headerName: "Updated",
      headerClassName: "table-heading",
      width: "280",
    },
  ];
  const [data] = useGetData("api/v1/user/getAllUsers");
  const { users } = useSelector((state) => state.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.users) {
      dispatch(setAdminUsers(data?.users));
    }
  }, [data, dispatch]);
  const filteredArray = useMemo(() => {
    return users?.map((user) => ({
      ...user,
      id: user._id,
      updated: moment(user?.createdAt).format("YYYY-MM-DD"),
    }));
  }, [users]);

  return (
    <AdminLayout>
      <Table columns={column} heading={"All Users"} rows={filteredArray} />
    </AdminLayout>
  );
};

export default AdminUsers;
