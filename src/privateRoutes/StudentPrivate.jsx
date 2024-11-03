import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function StudentPrivate() {
  const { enrollDetails } = useSelector((state) => state.enroll);
  console.log(enrollDetails);
  return (
    <div>
      {enrollDetails?.request === "Pending" ? (
        <Navigate to="/home" />
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default StudentPrivate;
