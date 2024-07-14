import { React, useState, useEffect } from "react";
import HeroImg from "../assets/heroImg.png";
import { animateScroll as scroll } from "react-scroll";
import "../App.css";
import "../index.css";
import { Link } from "react-router-dom";

const Landing = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScrollToTop && window.scrollY > 0) {
        setShowScrollToTop(true);
      } else if (showScrollToTop && window.scrollY <= 0) {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", checkScrollTop);
    return () => window.removeEventListener("scroll", checkScrollTop);
  }, [showScrollToTop]);

  const handleAbout = () => {
    scroll.scrollTo(550);
  };

  const handleServices = () => {
    scroll.scrollTo(1270);
  };

  const handleAdmin = () => {
    window.open("http://github.com/devarsheecodess", "_blank");
  };

  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  const handleLogo = () => {
    window.location.reload();
  };

  return (
    <>
      {/* Header */}
      <header>
        <nav className="border-gray-200 px-4 lg:px-6 py-2.5 bg-[#03071C]">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a onClick={handleLogo} className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="mr-3 h-6 sm:h-9"
                alt="Flowbite Logo"
              />
              <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white cursor-pointer">
                Health<span className="text-[#C12A2A]">Net</span>
              </span>
            </a>
            <div className="flex items-center lg:order-2">
              <Link
                to="/login"
                className="text-black bg-gray-300 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px- lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="text-black bg-gray-300 hover:text-white focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Get started
              </Link>
              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            >
              <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-[#C12A2A] rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-[#C12A2A] dark:hover:bg-gray-700 dark:hover:text-[#C12A2A] lg:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={handleAbout}
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-[#C12A2A] dark:hover:bg-gray-700 dark:hover:text-[#C12A2A] lg:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={handleServices}
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-[#C12A2A] dark:hover:bg-gray-700 dark:hover:text-[#C12A2A] lg:dark:hover:bg-transparent dark:border-gray-700"
                    onClick={handleAdmin}
                  >
                    Admin
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* Button to scroll to top */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            fontSize: "24px",
            cursor: "pointer",
            zIndex: 1000,
            backgroundColor: "#f0f0f0",
            border: "none",
            opacity: 0.7,
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
          }}
        >
          <i class="fa-solid fa-arrow-up"></i>
        </button>
      )}

      {/* Hero */}
      <section className="bg-[#D9D9D9]">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-2xl font-extrabold tracking-tight leading-none md:text-3xl xl:text-4xl text-[#C12A2A]">
              Hospital Management System
            </h1>
            <p className="max-w-2xl mb-6 font-lightlg:mb-8 md:text-lg lg:text-xl ">
              Revolutionizing healthcare management with seamless, efficient,
              and comprehensive solutions.
            </p>
            <a
              href="#"
              class="inline-flex bg-[#03071C] hover:bg-gray-700 items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Get started
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </a>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img src={HeroImg} alt="mockup" className="w-3/4 h-auto"></img>
          </div>
        </div>
      </section>

      {/* About */}
      <div className="bg-[#F9CCCC]">
        <section className="mx-7 flex justify-center items-center flex-col">
          <h1 className="text-[#C12A2A] font-bold text-3xl mt-10 mb-5">
            About Us
          </h1>

          <p className="text-xl">
            <p className="font-bold">
              HealthNet Pro: Your Comprehensive Hospital Management Solution
            </p>
            <p>
              HealthNet Pro is a cutting-edge hospital management system
              designed to streamline and enhance the efficiency of healthcare
              facilities. Our platform integrates advanced technology with
              user-friendly features to provide an all-in-one solution for
              managing hospital operations. Mission: Our mission is to
              revolutionize healthcare management by offering a robust,
              reliable, and intuitive system that improves patient care,
              optimizes administrative workflows, and ensures seamless
              communication across departments.
            </p>

            <p className="font-bold mt-5">Features:</p>
            <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
              <li>
                Patient Management: Efficiently manage patient records,
                appointments, and history with a comprehensive database system.
              </li>
              <li>
                Staff Scheduling: Simplify staff scheduling and resource
                allocation to ensure optimal coverage and reduce administrative
                burden.
              </li>
              <li>
                Billing and Invoicing: Automate billing processes, track
                payments, and generate detailed financial reports with ease.
              </li>
              <li>
                Inventory Control: Keep track of medical supplies, equipment,
                and medications to prevent shortages and manage stock
                effectively.
              </li>
              <li>
                Reporting and Analytics: Access real-time data and generate
                custom reports to make informed decisions and improve hospital
                performance.
              </li>
              <li>
                Secure and Compliant: Ensure data security and compliance with
                industry standards and regulations to protect patient
                information.
              </li>
            </ul>

            <p className="font-bold mt-5">Why Choose HealthNet Pro?</p>
            <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
              <li>
                User-Friendly Interface: Intuitive design for easy navigation
                and minimal training requirements.
              </li>
              <li>
                Customizable Solutions: Tailor the system to meet the specific
                needs of your hospital or clinic.
              </li>
              <li>
                24/7 Support: Dedicated customer support team available around
                the clock to assist with any issues or questions.
              </li>
              <li>
                Scalable: Designed to grow with your facility, whether you’re a
                small clinic or a large hospital.
              </li>
            </ul>

            <p className="mt-5 mb-10">
              Join the Future of Healthcare Management: Experience the
              difference with HealthNet Pro and take your hospital's operations
              to the next level. Let us help you provide the best care for your
              patients while optimizing your administrative processes.
            </p>
          </p>
        </section>
      </div>

      {/* Services*/}
      <div className="bg-[#D9D9D9] pb-10">
        <section className="text-gray-600 body-font">
          <div className="container px-5 mx-auto">
            <div className="flex flex-col text-center w-full ">
              <h1 className="text-[#C12A2A] font-bold text-3xl mt-10 mb-5">
                Services
              </h1>
            </div>
            <div className="flex flex-wrap -m-4">
              <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#F9CCCC] text-[#C12A2A] flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium">
                      Patient Registration and Management
                    </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
                        <li>Patient records and history</li>
                        <li>Appointment scheduling and reminders</li>
                        <li>Inpatient and outpatient management</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#F9CCCC] text-[#C12A2A] flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium">
                      Electronic Medical Records (EMR)
                    </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
                        <li>Digital storage of patient records</li>
                        <li>Easy access and sharing of medical history</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#F9CCCC] text-[#C12A2A] flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium">
                      Billing and Revenue Cycle Management
                    </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
                        <li>Billing and invoicing</li>
                        <li>Payment tracking and financial reporting</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#F9CCCC] text-[#C12A2A] flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium">
                      Staff Management and Scheduling
                    </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
                        <li>Staff scheduling and shift management</li>
                        <li>Credential and certification tracking</li>
                        <li>Payroll and attendance tracking</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#F9CCCC] text-[#C12A2A] flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium">
                      Patient Portal and Engagement
                    </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
                        <li>Online access to medical records</li>
                        <li>Appointment booking and reminders</li>
                        <li>Health education and wellness resources</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-[#F9CCCC] text-[#C12A2A] flex-shrink-0">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                      >
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium">
                      Doctor Management
                    </h2>
                  </div>
                  <div className="flex-grow">
                    <p className="leading-relaxed text-base">
                      <ul style={{ listStyleType: "disc", marginLeft: "20px" }}>
                        <li>Doctor profiles and credentials</li>
                        <li>Schedule and appointment management</li>
                        <li>Performance tracking and reporting</li>
                      </ul>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer*/}
      <footer className="bg-white dark:bg-gray-900">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a onClick={scrollToTop} className="flex items-center">
                <img
                  src="https://flowbite.com/docs/images/logo.svg"
                  class="h-8 me-3"
                  alt="FlowBite Logo"
                />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white cursor-pointer">
                  Health<span class="text-[#C12A2A]">Net</span>
                </span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Resources
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="https://flowbite.com/" className="hover:underline">
                      HealthNet Pro
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://tailwindcss.com/"
                      className="hover:underline"
                    >
                      Developer
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Follow us
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li class="mb-4">
                    <a
                      href="https://github.com/devarsheecodess"
                      target="_blank"
                      className="hover:underline"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/devarshee-gaunekar-a06441257/"
                      target="_blank"
                      className="hover:underline"
                    >
                      LinkedIn
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2023{" "}
              <a href="https://flowbite.com/" className="hover:underline">
                HealthNet™
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0 text-white">
              <a
                href="https://instagram.com/devarsheegaunekar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-instagram ml-2 text-2xl cursor-pointer hover:text-gray-400"></i>
              </a>
              <a
                href="https://x.com/devarsheecodess"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-twitter ml-2 text-2xl cursor-pointer hover:text-gray-400"></i>
              </a>
              <a
                href="https://github.com/devarsheecodess"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-github ml-2 text-2xl cursor-pointer hover:text-gray-400"></i>
              </a>
              <a
                href="https://linkedin.com/in/devarshee-gaunekar-a06441257"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-brands fa-linkedin ml-2 text-2xl cursor-pointer hover:text-gray-400"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Landing;
