import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const Admissions = () => {
  const [admissions, setAdmissions] = useState({ name: "", address: "", phone: "", age: "", gender: "", dob: "", bloodGroup: "", reason: "", bed: "", dateOfAdmission: "" })
  const [admissionsList, setAdmissionsList] = useState([]);

  const [filteredAdmissions, setFilteredAdmissions] = useState(admissionsList);

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setAdmissions({ ...admissions, [e.target.name]: e.target.value });
  };

  const addAdmission = async (e) => {
    try {
      e.preventDefault();
      const id = uuidv4();
      const parentID = localStorage.getItem('id');

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
      setAdmissionsList(updatedAdmissionsList);
      console.log(updatedAdmissionsList);

      toast.success('Admission added successfully!');
      setAdmissions({ name: "", address: "", phone: "", age: "", gender: "", dob: "", bloodGroup: "", reason: "", bed: "", dateOfAdmission: "" });
    } catch (error) {
      console.error('Error adding admission:', error);
      toast.error('Error adding admission! Please try again.');
    }
  };

  const fetchAdmissions = async () => {
    try {
      const parentID = localStorage.getItem('id');

      const response = await axios.get(`http://localhost:3000/admissions`, {
        params: { parentID }
      });

      setAdmissionsList(response.data);
    } catch (error) {
      console.error('Error fetching admissions:', error);
    }
  };

  const handleSearch = (e) => {
    try {
      const query = e.target.value.toLowerCase();
      setSearch(query);
      if (query) {
        const filtered = admissionsList.filter((admission) =>
          admission.name.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
          toast.error("No results found!");
        }

        setFilteredAdmissions(filtered);
      } else {
        setFilteredPatients(patientsList);
      }
    } catch (error) {
      console.error('Error filtering admissions:', error);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, [admissions, admissionsList, filteredAdmissions]);

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
            <div className='ml-32 w-80'>
              <label for="default-search" class="mb-2 w-full text-sm font-medium text-gray-900 dark:text-white">Search</label>
              <div>
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" value={search} onChange={handleSearch} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for patients" />
              </div>
            </div>
          </div>

          {/* DISPLAY */}
          <div className='bg-white w-[600px] h-[550px] rounded-lg overflow-y-scroll'>
            <div className='flex flex-wrap justify-start'>
              {filteredAdmissions && filteredAdmissions.length > 0 ? (
                filteredAdmissions.map((admission) => (
                  <div key={admission.id} className='w-[170px] h-min ml-5 mt-5 bg-slate-800 rounded-lg inline-block p-3'>
                    <div>
                      <h1 className='text-white text-sm'><span className='font-bold'>Name: </span>{admission.name}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Address:</span> {admission.address}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Phone number:</span> {admission.phone}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Age:</span> {admission.age}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Gender:</span> {admission.gender}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Issue:</span> {admission.issue}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Doctor:</span> {admission.doctor}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Date: </span>{admission.doa}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Time: </span>{admission.time}</h1>
                    </div>
                    <div className='mt-5 text-right mr-4 text-gray-300'>
                    </div>
                  </div>
                ))
              ) : (
                admissionsList.map((admission) => (
                  <div key={admission.id} className='w-[170px] h-min ml-5 mt-5 bg-slate-800 rounded-lg inline-block p-3'>
                    <div>
                      <h1 className='text-white text-sm'><span className='font-bold'>Name: </span>{admission.name}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Address:</span> {admission.address}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Phone number:</span> {admission.phone}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Age:</span> {admission.age}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Gender:</span> {admission.gender}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Issue:</span> {admission.issue}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Doctor:</span> {admission.doctor}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Date: </span>{admission.doa}</h1>
                      <h1 className='text-white text-sm'><span className='font-bold'>Time: </span>{admission.time}</h1>
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

export default Admissions