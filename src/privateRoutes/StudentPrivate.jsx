import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function StudentPrivate() {
  const { enrollDetails } = useSelector((state) => state.enroll);

  return (
    <div>
      {enrollDetails && enrollDetails?.request === "Accepted" ? (
        <Outlet />
      ) : (
        <Navigate to="/home" />
      )}
    </div>
  );
}

export default StudentPrivate;
