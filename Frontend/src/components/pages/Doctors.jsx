import { React, useEffect, useState } from 'react'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';

const Doctors = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [doctors, setDoctors] = useState({ image: "", name: "", address: "", phone: "", age: "", gender: "", dob: "", lisence: "", department: "", doj: "", salary: "" });
  const [doctorsList, setDoctorsList] = useState([]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      setSelectedImage(URL.createObjectURL(file));
      setDoctors({ ...doctors, image: file });

      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        setDoctors({ ...doctors, image: loadEvent.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = () => {
    setSelectedImage(null);
    setDoctors({ ...doctors, image: "" });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addDoctor = async (e) => {
    e.preventDefault(); // Prevent default form submission
    const id = uuidv4(); // Generate a unique ID for the doctor

    try {
      const response = await axios.post("http://localhost:3000/doctors", {
        id: id,
        image: selectedImage,
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
      setDoctorsList(updatedDoctorsList); // Schedule the update to the doctorsList state
      console.log(updatedDoctorsList); // Log the updated list
      console.log(response.data); // Log the response data

      alert('Doctor added successfully');
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
      setSelectedImage(null);
    } catch (error) {
      console.error('Error adding doctor:', error);
      alert('Failed to add doctor. Please try again.');
      localStorage.removeItem('image');
    }
  };

  const handleChange = (e) => {
    setDoctors({ ...doctors, [e.target.name]: e.target.value });
  };

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/doctors");
      setDoctorsList(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/doctors/${id}`);
      const updatedDoctorsList = doctorsList.filter((doctor) => doctor.id !== id);
      setDoctorsList(updatedDoctorsList);
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className='bg-[#d0d0d0] min-h-screen'> {/* Change the background color and ensure it covers the full screen height */}
      <div className='pt-6 pb-6 flex gap-7 ml-72'>
        {/* Left */}
        <div className='bg-white w-[576px] h-[650px] rounded-lg overflow-scroll'>
          <h1 className='text-[#C12A2A] font-bold text-2xl ml-5 mt-5'>Add Doctor</h1>
          <form class="max-w-sm ml-5 mt-5">
            <div className='flex'>
              {/* INPUT FIELDS */}
              <div>
                <div className="mb-5 flex gap-14 items-center">
                  <div>
                    <label htmlFor="image-upload" className="block mb-2 text-sm font-medium text-gray-900">Upload Image</label>
                    <input type="file" name='image' id="image-upload" accept="image/*" className="w-72 shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" onChange={handleImageChange} />
                  </div>
                  {selectedImage && (
                    <button type='button' onClick={deleteImage}>
                      <i className="fa-solid fa-trash text-2xl mt-6"></i>
                    </button>
                  )}
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
              <div className='ml-44'>
                {selectedImage && (
                  <div className="mt-4" style={{ width: '100px', height: '100px' }}>
                    <img src={selectedImage} alt="Selected" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                )}
              </div>
            </div>

            <button type="submit" onClick={addDoctor} class="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Doctor</button>
          </form>

        </div>

        {/* Right */}
        <div className='bg-white w-[616px] h-[650px] rounded-lg'>
          {/* TOP */}
          <div className='flex'>
            <div>
              <h1 className='text-[#C12A2A] font-bold text-2xl ml-5 mt-5'>Doctors</h1>
            </div>
            <div className='ml-32 w-80'>
              <label for="default-search" class="mb-2 w-full text-sm font-medium text-gray-900 dark:text-white">Search</label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for doctors" />
                <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </div>
          </div>

          {/* DISPLAY */}
          <div className='bg-white w-[600px] h-[550px] rounded-lg overflow-y-scroll'> {/* Adjusted for vertical scrolling */}
            <div className='flex flex-wrap justify-start'> {/* Container for boxes, ensuring they are laid out properly */}
              {
                doctorsList.map((doctor) => ( // Map through the doctorsList array
                  <div className='w-[170px] h-60 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'>
                    <div className='flex justify-center'>
                      <img src={doctor.image} alt='doctor' className='w-20 h-20 mt-5 rounded-full' />
                    </div>
                    <div className='mt-10'>
                      <h1 className={`text-white font-bold text-center text-sm`}>{doctor ? doctor.name : 'Loading...'}</h1>
                      <p className='text-white text-sm text-center'>{doctor.department}</p>
                    </div>
                    <div className='mt-5 text-right mr-4 text-gray-300'>
                      <i className="fa-solid fa-circle-info"></i>
                      <i onClick={() => handleDelete(doctor.id)} className="fa-solid fa-trash ml-4"></i>
                      <i className="fa-solid fa-pen-to-square ml-4"></i>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors