import React, { useState, useEffect } from 'react'
import axios from 'axios';

const Attendance = () => {
  const [doctorsList, setDoctorsList] = useState([]); // Initialize the state with an empty array

  const fetchDoctors = async () => {
    try {
      // Retrieve parentID from local storage (or wherever you store it)
      const parentID = localStorage.getItem('id');

      // Fetch doctors for the specific parentID
      const response = await axios.get(`http://localhost:3000/doctors`, {
        params: { parentID }
      });

      setDoctorsList(response.data); // Update the state with fetched doctors
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className='bg-[#d0d0d0] min-h-screen'> {/* Change the background color and ensure it covers the full screen height */}
      <div className='pt-6 pb-6 flex flex-col ml-72'>
        <div className='flex flex-col bg-white w-[1220px] h-[650px] rounded-xl'>
          {/* TOP */}
          <div className='flex'>
            <h1 className='text-[#C12A2A] font-bold text-2xl ml-5 mt-5'>Attendance</h1>
            <div className='ml-10 w-[960px]'>
              <label for="default-search" class="mb-2 w-full text-sm font-medium text-gray-900 dark:text-white">Search</label>
              <div>
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for doctors" required />
                <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </div>
          </div>

          {/* DISPLAY */}
          <div className='mt-5 ml-7 gap-5 flex flex-wrap overflow-y-scroll mb-5'>
            {
              doctorsList.map((doctor) => (
                <div className='flex bg-black w-[270px] h-72 rounded-xl flex-col items-center justify-center'>
                  <img src={doctor.image} alt='doctor' className='w-32 h-32 bg-white self-center rounded-full mb-3' />
                  <h1 className='text-white font-bold text-lg'>{doctor.name.slice(0, 3) == "Dr." ? "" : "Dr. "}{doctor.name}</h1>
                  <div className='flex gap-4 items-center justify-center'>
                    <select id="status" class="bg-gray-50 border border-gray-300 text-gray-900 mt-5 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-24 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>Status</option>
                      <option value="Inactive">Inactive<i className="fa-solid fa-circle text-red-500"></i></option>
                      <option value="Active">Active<i className="fa-solid fa-circle text-green-500"></i></option>
                    </select>
                    <button className='bg-transparent'><i className="fa-solid fa-circle-check mt-5 text-2xl text-green-400"></i></button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance
