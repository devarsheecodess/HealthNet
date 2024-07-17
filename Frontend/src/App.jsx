import "./App.css";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Control from "./components/pages/Control";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./components/pages/Dashboard";
import Attendance from "./components/pages/Attendance";
import Admissions from "./components/pages/Admissions";
import Analytics from "./components/pages/Analytics";
import Doctors from "./components/pages/Doctors";
import Patients from "./components/pages/Patients";
import News from "./components/pages/News";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Landing />
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Login />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <Signup />
      </div>
    ),
  },
  {
    path: "/home",
    element: (
      <div>
        <Control />
        <Dashboard />
      </div>
    ),
  },
  {
    path: "/doctors",
    element: (
      <div>
        <Control />
        <Doctors />
      </div>
    ),
  },
  {
    path: "/patients",
    element: (
      <div>
        <Control />
        <Patients />
      </div>
    ),
  },
  {
    path: "/analytics",
    element: (
      <div>
        <Control />
        <Analytics />
      </div>
    ),
  },
  {
    path: "/attendance",
    element: (
      <div>
        <Control />
        <Attendance />
      </div>
    ),
  },
  {
    path: "/admissions",
    element: (
      <div>
        <Control />
        <Admissions />
      </div>
    ),
  },
  {
    path: "/news",
    element: (
      <div>
        <Control />
        <News />
      </div>
    ),
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer />
    </>
  );
}

export default App;
