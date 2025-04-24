import AdminLayout from "./AdminLayout";
import Table from "../Table/Table.jsx";

import moment from "moment";

import { setAdminUsers } from "../../redux/reducers/admin.js";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utils/fetchData.js";
import { toast } from "react-toastify";
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

  const dispatch = useDispatch();

  const { data } = useQuery({
    queryKey: ["allUsers", "api/v1/user/getAllUsers"], // Unique key for caching
    queryFn: fetchData,
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    onSuccess: () => {
      console.log(data);
      dispatch(setAdminUsers(data?.users)); // Save data to redux store
    },
  });

  const filteredArray = data?.users?.map((user) => {
    return {
      ...user,
      id: user._id,
      updated: moment(user?.createdAt).format("YYYY-MM-DD"),
    };
  });

  return (
    <AdminLayout>
      <Table columns={column} heading={"All Users"} rows={filteredArray} />
    </AdminLayout>
  );
};

export default AdminUsers;
