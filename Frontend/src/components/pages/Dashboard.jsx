import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import dashIMG from '../../assets/dashboard.png'
import axios from 'axios'

const Dashboard = () => {
  const [greeting, setGreeting] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [admin, setAdmin] = useState('')
  
  const [patientsList, setPatientsList] = useState([])
  const [doctorsList, setDoctorsList] = useState([])

  const [totalPatients, setTotalPatients] = useState("")
  const [totalDoctors, setTotalDoctors] = useState("")

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

    const finalTime = `${(hours % 12).toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`
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
      const response = await axios.get("http://localhost:3000/patients");
      setPatientsList(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("http://localhost:3000/doctors");
      setDoctorsList(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  }

  const setTotal = async () => {
    await fetchDoctors()
    await fetchPatients()

    const totalDoctors = doctorsList.length.toString()
    const totalPatients = patientsList.length.toString()
    
    setTotalDoctors(totalDoctors)
    setTotalPatients(totalPatients)
  }

  useEffect(() => {
    setAdmin(localStorage.getItem('firstName'))
    addID()
    getGreeting()
    getTime()
    getDate()
    fetchPatients()

    const intervalId = setInterval(getTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    setTotal()
  }, [patientsList, doctorsList])

  return (
    <div className='bg-[#d0d0d0] min-h-screen'>
      <div className='pt-6 pb-6 flex flex-col ml-72'>
        {/* Top part */}
        <div className='flex gap-9'>
          <div className='bg-black w-[470px] h-[149px] flex  items-center bg-white rounded-lg'>
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
          <div className='bg-black w-[341px] h-[149px] flex flex-col items-center justify-center bg-white rounded-lg'>
            <h1 className='text-black font-bold mt-7 text-xl'>Total Appointments</h1>
            <h3 className='m-6 font-bold text-[#C12A2A] text-2xl'>{totalPatients}</h3>
          </div>
          <div className='bg-black w-[341px] h-[149px] flex flex-col items-center justify-center bg-white rounded-lg'>
            <h1 className='text-black font-bold mt-7 text-xl'>Total Doctors</h1>
            <h3 className='m-6 font-bold text-[#C12A2A] text-2xl'>{totalDoctors}</h3>
          </div>
        </div>

        {/* Table*/}
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10 w-[1225px] h-[455px] bg-white overflow-y-auto">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#03071C] dark:text-gray-400 sticky top-0">
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
                patientsList.map((patient, index) => (
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
                      <a href="#" className="font-medium text-black hover:underline">
                        <i class="fa-solid fa-trash"></i>
                        <i class="fa-solid fa-pen-to-square ml-3">
                        </i>
                      </a>
                    </td>
                  </tr>

                ))
              }


            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Dashboard