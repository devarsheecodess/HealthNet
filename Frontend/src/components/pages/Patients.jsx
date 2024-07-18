import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Patients = () => {
  const [doctorsList, setDoctorsList] = useState([]);

  const [patients, setPatients] = useState({ name: "", address: "", phone: "", age: "", gender: "", issue: "", doctor: "", doa: "", time: "" });
  const [patientsList, setPatientsList] = useState([])

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/doctors");
      console.log('Doctors:', response.data);
      setDoctorsList(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }

  const addPatient = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const id = uuidv4(); // Generate a unique ID for the doctor

    try {
      const response = await axios.post("http://localhost:3000/patients", {
        id: id, name: patients.name, address: patients.address, phone: patients.phone, age: patients.age, gender: patients.gender, issue: patients.issue, doctor: patients.doctor, doa: patients.doa, time: patients.time,
      });

      const updatedPatientsList = [...patientsList, response.data];
      setDoctorsList(updatedPatientsList); // Schedule the update to the doctorsList state
      console.log(updatedPatientsList); // Log the updated list
      console.log(response.data); // Log the response data

      alert('Patient added successfully');
      setPatients({
        name: "", address: "", phone: "", age: "", gender: "", issue: "", doctor: "", doa: "", time: ""
      });
    } catch (error) {
      console.error('Error adding patient:', error);
      alert('Failed to add patient. Please try again.');
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:3000/patients");
      setPatientsList(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }

  const handleChange = (e) => {
    setPatients({ ...patients, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  return (
    <div className='bg-[#d0d0d0] min-h-screen'> {/* Change the background color and ensure it covers the full screen height */}
      <div className='pt-6 pb-6 flex gap-7 ml-72'>
        {/* Left */}
        <div className='bg-white w-[576px] h-[650px] rounded-lg overflow-scroll'>
          <h1 className='text-[#C12A2A] font-bold text-2xl ml-5 mt-5'>Add Patient</h1>
          <form class="max-w-sm ml-5 mt-5">
            <div className='flex'>
              {/* INPUT FIELDS */}
              <div className="mb-5 flex flex-col">
                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-xs mb-1 font-semibold font-medium text-gray-900 font-light +">Name</label>
                  <input type="text" name="name" value={patients.name} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-xs mb-1 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="password" class="block mb-2 text-xs mb-1 font-semibold font-medium text-gray-900 font-light +">Address</label>
                  <textarea type="text" name="address" value={patients.address} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-xs mb-1 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-xs mb-1 font-semibold font-medium text-gray-900 font-light +">Phone number</label>
                  <input type="text" name="phone" value={patients.phone} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-xs mb-1 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-xs mb-1 font-semibold font-medium text-gray-900 font-light +">Age</label>
                  <input type="text" name="age" value={patients.age} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-xs mb-1 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="genders" class="block mb-2 text-xs mb-1 font-semibold font-medium text-gray-900 font-light">Gender</label>
                  <select id="gender" name="gender" value={patients.gender} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 font-light text-xs mb-1 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select the Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-xs mb-1 font-semibold font-medium text-gray-900 font-light +">Issue</label>
                  <input type="text" name="issue" value={patients.issue} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-xs mb-1 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="doctors" class="block mb-2 text-xs mb-1 font-semibold font-medium text-gray-900 font-light">Doctor</label>
                  <select id="doctors" name="doctor" value={patients.doctor} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 font-light text-xs mb-1 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select the Doctor</option>
                    {
                      doctorsList.map((doctor) => (
                        <option value={doctor.name}>{doctor.name}</option>
                      ))
                    }
                  </select>
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-xs mb-1 font-semibold font-medium text-gray-900 font-light +">Date Of Appointment</label>
                  <input type="date" name="doa" value={patients.doa} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-xs mb-1 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-xs mb-1 font-semibold font-medium text-gray-900 font-light +">Time</label>
                  <input type="time" name="time" value={patients.time} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-xs mb-1 font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>
              </div>
            </div>
            <button
              type="submit"
              onClick={addPatient}
              className="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs mb-1 font-semibold px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Patient
            </button>
          </form>
        </div>

        {/* Right */}
        <div className='bg-white w-[616px] h-[650px] rounded-lg'>
          {/* TOP */}
          <div className='flex'>
            <div>
              <h1 className='text-[#C12A2A] font-bold text-2xl ml-5 mt-5'>Patients</h1>
            </div>
            <div className='ml-32 w-80'>
              <label for="default-search" class="mb-2 w-full text-xs mb-1 font-semibold font-medium text-gray-900 font-light dark:text-white">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" id="default-search" class="block w-full p-4 ps-10 text-xs mb-1 font-semibold text-gray-900 font-light border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for Patients" required />
                <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs mb-1 font-semibold px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </div>
          </div>


          {/* DISPLAY */}
          <div className='bg-white w-[600px] h-[550px] rounded-lg overflow-y-scroll'>
            <div className='flex flex-wrap justify-start'>
              {patientsList.map(patient => (
                <div key={patient.id} className='w-[170px] h-64 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'>
                  <ul class="text-left text-gray-500 dark:text-gray-400 m-2">
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Name: {patient.name}</span>
                    </li>
                    <li class="flex items-center">

                      <span className='text-xs mb-1 font-semibold'>Address: {patient.address}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Phone: {patient.phone}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Age: {patient.age}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Gender: {patient.gender}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>issue: {patient.issue}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>doctor: {patient.doctor}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Appointment date: {patient.doa}</span>
                    </li>
                    <li class="flex items-center">
                      <span className='text-xs mb-1 font-semibold'>Time: {patient.time}</span>
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

export default Patients