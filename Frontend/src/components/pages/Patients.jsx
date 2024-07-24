import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const Patients = () => {
  const [doctorsList, setDoctorsList] = useState([]);

  const [patients, setPatients] = useState({ name: "", address: "", phone: "", age: "", gender: "", issue: "", doctor: "", doa: "", time: "" });
  const [patientsList, setPatientsList] = useState([])

  const [filteredPatients, setFilteredPatients] = useState(patientsList);

  const [search, setSearch] = useState("");
  const URL = import.meta.env.VITE_BACKEND_URL;

  const fetchDoctors = async () => {
    try {
      const parentID = localStorage.getItem('id');

      const response = await axios.get(`${URL}/doctors`, {
        params: { parentID }
      });

      // Filter doctors by status
      const activeDoctors = response.data.filter(doctor => doctor.status === 'Active');

      setDoctorsList(activeDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const addPatient = async (e) => {
    e.preventDefault();
    const id = uuidv4();
    const parentID = localStorage.getItem('id');

    try {
      const response = await axios.post(`${URL}/patients`, {
        parentID: parentID, id: id, name: patients.name, address: patients.address, phone: patients.phone, age: patients.age, gender: patients.gender, issue: patients.issue, doctor: patients.doctor, doa: patients.doa, time: patients.time,
      });

      const updatedPatientsList = [...patientsList, response.data];
      setPatientsList(updatedPatientsList);
      console.log(updatedPatientsList);
      console.log(response.data);

      toast.success('Patient added successfully');
      setPatients({
        name: "", address: "", phone: "", age: "", gender: "", issue: "", doctor: "", doa: "", time: ""
      });
    } catch (error) {
      console.error('Error adding patient:', error);
      toast.error('Failed to add patient. Please try again.');
    }
  };

  const fetchPatients = async () => {
    try {
      const parentID = localStorage.getItem('id');

      const response = await axios.get(`${URL}/patients`, {
        params: { parentID }
      });

      setPatientsList(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleChange = (e) => {
    setPatients({ ...patients, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    try {
      const query = e.target.value.toLowerCase();
      setSearch(query);
      if (query) {
        const filtered = patientsList.filter((patient) =>
          patient.name.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
          toast.error("No results found!");
        }

        setFilteredPatients(filtered);
      } else {
        setFilteredPatients(patientsList);
      }
    } catch (error) {
      console.error('Error filtering admissions:', error);
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.delete(`${URL}/patients`, { params: { id } });
      console.log(response.data);

      setPatients({ ...patientsList.find((patient) => patient.id === id), id });
      setPatientsList(patientsList.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error('Error updating patient:', error);
      toast.error('Failed to update patient. Please try again.');
    }
  };

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  return (
    <div className='bg-[#d0d0d0] min-h-screen'> {/* Change the background color and ensure it covers the full screen height */}
      <div className='pt-6 pb-6 flex flex-col gap-7 md:ml-72 ml-5 mr-5 md:flex-row'>
        {/* Left */}
        <div className='bg-white md:w-[576px] h-[650px] rounded-lg overflow-scroll'>
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
        <div className='bg-white md:w-[616px] h-[650px] rounded-lg'>
          {/* TOP */}
          <div className='flex'>
            <div>
              <h1 className='text-[#C12A2A] font-bold text-2xl ml-5 mt-5'>Patients</h1>
            </div>
            <div className='ml-32 w-80'>
              <label for="default-search" class="mb-2 w-full text-sm font-medium text-gray-900 dark:text-white">Search</label>
              <div>
                <div class="inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <i class="fa-solid fa-magnifying-glass text-white absolute z-10 mt-14"></i>
                </div>
                <input type="search" value={search} onChange={handleSearch} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for patients" />
              </div>
            </div>
          </div>

          {/* DISPLAY */}
          <div className='bg-white md:w-[600px] h-[550px] rounded-lg overflow-y-scroll'>
            <div className='flex flex-wrap justify-start'>
              {filteredPatients && filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <div key={patient.id} className='w-[170px] h-min ml-5 mt-5 bg-slate-800 rounded-lg inline-block p-3'>
                    <div>
                      <h1 className='text-white text-sm'><span className='font-bold'>Name: </span>{patient.name}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Address:</span> {patient.address}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Phone number:</span> {patient.phone}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Age:</span> {patient.age}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Gender:</span> {patient.gender}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Issue:</span> {patient.issue}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Doctor:</span> {patient.doctor}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Date: </span>{patient.doa}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Time: </span>{patient.time}</h1>
                    </div>
                    <div className='mt-5 text-right text-gray-300'>
                      <i className="fa-solid fa-pen-to-square hover:cursor-pointer hover:text-gray-100" onClick={() => handleEdit(patient.id)}></i>
                    </div>
                  </div>
                ))
              ) : (
                patientsList.map((patient) => (
                  <div key={patient.id} className='w-[170px] h-min ml-5 mt-5 bg-slate-800 rounded-lg inline-block p-3'>
                    <div>
                      <h1 className='text-white text-sm'><span className='font-bold'>Name: </span>{patient.name}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Address:</span> {patient.address}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Phone number:</span> {patient.phone}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Age:</span> {patient.age}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Gender:</span> {patient.gender}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Issue:</span> {patient.issue}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Doctor:</span> {patient.doctor}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Date: </span>{patient.doa}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Time: </span>{patient.time}</h1>
                    </div>
                    <div className='mt-5 text-right text-gray-300'>
                      <i className="fa-solid fa-pen-to-square hover:cursor-pointer hover:text-gray-100" onClick={() => handleEdit(patient.id)}></i>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Patients