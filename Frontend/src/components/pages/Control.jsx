import { React, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Control = () => {
  const navigate = useNavigate();
  const [id, setID] = useState("")

  const handleLogout = () => {
    const conf = confirm("Are you sure you want to logout?");
    if (conf) {
      localStorage.clear();
      navigate("/");
      alert("Logged out successfully!");
    }
  }

  const fetchID = () => {
    setID(localStorage.getItem("id"));
  }

  useEffect(() => {
    fetchID();
  }, [id])

  return (
    <div>
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-[#03071C]">
          <Link to={`/home/${id}`} href="https://flowbite.com/" className="flex items-center ps-2.5 mb-5">
            <img src="https://flowbite.com/docs/images/logo.svg" className="h-6 me-3 sm:h-7" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Health<span className="text-[#C12A2A]">Net</span></span>
          </Link>
          <ul className="space-y-2 font-medium">
            {/* Dashboard */}
            <li>
              <Link
                to={`/home/${id}`}
                className="flex items-center p-3 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            {/* Doctors */}
            <li>
              <Link
                to={`/doctors/${id}`}
                className="flex items-center p-3 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-user-doctor text-gray-400 text-xl"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Doctors</span>
              </Link>
            </li>


            {/* Patients */}
            <li>
              <Link
                to={`/patients/${id}`}
                className="flex items-center p-3 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-head-side-mask text-gray-400 text-xl"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Patients</span>
              </Link>
            </li>

            {/* Analytics */}
            <li>
              <Link
                to={`/analytics/${id}`}
                className="flex items-center p-3 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-chart-line text-gray-400 text-xl"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Analytics</span>
              </Link>
            </li>

            {/* Attendance */}
            <li>
              <Link
                to={`/attendance/${id}`}
                className="flex items-center p-3 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-clipboard-user text-gray-400 text-xl"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Attendance</span>
              </Link>
            </li>

            {/* Admissions */}
            <li>
              <Link
                to={`/admissions/${id}`}
                className="flex items-center p-3 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-bed-pulse text-gray-400 text-xl"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Admissions</span>
              </Link>
            </li>

            {/* News */}
            <li>
              <Link
                to={`/news/${id}`}
                className="flex items-center p-3 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-newspaper text-gray-400 text-xl"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">News</span>
              </Link>
            </li>

            {/* Logout */}
            <li>
              <a
                onClick={handleLogout}
                className="flex items-center p-3 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <i className="fa-solid fa-arrow-right-from-bracket text-gray-400 text-xl"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>

              </a>
            </li>
          </ul>
        </div>
      </aside >
    </div >
  );
};

export default Control;