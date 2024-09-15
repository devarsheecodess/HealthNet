import { React, useEffect, useState, useRef } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

const Doctors = () => {
  const [doctors, setDoctors] = useState({ image: "", name: "", address: "", phone: "", age: "", gender: "", dob: "", lisence: "", department: "", doj: "", salary: "" });
  const [doctorsList, setDoctorsList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);

  const [base64PhotoURL, setBase64PhotoURL] = useState(null);

  const [filteredDoctors, setFilteredDoctors] = useState(doctorsList);
  const URL = import.meta.env.VITE_BACKEND_URL;

  const handleModalToggle = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(!showModal);
  };

   // Convert file to base64
   const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBase64PhotoURL(reader.result);
      };
      reader.readAsDataURL(file); // Converts the file to base64 URL
      console.log(base64PhotoURL)
    }
  };

  const addDoctor = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const id = uuidv4(); // Generate a unique ID for the doctor
    const parentID = localStorage.getItem('id'); // Retrieve parentID from local storage

    try {
      const response = await axios.post(`${URL}/doctors`, {
        parentID: parentID,
        id: id,
        image: base64PhotoURL,
        name: doctors.name,
        address: doctors.address,
        phone: doctors.phone,
        age: doctors.age,
        gender: doctors.gender,
        dob: doctors.dob,
        lisence: doctors.lisence,
        department: doctors.department,
        doj: doctors.doj,
        salary: doctors.salary,
      });

      const updatedDoctorsList = [...doctorsList, response.data];
      setDoctorsList(updatedDoctorsList);
      console.log(updatedDoctorsList);
      console.log(response.data);

      toast.success("Doctor added successfully!");
      setDoctors({
        image: "",
        name: "",
        address: "",
        phone: "",
        age: "",
        gender: "",
        dob: "",
        lisence: "",
        department: "",
        doj: "",
        salary: ""
      });
      localStorage.removeItem('image');
    } catch (error) {
      console.error('Error adding doctor:', error);
      toast.error('Failed to add doctor. Please try again.');
      localStorage.removeItem('image');
    }
  };

  const handleChange = (e) => {
    setDoctors({ ...doctors, [e.target.name]: e.target.value });
  };

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const parentID = localStorage.getItem('id');

      const response = await axios.get(`${URL}/doctors`, {
        params: { parentID }
      });

      setDoctorsList(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
    finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const cf = confirm("Are you sure you want to delete this doctor?");
    if (!cf) return;
    try {
      const response = await axios.delete(`${URL}/doctors`, { params: { id } });
      console.log(response.data);

      toast.success("Doctor deleted successfully!");
    } catch (error) {
      console.error('Error deleting doctor:', error);
      toast.error('Failed to delete doctor. Please try again.');
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await axios.delete(`${URL}/doctors`, { params: { id } });
      console.log(response.data);

      console.log("Editing doctor with id " + id);
      setDoctors({ ...doctorsList.find((doctor) => doctor.id === id), id });
      setDoctorsList(doctorsList.filter((doctor) => doctor.id !== id));
    } catch (error) {
      console.error('Error updating doctor:', error);
      toast.error('Failed to update doctor. Please try again.');
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

  useEffect(() => {
    fetchDoctors();
  }, [doctorsList.length]);

  return (
    <div className='bg-[#d0d0d0] min-h-screen'> {/* Background color and full screen height */}
      <div className='pt-6 pb-6 flex flex-col md:flex-row gap-7 md:ml-72'>
        {/* Left */}
        <div className='bg-white md:w-[576px] w-full h-auto md:h-[650px] rounded-lg overflow-scroll'>
          <h1 className='text-[#C12A2A] font-bold text-2xl ml-5 mt-5'>Add Doctor</h1>
          <form className="max-w-sm ml-5 mt-5">
            <div className='flex flex-col md:flex-row'>
              {/* INPUT FIELDS */}
              <div>
                <div className="mb-5 flex flex-col md:flex-row gap-14 items-center">
                  <div>
                    <label htmlFor="image-upload" className="block mb-2 text-sm font-medium text-gray-900">Upload Image</label>
                    <input type="file" name='image' id="image-upload" accept="image/*" className="w-72 shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" onChange={handleImageChange} />
                  </div>
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 +">Name</label>
                  <input type="text" name='name' value={doctors.name} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                </div>

                <div class="mb-5">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 +">Address</label>
                  <textarea type="text" name='address' value={doctors.address} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 +">Phone number</label>
                  <input type="text" name='phone' value={doctors.phone} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 +">Age</label>
                  <input type="text" name='age' value={doctors.age} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                </div>

                <div class="mb-5">
                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Gender</label>
                  <select id="genders" name='gender' value={doctors.gender} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Select the gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 +">Date Of Birth</label>
                  <input type="date" name='dob' value={doctors.dob} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 +">Lisence no</label>
                  <input type="text" name='lisence' value={doctors.lisence} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                </div>

                <div class="mb-5">
                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Department</label>
                  <select id="countries" name='department' value={doctors.department} onChange={handleChange} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose the department</option>
                    <option value="Emergency Medicine">Emergency Medicine</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatologist">Dermatologist</option>
                    <option value="Pediatrician">Pediatrician</option>
                    <option value="Nephrology">Nephrology</option>
                    <option value="Orthopedics">Orthopedics</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Oncology">Oncology</option>
                    <option value="Pediatrics">Pediatrics</option>
                    <option value="Obstetrics and Gynecology">Obstetrics and Gynecology</option>
                    <option value="Radiology">Radiology</option>
                    <option value="Gastroenterology">Gastroenterology</option>
                    <option value="Urology">Urology</option>
                  </select>
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 +">Date Of Joining</label>
                  <input type="date" name='doj' value={doctors.doj} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 +">Salary</label>
                  <input type="text" name='salary' value={doctors.salary} onChange={handleChange} class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" />
                </div>
              </div>

              {/* DISPLAY IMAGE */}
              <div className='ml-0 md:ml-44 mt-4 md:mt-0'>
                {base64PhotoURL && (
                  <div className="mt-4" style={{ width: '100px', height: '100px' }}>
                    <img src={base64PhotoURL} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            </div>

            <button type="submit" onClick={addDoctor} class="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Doctor</button>
          </form>

        </div>

        {/* Right */}
        <div className='bg-white pb-5 md:w-[616px] w-full h-auto md:h-[650px] rounded-lg'>
          {/* TOP */}
          <div className='flex flex-wrap md:flex-nowrap'>
            <div>
              <h1 className='text-[#C12A2A] font-bold text-2xl ml-5 mt-5'>Doctors</h1>
            </div>
            <div className='md:ml-32 w-full md:w-80 mt-4 md:mt-0'>
              <label htmlFor="default-search" className="mb-2 w-full text-sm font-medium text-gray-900 dark:text-white">Search</label>
              <div>
                <div className="inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <i className="fa-solid fa-magnifying-glass absolute z-10 text-white mt-14"></i>
                </div>
                <input type="search" value={search} onChange={handleSearch} id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for doctors" />
              </div>
            </div>
          </div>

          {/* DISPLAY */}
          <div className='bg-white w-full h-auto md:h-[550px] rounded-lg overflow-y-scroll mt-5'> {/* Adjusted for vertical scrolling and responsiveness */}
            <div className='flex flex-wrap justify-start'> {/* Container for boxes, ensuring they are laid out properly */}
              <div>
                {
                  loading ? (
                    <div className='flex justify-center ml-5'>
                      <p>Loading...</p>
                    </div>
                  ) : (
                    filteredDoctors && filteredDoctors.length > 0 ? (
                      filteredDoctors.map((doctor) => (
                        <div key={doctor.id} className='w-full sm:w-[170px] h-auto sm:h-60 m-2 sm:ml-5 sm:mt-5 bg-slate-800 rounded-lg'>
                          <div className='flex justify-center'>
                            <img src={doctor.image} alt='doctor' className='w-20 h-20 mt-5 rounded-full' />
                          </div>
                          <div className='mt-5'>
                            <h1 className='text-white font-bold text-center text-sm'>{doctor.name}</h1>
                            <p className='text-white text-sm text-center'>{doctor.department}</p>
                          </div>
                          <div className='mt-5 text-right mr-4 text-gray-300'>
                            <i className="fa-solid fa-circle-info hover:cursor-pointer hover:text-gray-100" onClick={() => handleModalToggle(doctor)}></i>
                            <i className="fa-solid fa-trash ml-4 hover:cursor-pointer hover:text-red-400" onClick={() => handleDelete(doctor.id)}></i>
                            <i className="fa-solid fa-pen-to-square ml-4 hover:cursor-pointer hover:text-gray-100" onClick={() => handleEdit(doctor.id)}></i>
                          </div>
                        </div>
                      ))
                    ) : (
                      doctorsList.map((doctor) => (
                        <div key={doctor.id} className='w-[170px] h-60 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'>
                          <div className='flex justify-center'>
                            <img src={doctor.image} alt='doctor' className='w-20 h-20 mt-5 rounded-full' />
                          </div>
                          <div className='mt-10'>
                            <h1 className='text-white font-bold text-center text-sm'>{doctor.name}</h1>
                            <p className='text-white text-sm text-center'>{doctor.department}</p>
                          </div>
                          <div className='mt-5 text-right mr-4 text-gray-300'>
                            <i
                              className="fa-solid fa-circle-info hover:cursor-pointer hover:text-gray-100"
                              onClick={() => handleModalToggle(doctor)}
                            ></i>
                            <i className="fa-solid fa-trash ml-4 hover:cursor-pointer hover:text-red-400" onClick={() => handleDelete(doctor.id)}></i>
                            <i className="fa-solid fa-pen-to-square ml-4 hover:cursor-pointer hover:text-gray-100" onClick={() => handleEdit(doctor.id)}></i>
                          </div>
                        </div>
                      ))
                    )
                  )
                }
                {showModal && selectedDoctor && (
                  <div className='fixed inset-0 bg-opacity-10 backdrop-blur-lg flex justify-center'>
                    <div className='mt-20 ml-[100px] h-min w-[400px] flex flex-col gap-3 hover:cursor-pointer text-white bg-gray-800 p-7 rounded-xl'>
                      <button onClick={handleModalToggle} className='text-right'><i class="fa-solid fa-xmark text-red-400"></i></button>
                      <img src={selectedDoctor.image} alt='doctor' className='w-24 h-24 rounded-full' />
                      <h1><span className='font-bold'>Name:</span> {selectedDoctor.name}</h1>
                      <h1><span className='font-bold'>Address:</span> {selectedDoctor.address}</h1>
                      <h1><span className='font-bold'>Phone Number:</span> {selectedDoctor.phone}</h1>
                      <h1><span className='font-bold'>Age: </span>{selectedDoctor.age}</h1>
                      <h1><span className='font-bold'>Gender:</span> {selectedDoctor.gender}</h1>
                      <h1><span className='font-bold'>Date of Birth: </span>{selectedDoctor.dob}</h1>
                      <h1><span className='font-bold'>Lisence:</span> {selectedDoctor.lisence}</h1>
                      <h1><span className='font-bold'>Department:</span> {selectedDoctor.department}</h1>
                      <h1><span className='font-bold'>Date of Joining:</span> {selectedDoctor.doj}</h1>
                      <h1><span className='font-bold'>Salary:</span> {selectedDoctor.salary}</h1>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors