import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function UserPrivate() {
  const { isLogin } = useSelector((state) => state.auth);

  return <div>{!isLogin ? <Navigate to="/login" /> : <Outlet />}</div>;
}

export default UserPrivate;
