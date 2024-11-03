import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminPrivate() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div>{user?.role !== "ADMIN" ? <Navigate to="/login" /> : <Outlet />}</div>
  );
}

export default AdminPrivate;
