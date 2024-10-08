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
import Header from "./components/pages/Header";
import ErrorPage from "./components/pages/ErrorPage";
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
    path: "/home/:id",
    element: (
      <div>
        <Control />
        <Header />
        <Dashboard />
      </div>
    ),
  },
  {
    path: "/doctors/:id",
    element: (
      <div>
        <Control />
        <Header />
        <Doctors />
      </div>
    ),
  },
  {
    path: "/patients/:id",
    element: (
      <div>
        <Control />
        <Header />
        <Patients />
      </div>
    ),
  },
  {
    path: "/analytics/:id",
    element: (
      <div>
        <Control />
        <Header />
        <Analytics />
      </div>
    ),
  },
  {
    path: "/attendance/:id",
    element: (
      <div>
        <Control />
        <Header />
        <Attendance />
      </div>
    ),
  },
  {
    path: "/admissions/:id",
    element: (
      <div>
        <Control />
        <Header />
        <Admissions />
      </div>
    ),
  },
  {
    path: "/news/:id",
    element: (
      <div>
        <Control />
        <Header />
        <News />
      </div>
    ),
  },
  {
    path: "*",
    element: (
      <div>
        <ErrorPage />
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
