import { createBrowserRouter } from "react-router-dom";
import Register from "./pages/Auth/Register";
import Home from "./pages/home/Home";
import Login from "./pages/Auth/Login";
import App from "./App";
import ErrorPage from "./components/ErrorPage";
import CourseDetailsFI from "./pages/CourseDetails/CourseDetailsFI";
import Instructor from "./pages/Instructor/Instructor";
import Help from "./pages/Auth/Help";
import SetAssigments from "./pages/CourseDetails/SetAssigments";
import ManageCourses from "./pages/manageCourses/ManageCourses";
import ManageUsers from "./pages/manageUsers/ManageUsers";
import AddCourses from "./pages/manageCourses/AddCourses";
import UpdateCourses from "./pages/manageCourses/UpdateCourses";
import UpdateUsers from "./pages/manageUsers/UpdateUsers";
import Addstudent from "./pages/manageUsers/AddStudent";
import AddInstructor from "./pages/manageUsers/AddInstructor";
import AddAssignment from "./pages/CourseDetails/AddAssignment";
import Admin from "./middleware/Admin";

export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/",
        element: <Instructor />,
      },

      {
        path: "/instructor",
        element: <Instructor />,
      },

      {
        path: ":id",
        /*  path: "/coursedetailsfi", */
        element: <CourseDetailsFI />,
      },

      {
        path: "/setassigments/:id",
        element: <SetAssigments />,
      },
      {
        path: "/add-assignment/:id",
        element: <AddAssignment />,
      },

      {
        path: "/help",
        element: <Help />,
      },

      {
        path: "/manage-users",
        children: [
          {
            path: "",
            element: <ManageUsers />,
          },

          {
            path: "add-student",
            element: <Addstudent />,
          },

          {
            path: "add-instructor",
            element: <AddInstructor />,
          },

          {
            path: ":id",
            element: <UpdateUsers />,
          },
        ],
      },

      {
        path: "/manage-courses",
        children: [
          {
            path: "",
            element: <ManageCourses />,
          },

          {
            path: "add-courses",
            element: <AddCourses />,
          },

          {
            path: ":id",
            element: <UpdateCourses />,
          },
        ],
      },
      { path: "/login", element: <Login /> },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);
