import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminPrivate() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>{user?.role === "ADMIN" ? <Outlet /> : <Navigate to="/home" />}</div>
  );
}

export default AdminPrivate;
