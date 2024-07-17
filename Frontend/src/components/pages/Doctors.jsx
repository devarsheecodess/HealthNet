import { React, useState } from 'react'

const Doctors = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const deleteImage = () => {
    setSelectedImage(null);
  }

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
                    <input type="file" id="image-upload" accept="image/*" required className="w-72 shadow-sm bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" onChange={handleImageChange} />
                  </div>
                  {selectedImage && (<button type='button' onClick={deleteImage}><i class="fa-solid fa-trash text-2xl mt-6"></i></button>)}
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 +">Name</label>
                  <input type="text" class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="password" class="block mb-2 text-sm font-medium text-gray-900 +">Address</label>
                  <textarea type="text" class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 +">Phone number</label>
                  <input type="text" class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 +">Age</label>
                  <input type="text" class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5 flex items-center">
                  <label for="repeat-password" class="block text-sm font-medium text-gray-900 +">Gender</label>
                  <input type="radio" class="shadow-sm bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5 ml-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                  <label for="repeat-password" class="block  text-sm font-medium text-gray-900 +">Male</label>
                  <input type="radio" class="shadow-sm bg-gray-50 border border-gray-300 text-white text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-5 ml-4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                  <label for="repeat-password" class="block text-sm font-medium text-gray-900 +">Female</label>
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 +">Date Of Birth</label>
                  <input type="date" class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 +">Lisence no</label>
                  <input type="text" class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="countries" class="block mb-2 text-sm font-medium text-gray-900">Department</label>
                  <select id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                  <input type="date" class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
                </div>

                <div class="mb-5">
                  <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 +">Salary</label>
                  <input type="text" class="w-72 shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 + dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required />
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

            <button type="submit" class="mb-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Doctor</button>
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
                <input type="search" id="default-search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for doctors" required />
                <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
              </div>
            </div>
          </div>

          {/* DISPLAY */}
          <div className='bg-white w-[600px] h-[550px] rounded-lg overflow-y-scroll'> {/* Adjusted for vertical scrolling */}
            <div className='flex flex-wrap justify-start'> {/* Container for boxes, ensuring they are laid out properly */}
              <span className='w-[170px] h-64 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'></span>
              <span className='w-[170px] h-64 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'></span>
              <span className='w-[170px] h-64 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'></span>
              <span className='w-[170px] h-64 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'></span>
              <span className='w-[170px] h-64 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'></span>
              <span className='w-[170px] h-64 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'></span>
              <span className='w-[170px] h-64 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'></span>
              <span className='w-[170px] h-64 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'></span>
              <span className='w-[170px] h-64 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'></span>
              <span className='w-[170px] h-64 ml-5 mt-5 bg-slate-800 rounded-lg inline-block'></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doctors