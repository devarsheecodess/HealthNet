import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dashIMG from '../../assets/dashboard.png'
import axios from 'axios'
import PulseLoader from "react-spinners/PulseLoader";
import { toast } from 'react-toastify';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const Dashboard = () => {
  const [greeting, setGreeting] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [admin, setAdmin] = useState('')

  const [patientsList, setPatientsList] = useState([])
  const [doctorsList, setDoctorsList] = useState([])

  const [totalPatients, setTotalPatients] = useState("")
  const [totalDoctors, setTotalDoctors] = useState("")

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#010822");

  const [showPriceModal, setShowPriceModal] = useState(false);
  const [price, setPrice] = useState(0);

  const [doneID, setDoneID] = useState('')

  const { id } = useParams();

  const addID = () => {
    localStorage.setItem('id', id)
  }

  const getGreeting = () => {
    const date = new Date()
    const hours = date.getHours()
    if (hours < 12) {
      setGreeting('Good morning')
    } else if (hours < 15) {
      setGreeting('Good afternoon')
    } else {
      setGreeting('Good evening')
    }
  }

  const getTime = () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    const hours12Format = hours % 12 === 0 ? 12 : hours % 12;
    const finalTime = `${hours12Format.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;

    setTime(finalTime)
  }

  const getDate = () => {
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth()
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const year = date.getFullYear()
    setDate(`${day} ${months[month]} ${year}`)
  }

  const fetchPatients = async () => {
    try {
      const parentID = localStorage.getItem('id');

      const response = await axios.get(`http://localhost:3000/patients`, {
        params: { parentID }
      });

      setPatientsList(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const parentID = localStorage.getItem('id');

      const response = await axios.get(`http://localhost:3000/doctors`, {
        params: { parentID }
      });

      setDoctorsList(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const setTotal = async () => {
    await fetchDoctors()
    await fetchPatients()

    const totalDoctors = doctorsList.length.toString()
    const totalPatients = patientsList.length.toString()

    setTotalDoctors(totalDoctors)
    setTotalPatients(totalPatients)
  }

  const handleDelete = async (id) => {
    const cf = confirm("Are you sure you want to delete this patient?");
    if (!cf) return;
    try {
      const response = await axios.delete(`http://localhost:3000/patients`, { params: { id } });
      console.log(response.data);

      toast.success("Patient deleted successfully!");
    } catch (error) {
      console.error('Error deleting patient:', error);
      toast.error('Failed to delete patient. Please try again.');
    }
  };

  const handleDone = async (id) => {
    try {
      setShowPriceModal(true);
      setDoneID(id);

    } catch (error) {
      console.error('Error marking patient as done:', error);
      toast.error('Failed to mark patient as done. Please try again.');
    }
  }

  const submitPrice = async () => {
    try {
      // Prepare the data to be sent
      const year = new Date().getFullYear();
      const month = new Date().getMonth() + 1; // Months are 0-indexed, so +1
      const earnings = price;
      const parentID = localStorage.getItem('id');

      // Post the earnings data
      const postResponse = await axios.post('http://localhost:3000/earnings', { year, month, earnings, parentID });
      console.log('Post response:', postResponse.data);

      // Attempt to delete the patient only if posting earnings was successful
      const deleteResponse = await axios.delete(`http://localhost:3000/patients`, { params: { id: doneID } });
      console.log('Delete response:', deleteResponse.data);

      // Update UI state only after successful operations
      setShowPriceModal(false);
      setPrice(0);
      setDoneID('');
      toast.success("Earnings updated and patient released successfully!");
    } catch (error) {
      console.error('Error during operations:', error);
      toast.error('Failed to update earnings or delete patient. Please try again.');
    }
  };

  useEffect(() => {
    setLoading(true)
    setAdmin(localStorage.getItem('firstName'))
    addID()
    getGreeting()
    getTime()
    getDate()
    fetchPatients()
    setLoading(false)

    const intervalId = setInterval(getTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setLoading(true)
    setTotal()
    setLoading(false)
  }, [patientsList, doctorsList])

  return (
    <div className='bg-[#d0d0d0] min-h-screen'>
      <PulseLoader
        color={color}
        loading={loading}
        cssOverride={override}
        size={15}
      />
      <div className='pt-6 pb-6 flex flex-col ml-72'>
        {/* Top part */}
        <div className='flex gap-9'>
          <div className='w-[470px] h-[149px] flex  items-center bg-white rounded-lg'>
            <div className='ml-7 mr-20'>
              <h1 className='text-black font-bold mt-1 text-xl'>{greeting} {admin}</h1>
              <h5 className='font-semibold mt-6 text-sm'>{date}</h5>
              <h5 className='text-[#C12A2A] font-bold text-lg'>{time}</h5>
            </div>

            {/* Image div */}
            <div>
              <img src={dashIMG} alt='Dashboard' className='w-[130px] h-[130px] rounded-lg' />
            </div>
          </div>
          <div className='w-[341px] h-[149px] flex flex-col items-center justify-center bg-white rounded-lg'>
            <h1 className='text-black font-bold mt-7 text-xl'>Total Appointments</h1>
            <h3 className='m-6 font-bold text-[#C12A2A] text-2xl'>{totalPatients}</h3>
          </div>
          <div className=' w-[341px] h-[149px] flex flex-col items-center justify-center bg-white rounded-lg'>
            <h1 className='text-black font-bold mt-7 text-xl'>Total Doctors</h1>
            <h3 className='m-6 font-bold text-[#C12A2A] text-2xl'>{totalDoctors}</h3>
          </div>
        </div>

        {/* Table*/}
        <div className=" overflow-x-auto shadow-md sm:rounded-lg mt-10 w-[1225px] h-[455px] bg-white overflow-y-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#03071C] dark:text-gray-400 top-0">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Patients
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Doctor
                </th>
                <th scope="col" className="px-6 py-3">
                  Issue
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {
                patientsList.length > 0 ? patientsList.map((patient, index) => (
                  <tr className="odd:bg-white  even:bg-gray-50 even:dark:bg-gray-300 border-b">
                    <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                      {patient.name}
                    </th>
                    <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap" >
                      {patient.doa}
                    </th>
                    <td className="px-6 py-4 text-gray-600">{patient.time}</td>
                    <td className="px-6 py-4 text-gray-600">{patient.doctor}</td>
                    <td className="px-6 py-4 text-gray-600">{patient.issue}</td>
                    <td className="px-6 py-4 text-gray-600">
                      <i
                        className="fa-solid fa-trash text-red-800 hover:text-red-500 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(patient.id);
                        }}
                      ></i>
                      <i
                        className="fa-solid fa-circle-check ml-5 text-green-900 hover:text-green-500 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDone(patient.id);
                        }}
                      ></i>
                    </td>

                  </tr>
                )) : <div className='flex mt-3 ml-6'><p className='text-center text-gray-700 font-medium'>No appointments!</p></div>
              }
            </tbody>
          </table>
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
                    submitPrice();
                    setShowPriceModal(false);
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

export default Dashboard