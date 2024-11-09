import { Route, Routes } from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEnroll, useUser } from "./hooks/useUserData.js";
import { lazy, Suspense, useEffect } from "react";

import { SocketProvider } from "./context/socketContext.jsx";

import ScrollToTop from "./utils/ScrollToTop.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const UserPrivate = lazy(() => import("./privateRoutes/UserPrivate.jsx"));
const AdminPrivate = lazy(() => import("./privateRoutes/AdminPrivate.jsx"));
const StudentPrivate = lazy(() => import("./privateRoutes/StudentPrivate.jsx"));
const NotFoundPage = lazy(() => import("./pages/Home/NotFoundPage.jsx"));
const AddTeacher = lazy(() => import("./components/Admin/AddTeacher.jsx"));
const EditEnroll = lazy(() => import("./pages/EditEnroll.jsx"));
const CourseDetails = lazy(() => import("./pages/Courses/CourseDetails.jsx"));
const EditCourse = lazy(() => import("./components/Admin/EditCourse.jsx"));
const AddCourses = lazy(() => import("./components/Admin/AddCourses.jsx"));
const AdminCourses = lazy(() => import("./components/Admin/AdminCourses.jsx"));
const AdminEnroll = lazy(() => import("./components/Admin/AdminEnroll.jsx"));
const Spinner = lazy(() => import("./UI/Spinner.jsx"));
const Payment = lazy(() => import("./components/payment/Payment.jsx"));
const Teachers = lazy(() => import("./pages/Home/Teachers.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Gallery = lazy(() => import("./pages/Gallery.jsx"));
const SuccessStories = lazy(() => import("./pages/SuccessStories.jsx"));
const Courses = lazy(() => import("./pages/Courses/Courses.jsx"));
const Footer = lazy(() => import("./pages/Footer.jsx"));
const SideMenu = lazy(() => import("./layout/SideMenu.jsx"));
const QandA = lazy(() => import("./pages/Student/QandA.jsx"));
const Assignments = lazy(() => import("./pages/Student/Assignmets.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const Enroll = lazy(() => import("./pages/Enroll.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const StudentDetails = lazy(() =>
  import("./components/Admin/StudentDetails.jsx")
);
const PaymentsDetails = lazy(() =>
  import("./components/payment/PaymentsDetails.jsx")
);

const AdminDashboard = lazy(() =>
  import("./components/Admin/AdminDashboard.jsx")
);
const AdminAssignment = lazy(() =>
  import("./components/Admin/AdminAssignment.jsx")
);
const AdminTeachers = lazy(() =>
  import("./components/Admin/AdminTeachers.jsx")
);
const CreateAssignments = lazy(() =>
  import("./components/Admin/CreateAssignments.jsx")
);
const AdminUsers = lazy(() => import("./components/Admin/AdminUsers.jsx"));
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
        <ScrollToTop />
      </nav>
      <main
        style={{
          minHeight: "85vh",
        }}
      >
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" index element={<Home />} />
            <Route path="/*" element={<NotFoundPage />} />
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
              <Route path="/enroll" element={<Enroll />} />
              <Route path="/profile" element={<Profile />} />

              <Route path="/edit-enroll" element={<EditEnroll />} />
            </Route>
            <Route element={<AdminPrivate />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/enroll" element={<AdminEnroll />} />
              <Route path="/admin/teachers" element={<AdminTeachers />} />
              <Route path="/admin/add-teacher" element={<AddTeacher />} />
              <Route path="/admin/enroll/:id" element={<StudentDetails />} />
              <Route path="/admin/courses" element={<AdminCourses />} />
              <Route path="/admin/add-course" element={<AddCourses />} />
              <Route path="/admin/course/edit/:cid" element={<EditCourse />} />

              <Route
                path="/admin/create-assignment"
                element={<CreateAssignments />}
              />
              <Route path="/admin/assignment" element={<AdminAssignment />} />
            </Route>
            <Route
              element={
                <SocketProvider>
                  <StudentPrivate />
                </SocketProvider>
              }
            >
              <Route path="/payment" element={<Payment />} />
              <Route path="/payment-details" element={<PaymentsDetails />} />
              <Route path="/assignments" element={<Assignments />} />
              <Route path="/qAnda" element={<QandA />} />
            </Route>
            <Route path="/course/details/:cid" element={<CourseDetails />} />
            <Route path="/login" element={<Login />} />
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
