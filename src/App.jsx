import { Route, Routes } from "react-router-dom";
import "./App.css";

// import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEnroll, useUser } from "./hooks/useUserData.js";
import { lazy, Suspense, useEffect } from "react";
import UserPrivate from "./privateRoutes/userPrivate.jsx";
import MyProfile from "./pages/MyProfile.jsx";
import Enroll from "./pages/Enroll.jsx";
import Profile from "./pages/Profile.jsx";
// import Payment from "./components/payment/Payment.jsx";
import Assignments from "./pages/Student/Assignmets.jsx";
import QandA from "./pages/Student/QandA.jsx";
import ChatComponent from "./Dummy/ChatComponent.jsx";
import { SocketProvider } from "./context/socketContext.jsx";

import SideMenu from "./layout/SideMenu.jsx";
import Footer from "./pages/Footer.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import SuccessStories from "./pages/SuccessStories.jsx";
import Gallery from "./pages/Gallery.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

import Teachers from "./pages/Home/Teachers.jsx";
import Payment from "./components/payment/Payment.jsx";
import Spinner from "./UI/Spinner.jsx";
import PaymentsDetails from "./components/payment/PaymentsDetails.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";
import AdminEnroll from "./components/Admin/AdminEnroll.jsx";
import AdminUsers from "./components/Admin/AdminUsers.jsx";
import AdminMessage from "./components/Admin/AdminAssignment.jsx";
import StudentDetails from "./components/Admin/StudentDetails.jsx";
import CreateAssignments from "./components/Admin/CreateAssignments.jsx";
import AdminCourses from "./components/Admin/AdminCourses.jsx";
import AddCourses from "./components/Admin/AddCourses.jsx";
import EditCourse from "./components/Admin/EditCourse.jsx";
import CourseDetails from "./pages/Courses/CourseDetails.jsx";
import AdminAssignment from "./components/Admin/AdminAssignment.jsx";
const Home = lazy(() => import("./pages/Home.jsx"));
function App() {
  const { getInitialData } = useEnroll();
  const [loadUser] = useUser();

  useEffect(() => {
    loadUser();
    getInitialData();
  }, []);

  return (
    <>
      <nav>
        <ToastContainer />
        <SideMenu />
      </nav>
      <main>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" index element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/success" element={<SuccessStories />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/teachers" element={<Teachers />} />
            <Route
              element={
                <SocketProvider>
                  <UserPrivate />
                </SocketProvider>
              }
            >
              <Route path="/myProfile" element={<MyProfile />} />
              <Route path="/enroll" element={<Enroll />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment-details" element={<PaymentsDetails />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/qAnda" element={<QandA />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/enroll" element={<AdminEnroll />} />
              <Route path="/admin/messages" element={<AdminMessage />} />
              <Route path="/admin/enroll/:id" element={<StudentDetails />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/admin/add-course" element={<AddCourses />} />
              <Route path="/admin/course/edit/:cid" element={<EditCourse />} />
              <Route path="/course/details/:cid" element={<CourseDetails />} />
              <Route
                path="/admin/create-assignment"
                element={<CreateAssignments />}
              />
              <Route path="/admin/assignment" element={<AdminAssignment />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<ChatComponent />} />
            <Route path="/spinner" element={<Spinner />} />
          </Routes>
        </Suspense>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default App;
