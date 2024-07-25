import { React, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    const [showModal, setShowModal] = useState(false);
    const id = localStorage.getItem("id");

    const toggleModal = () => {
        setShowModal(!showModal);
    }

    const handleLogout = () => {
        const cf = confirm("Are you sure you want to logout?");
        if (cf) {
            localStorage.clear();
            navigate("/");
            toast.success("Logged out successfully!");
        }
    }

    return (
        <div className='md:hidden'>
            <header>
                <nav class="bg-white border-gray-200 lg:px-6 py-2.5 dark:bg-gray-800">
                    <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <a href="https://flowbite.com" class="flex items-center px-4">
                            <i class="fa-solid fa-house-medical fa-lg mr-2 text-[#d73737]"></i>
                            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Health<span className='text-[#d73737]'>Net</span></span>
                        </a>
                        <div class="flex items-center lg:order-2">
                            <button onClick={toggleModal} data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
                                <span class="sr-only">Open main menu</span>
                                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                                <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </button>
                        </div>
                        {
                            showModal && (
                                <div class="justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                                    <ul class="absolute mt-2 bg-[#03071C] opacity-90 w-full flex flex-col font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                                        {/* Dashboard */}
                                        <li>
                                            <Link
                                                to={`/home/${id}`}
                                                className="px-4 mt-3 flex items-center p-1 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
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
                                                className="px-4 flex items-center p-1 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <i className="fa-solid fa-user-doctor text-gray-400 text-xl"></i>
                                                <span className="flex-1 ms-3 whitespace-nowrap">Doctors</span>
                                            </Link>
                                        </li>

                                        {/* Patients */}
                                        <li>
                                            <Link
                                                to={`/patients/${id}`}
                                                className="px-4 flex items-center p-1 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <i className="fa-solid fa-head-side-mask text-gray-400 text-xl"></i>
                                                <span className="flex-1 ms-3 whitespace-nowrap">Patients</span>
                                            </Link>
                                        </li>

                                        {/* Analytics */}
                                        <li>
                                            <Link
                                                to={`/analytics/${id}`}
                                                className="px-4 flex items-center p-1 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <i className="fa-solid fa-chart-line text-gray-400 text-xl"></i>
                                                <span className="flex-1 ms-3 whitespace-nowrap">Analytics</span>
                                            </Link>
                                        </li>

                                        {/* Attendance */}
                                        <li>
                                            <Link
                                                to={`/attendance/${id}`}
                                                className="px-4 flex items-center p-1 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <i className="fa-solid fa-clipboard-user text-gray-400 text-xl"></i>
                                                <span className="flex-1 ms-3 whitespace-nowrap">Attendance</span>
                                            </Link>
                                        </li>

                                        {/* Admissions */}
                                        <li>
                                            <Link
                                                to={`/admissions/${id}`}
                                                className="px-4 flex items-center p-1 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <i className="fa-solid fa-bed-pulse text-gray-400 text-xl"></i>
                                                <span className="flex-1 ms-3 whitespace-nowrap">Admissions</span>
                                            </Link>
                                        </li>

                                        {/* News */}
                                        <li>
                                            <Link
                                                to={`/news/${id}`}
                                                className="px-4 flex items-center p-1 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <i className="fa-solid fa-newspaper text-gray-400 text-xl"></i>
                                                <span className="flex-1 ms-3 whitespace-nowrap">News</span>
                                            </Link>
                                        </li>

                                        {/* Logout */}
                                        <li>
                                            <a
                                                onClick={handleLogout}
                                                className="px-4 flex items-center p-1 pb-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                                            >
                                                <i className="fa-solid fa-arrow-right-from-bracket text-gray-400 text-xl"></i>
                                                <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>

                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            )
                        }
                    </div>
                </nav>
            </header>
        </div>
    )
}


export default Header;
