import AdminLayout from "./AdminLayout";
import Table from "../Table/Table.jsx";
import { useGetData } from "../../hooks/useGetData.js";
import moment from "moment";
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

  const filterArray = data?.users?.map((user) => ({
    ...user,
    id: user._id,
    updated: moment(user?.createdAt).format("YYYY-MM-DD"),
  }));
  return (
    <AdminLayout>
      <Table columns={column} heading={"All Users"} rows={filterArray} />
    </AdminLayout>
  );
};

export default AdminUsers;
