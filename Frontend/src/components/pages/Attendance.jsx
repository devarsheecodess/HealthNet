import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

const Attendance = () => {
  const [doctorsList, setDoctorsList] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const [status, setStatus] = useState("");
  const URL = import.meta.env.VITE_BACKEND_URL;

  const fetchDoctors = async () => {
    try {
      const parentID = localStorage.getItem('id');

      const response = await axios.get(`${URL}/doctors`, {
        params: { parentID }
      });

      setDoctorsList(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleSearch = (e) => {
    try {
      const query = e.target.value.toLowerCase();
      setSearch(query);
      if (query) {
        const filtered = doctorsList.filter((doctor) =>
          doctor.name.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
          toast.error("No results found!");
        }

        setFilteredDoctors(filtered);
      } else {
        setFilteredDoctors(doctorsList);
      }
    } catch (error) {
      console.error('Error filtering doctors:', error);
    }
  };

  const handleStatusChange = async (id) => {
    try {
      const response = await axios.put(`${URL}/doctors`, {
        id,
        status
      });
      console.log(response.data);

      if (response.status === 200) {
        toast.success('Doctor status updated successfully');
      }
    } catch (error) {
      console.error('Error updating doctor status:', error);
      toast.error('Failed to update doctor status');
    }
  };


  const handleChange = (e) => {
    setStatus(e.target.value);
  }

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className='bg-[#d0d0d0] min-h-screen'>
      <div className='pt-6 pb-6 flex flex-col md:ml-72'>
        <div className='flex flex-col bg-white md:w-[1220px] h-[650px] rounded-xl ml-5 mr-5'>
          {/* TOP */}
          <div className='flex'>
            <h1 className='text-[#C12A2A] font-bold text-2xl ml-5 mt-5'>Attendance</h1>
            <div className='ml-10 w-[960px]'>
              <label for="default-search" class="mb-2 w-full text-sm font-medium text-gray-900 dark:text-white">Search</label>
              <div>
                <div class="inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <i class="fa-solid fa-magnifying-glass absolute z-10 text-white mt-14"></i>
                </div>
                <input type="search" value={search} onChange={handleSearch} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for doctors" required />
              </div>

            </div>
          </div>

          {/* DISPLAY */}
          <div className='mt-5 ml-7 gap-5 flex flex-wrap overflow-y-scroll mb-5'>
            {
              filteredDoctors && filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                  <div className='flex bg-black w-[270px] h-72 rounded-xl flex-col items-center justify-center'>
                    <img src={doctor.image} alt='doctor' className='w-32 h-32 bg-white self-center rounded-full mb-3' />
                    <h1 className='text-white font-bold text-lg'>{doctor.name.slice(0, 3) == "Dr." ? "" : "Dr. "}{doctor.name}</h1>
                    {
                      doctor.status === "Active" ? (
                        <p className='text-green-400'>Active</p>
                      ) : (
                        <p className='text-red-400'>Inactive</p>
                      )
                    }
                    <div className='flex gap-4 items-center justify-center'>
                      <select id="genders" name='gender' onChange={handleChange} class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Status</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Active">Active</option>
                      </select>
                      <button className='bg-transparent' onClick={() => handleStatusChange(doctor.id)}><i className="fa-solid fa-circle-check mt-5 text-2xl text-green-400"></i></button>
                    </div>
                  </div>
                ))
              ) : (
                doctorsList.map((doctor) => (
                  <div className='flex bg-black w-[270px] h-72 rounded-xl flex-col items-center justify-center'>
                    <img src={doctor.image} alt='doctor' className='w-32 h-32 bg-white self-center rounded-full mb-3' />
                    <h1 className='text-white font-bold text-lg'>{doctor.name.slice(0, 3) == "Dr." ? "" : "Dr. "}{doctor.name}</h1>
                    {
                      doctor.status === "Active" ? (
                        <p className='text-green-400 font-bold'>Active</p>
                      ) : (
                        <p className='text-red-400 font-bold'>Inactive</p>
                      )
                    }
                    <div className='flex gap-4 items-center justify-center'>
                      <select id="genders" name='gender' onChange={handleChange} class="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                        <option selected>Status</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Active">Active</option>
                      </select>
                      <button className='bg-transparent' onClick={() => handleStatusChange(doctor.id)}><i className="fa-solid fa-circle-check mt-5 text-2xl text-green-400"></i></button>
                    </div>
                  </div>
                ))
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Attendance
