import { React, useState, useEffect } from 'react'
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';

const Admissions = () => {
  const [admissions, setAdmissions] = useState({ name: "", address: "", phone: "", age: "", gender: "", dob: "", bloodGroup: "", reason: "", bed: "", dateOfAdmission: "" })
  const [admissionsList, setAdmissionsList] = useState([]);

  const [filteredAdmissions, setFilteredAdmissions] = useState(admissionsList);

  const [search, setSearch] = useState("");

  const [showPriceModal, setShowPriceModal] = useState(false);

  const [priceID, setPriceID] = useState("");
  const [price, setPrice] = useState(0)

  const handleChange = (e) => {
    setAdmissions({ ...admissions, [e.target.name]: e.target.value });
  };

  const addAdmission = async (e) => {
    try {
      e.preventDefault();
      const id = uuidv4();
      const parentID = localStorage.getItem('id');

      const response = await axios.post("https://healthnet-backend.onrender.com/admissions", {
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

      const response = await axios.get(`https://healthnet-backend.onrender.com/admissions`, {
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://healthnet-backend.onrender.com/admissions`, { params: { id } });
      console.log(response.data);

      toast.success("Patient deleted successfully!");
    } catch (error) {
      console.error('Error deleting patient:', error);
      toast.error('Failed to delete patient. Please try again.');
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.delete(`https://healthnet-backend.onrender.com/admissions`, { params: { id } });
      console.log(response.data);

      setAdmissions({ ...admissionsList.find((patient) => patient.id === id), id });
      setAdmissionsList(admissionsList.filter((patient) => patient.id !== id));
    } catch (error) {
      console.error('Error updating patient:', error);
      toast.error('Failed to update patient. Please try again.');
    }
  };

  const submitPrice = async () => {
    try {
      // Prepare the data to be sent
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1; // Months are 0-indexed, so +1
      const earnings = price;
      const parentID = localStorage.getItem('id');

      // Post the earnings data
      const postResponse = await axios.post('https://healthnet-backend.onrender.com/earnings', { year, month, earnings, parentID });
      console.log('Post response:', postResponse.data);

      // Attempt to delete the patient only if posting earnings was successful
      const deleteResponse = await axios.delete(`https://healthnet-backend.onrender.com/patients`, { params: { id: doneID } });
      console.log('Delete response:', deleteResponse.data);

      // Update UI state only after successful operations
      setShowPriceModal(false);
      setPrice(0);
      setPriceID('');
    } catch (error) {
      console.error('Error during operations:', error);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  return (
    <div className='bg-[#d0d0d0] min-h-screen'>
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
            <div className='ml-24 mb-5 w-80'>
              <label for="default-search" class="mb-2 w-full text-sm font-medium text-gray-900 dark:text-white">Search</label>
              <div>
                <div class="inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <i class="fa-solid fa-magnifying-glass absolute z-10 text-white mt-14"></i>
                </div>
                <input type="search" value={search} onChange={handleSearch} id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for patients" />
              </div>
            </div>
          </div>

          {/* DISPLAY */}
          <div className='bg-white w-[600px] h-[550px] rounded-lg overflow-y-scroll'>
            <div className='flex flex-wrap justify-start'>
              {
                filteredAdmissions && filteredAdmissions.length > 0 ? (
                  filteredAdmissions.map((admission) => (
                    <div key={admission.id} className='w-[170px] h-min ml-5 mb-5 bg-slate-800 rounded-lg inline-block p-3'>
                      <div>
                        <h1 className='text-white text-sm'><span className='font-bold'>Name: </span>{admission.name}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Address:</span> {admission.address}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Phone number:</span> {admission.phone}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Age:</span> {admission.age}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Gender:</span> {admission.gender}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Date of birth:</span> {admission.dob}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Blood Group:</span> {admission.bloodGroup}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Illness: </span>{admission.reason}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Date: </span>{admission.dateOfAdmission}</h1>
                      </div>
                      <div className='mt-5 text-right text-gray-300'>
                        <i className="fa-solid fa-trash ml-4 hover:cursor-pointer hover:text-red-400" onClick={() => { setShowPriceModal(true); setPriceID(admission.id) }}></i>
                        <i className="fa-solid fa-pen-to-square ml-4 hover:cursor-pointer hover:text-gray-100" onClick={() => handleEdit(admission.id)}></i>
                      </div>
                    </div>
                  ))
                ) : (
                  admissionsList.map((admission) => (
                    <div key={admission.id} className='w-[170px] h-min ml-5 mb-5 bg-slate-800 rounded-lg inline-block p-3'>
                      <div>
                        <h1 className='text-white text-sm'><span className='font-bold'>Name: </span>{admission.name}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Address:</span> {admission.address}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Phone number:</span> {admission.phone}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Age:</span> {admission.age}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Gender:</span> {admission.gender}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Date of birth:</span> {admission.dob}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Blood Group:</span> {admission.bloodGroup}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Illness: </span>{admission.reason}</h1>
                        <h1 className='text-white text-sm'><span className='font-bold'>Date: </span>{admission.dateOfAdmission}</h1>
                      </div>
                      <div className='mt-5 text-right text-gray-300'>
                        <i className="fa-solid fa-trash ml-4 hover:cursor-pointer hover:text-red-400" onClick={() => { setShowPriceModal(true); setPriceID(admission.id) }}></i>
                        <i className="fa-solid fa-pen-to-square ml-4 hover:cursor-pointer hover:text-gray-100" onClick={() => handleEdit(admission.id)}></i>
                      </div>
                    </div>
                  ))
                )}
            </div>
          </div>
        </div>
      </div>

      {showPriceModal && (
        <div className='fixed inset-0 flex justify-center items-center backdrop-blur-sm z-50'>
          <div className='bg-gray-800 text-white p-7 h-60 rounded-xl w-[400px] flex flex-col'>
            <button type='button' onClick={() => setShowPriceModal(false)} className='text-right items-right'><i class="fa-solid fa-xmark text-red-500"></i></button>
            <div className='flex flex-col items-center justify-center mt-3'>
              <h1 className='font-bold mb-3'>Enter the billing amount of the patient</h1>
              <input
                className="font-bold text-center mb-3 w-64 p-2 border text-black border-gray-600 rounded"
                placeholder='Enter the bill of the patient'
                type="text"
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />
              <div className="flex gap-4 justify-center">
                <button
                  className='bg-blue-700 text-white p-2 rounded-lg w-36'
                  onClick={() => {
                    handleDelete(priceID);
                    submitPrice(price);
                    setShowPriceModal(false);
                    setPrice(0);
                    setPriceID("");
                  }}
                >
                  Charge Patient
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admissions