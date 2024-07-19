import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Admissions = () => {
  const [admissions, setAdmissions] = useState({ name: "", address: "", phone: "", age: "", gender: "", dob: "", bloodGroup: "", reason: "", bed: "", dateOfAdmission: "" })
  const [admissionsList, setAdmissionsList] = useState([]); // Initialize the patientsList state variable

  const handleChange = (e) => {
    setAdmissions({ ...admissions, [e.target.name]: e.target.value });
  };

  const addAdmission = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const id = uuidv4(); // Generate a unique ID for the doctor
    const parentID = localStorage.getItem('id'); // Get the parentID from localStorage

    const response = await axios.post("http://localhost:3000/admissions", {
      parentID: parentID,
      id: id,
      name: admissions.name,
      address: admissions.address,
      phone: admissions.phone,
      age: admissions.age,
      gender: admissions.gender,
      dob: admissions.dob,
      bloodGroup: admissions.bloodGroup,
      reason: admissions.reason,
      bed: admissions.bed,
      dateOfAdmission: admissions.dateOfAdmission
    });

    const updatedAdmissionsList = [...admissionsList, response.data];
    setAdmissionsList(updatedAdmissionsList); // Schedule the update to the doctorsList state
    console.log(updatedAdmissionsList); // Log the updated list

    alert('Admission added successfully');
    setAdmissions({ name: "", address: "", phone: "", age: "", gender: "", dob: "", bloodGroup: "", reason: "", bed: "", dateOfAdmission: "" }); // Clear the form
  };

  const fetchAdmissions = async () => {
    try {
      // Retrieve parentID from local storage (or wherever you store it)
      const parentID = localStorage.getItem('id');
  
      const response = await axios.get(`http://localhost:3000/admissions`, {
        params: { parentID }
      });
  
      setAdmissionsList(response.data); // Update the state with fetched doctors
    } catch (error) {
      console.error('Error fetching admissions:', error);
    }
  };

  useState(() => {
    fetchAdmissions();
  }, []);

  return (
    <div className='bg-[#d0d0d0] min-h-screen'> {/* Change the background color and ensure it covers the full screen height */}
      <div className='pt-6 pb-6 flex gap-7 ml-72'>
        {/* Left */}
        <div className='bg-white w-[576px] h-[650px] rounded-lg overflow-scroll'>
          <h1 className='text-[#C12A2A] font-bold text-2xl ml-5 mt-5'>Add Admission</h1>
          <form class="max-w-sm ml-5 mt-5">
            <div className='flex'>
              {/* INPUT FIELDS */}
              <div className="mb-5 flex flex-col">
                <div class="mb-5">
                  <label class="block mb-2 text-sm font-medium text-gray-900 +">Name</label>
                  <input type="text" name="name" value={admissions.name} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 +">Address</label>
                  <textarea type="text" name="address" value={admissions.address} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label class="block mb-2 text-sm font-medium text-gray-900 +">Phone number</label>
                  <input type="text" name="phone" value={admissions.phone} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label class="block mb-2 text-sm font-medium text-gray-900 +">Age</label>
                  <input type="text" name="age" value={admissions.age} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Gender</label>
                  <select id="genders" name='gender' value={admissions.gender} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select the gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div class="mb-5">
                  <label class="block mb-2 text-sm font-medium text-gray-900 +">Date Of Birth</label>
                  <input type="date" name="dob" value={admissions.dob} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label class="block mb-2 text-sm font-medium text-gray-900 +">Blood Group</label>
                  <input type="text" name="bloodGroup" value={admissions.bloodGroup} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label class="block mb-2 text-sm font-medium text-gray-900 +">Reason for admission</label>
                  <input type="text" name="reason" value={admissions.reason} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label class="block mb-2 text-sm font-medium text-gray-900 +">Bed number</label>
                  <input type="text" name="bed" value={admissions.bed} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label class="block mb-2 text-sm font-medium text-gray-900 +">Date Of Admission</label>
                  <input type="date" name="dateOfAdmission" value={admissions.dateOfAdmission} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

              </div>
            </div>
            <button type="submit" onClick={addAdmission} class="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Admission</button>
          </form>
        </div>

        {/* Right */}
        <div className='bg-white w-[616px] h-[650px] rounded-lg'>
          {/* TOP */}
          <div className='flex'>
            <div>
              <h1 className='text-[#C12A2A] font-bold text-2xl ml-5 mt-5'>Admissions</h1>
            </div>
            <div className='ml-20 w-80'>
              <label for="default-search" class="mb-2 w-full text-sm font-medium text-gray-900 dark:text-white">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Admissions" required />
                <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </div>
          </div>

          {/* DISPLAY */}
          <div className='bg-white w-[600px] h-[550px] rounded-lg overflow-y-scroll'> {/* Adjusted for vertical scrolling */}
            <div className='flex flex-wrap justify-start'> {/* Container for boxes, ensuring they are laid out properly */}
              {admissionsList.map((admission, index) => ( // Added index as key for each child in the list
                <div className='w-[170px] h-64 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'>
                  <ul class="text-left text-gray-500 dark:text-gray-400 m-2">
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Name: {admission.name}</span>
                    </li>
                    <li class="flex items-center">

                      <span className='text-xs mb-1 font-semibold'>Address: {admission.address}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Phone: {admission.phone}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Age: {admission.age}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Gender: {admission.gender}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Date Of Birth: {admission.dob}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Blood Group: {admission.bloodGroup}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Reason: {admission.reason}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>bed: {admission.bed}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Admitted on: {admission.dateOfAdmission}</span>
                    </li>
                    <div className='mb-2 text-right mr-2 text-gray-300'>
                      <i className="fa-solid fa-trash ml-4"></i>
                      <i className="fa-solid fa-pen-to-square ml-4"></i>
                    </div>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Admissions