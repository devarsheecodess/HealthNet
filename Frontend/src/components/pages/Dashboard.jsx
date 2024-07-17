import { React, useEffect, useState } from 'react'
import dashIMG from '../../assets/dashboard.png'

const Dashboard = () => {
  const [greeting, setGreeting] = useState('')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [admin, setAdmin] = useState('')

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

  useEffect(() => {
    getGreeting()
    getTime()
    getDate()

    const intervalId = setInterval(getTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className='bg-[#d0d0d0] min-h-screen'> {/* Change the background color and ensure it covers the full screen height */}
      <div className='pt-6 pb-6 flex flex-col ml-72'>
        {/* Top part */}
        <div className='flex gap-9'>
          <div className='bg-black w-[470px] h-[149px] flex  items-center bg-white rounded-lg'>
            <div className='ml-7 mr-20'>
              <h1 className='text-black font-bold mt-1 text-xl'>{greeting} Admin!</h1>
              <h5 className='font-semibold mt-6 text-sm'>{date}</h5>
              <h5 className='text-[#C12A2A] font-bold text-lg'>{time}</h5>
            </div>

            {/* Image div */}
            <div>
              <img src={dashIMG} alt='Dashboard' className='w-[130px] h-[130px] rounded-lg' />
            </div>
          </div>
          <div className='bg-black w-[341px] h-[149px] flex flex-col items-center justify-center bg-white rounded-lg'>
            <h1 className='text-black font-bold mt-7 text-xl'>Total Patients</h1>
            <h3 className='m-6 font-bold text-[#C12A2A] text-2xl'>1000</h3>
          </div>
          <div className='bg-black w-[341px] h-[149px] flex flex-col items-center justify-center bg-white rounded-lg'>
            <h1 className='text-black font-bold mt-7 text-xl'>Total Doctors</h1>
            <h3 className='m-6 font-bold text-[#C12A2A] text-2xl'>1000</h3>
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
              <tr className="odd:bg-white  even:bg-gray-50 even:dark:bg-gray-300 border-b">
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Apple MacBook Pro 17"
                </th>
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Apple MacBook Pro 17"
                </th>
                <td className="px-6 py-4 text-gray-600">
                  Silver
                </td>
                <td className="px-6 py-4 text-gray-600">
                  Laptop
                </td>
                <td className="px-6 py-4 text-gray-600">
                  $2999
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <a href="#" className="font-medium text-black hover:underline"><i class="fa-solid fa-trash"></i><i class="fa-solid fa-pen-to-square ml-3"></i></a>
                </td>
              </tr>

              <tr className="odd:bg-white  even:bg-gray-50 even:dark:bg-gray-300 border-b">
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Microsoft Surface Pro
                </th>
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Microsoft Surface Pro
                </th>
                <td className="px-6 py-4 text-gray-600">
                  White
                </td>
                <td className="px-6 py-4 text-gray-600">
                  Laptop PC
                </td>
                <td className="px-6 py-4 text-gray-600">
                  $1999
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <a href="#" className="font-medium text-black hover:underline"><i class="fa-solid fa-trash"></i><i class="fa-solid fa-pen-to-square ml-3"></i></a>
                </td>
              </tr>

              <tr className="odd:bg-white  even:bg-gray-50 even:dark:bg-gray-300 border-b">
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Magic Mouse 2
                </th>
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4 text-gray-600">
                  Black
                </td>
                <td className="px-6 py-4 text-gray-600">
                  Accessories
                </td>
                <td className="px-6 py-4 text-gray-600">
                  $99
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <a href="#" className="font-medium text-black hover:underline"><i class="fa-solid fa-trash"></i><i class="fa-solid fa-pen-to-square ml-3"></i></a>
                </td>
              </tr>

              <tr className="odd:bg-white  even:bg-gray-50 even:dark:bg-gray-300 border-b">
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Google Pixel Phone
                </th>
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Google Pixel Phone
                </th>
                <td className="px-6 py-4 text-gray-600">
                  Gray
                </td>
                <td className="px-6 py-4 text-gray-600">
                  Phone
                </td>
                <td className="px-6 py-4 text-gray-600">
                  $799
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <a href="#" className="font-medium text-black hover:underline"><i class="fa-solid fa-trash"></i><i class="fa-solid fa-pen-to-square ml-3"></i></a>
                </td>
              </tr>

              <tr className="odd:bg-white  even:bg-gray-50 even:dark:bg-gray-300 border-b">
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Magic Mouse 2
                </th>
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4 text-gray-600">
                  Black
                </td>
                <td className="px-6 py-4 text-gray-600">
                  Accessories
                </td>
                <td className="px-6 py-4 text-gray-600">
                  $99
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <a href="#" className="font-medium text-black hover:underline"><i class="fa-solid fa-trash"></i><i class="fa-solid fa-pen-to-square ml-3"></i></a>
                </td>
              </tr>

              <tr className="odd:bg-white  even:bg-gray-50 even:dark:bg-gray-300 border-b">
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Google Pixel Phone
                </th>
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Google Pixel Phone
                </th>
                <td className="px-6 py-4 text-gray-600">
                  Gray
                </td>
                <td className="px-6 py-4 text-gray-600">
                  Phone
                </td>
                <td className="px-6 py-4 text-gray-600">
                  $799
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <a href="#" className="font-medium text-black hover:underline"><i class="fa-solid fa-trash"></i><i class="fa-solid fa-pen-to-square ml-3"></i></a>
                </td>
              </tr>

              <tr className="odd:bg-white  even:bg-gray-50 even:dark:bg-gray-300 border-b">
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Magic Mouse 2
                </th>
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4 text-gray-600">
                  Black
                </td>
                <td className="px-6 py-4 text-gray-600">
                  Accessories
                </td>
                <td className="px-6 py-4 text-gray-600">
                  $99
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <a href="#" className="font-medium text-black hover:underline"><i class="fa-solid fa-trash"></i><i class="fa-solid fa-pen-to-square ml-3"></i></a>
                </td>
              </tr>

              <tr className="odd:bg-white  even:bg-gray-50 even:dark:bg-gray-300 border-b">
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Google Pixel Phone
                </th>
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Google Pixel Phone
                </th>
                <td className="px-6 py-4 text-gray-600">
                  Gray
                </td>
                <td className="px-6 py-4 text-gray-600">
                  Phone
                </td>
                <td className="px-6 py-4 text-gray-600">
                  $799
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <a href="#" className="font-medium text-black hover:underline"><i class="fa-solid fa-trash"></i><i class="fa-solid fa-pen-to-square ml-3"></i></a>
                </td>
              </tr>

              <tr className="odd:bg-white  even:bg-gray-50 even:dark:bg-gray-300 border-b">
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Magic Mouse 2
                </th>
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4 text-gray-600">
                  Black
                </td>
                <td className="px-6 py-4 text-gray-600">
                  Accessories
                </td>
                <td className="px-6 py-4 text-gray-600">
                  $99
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <a href="#" className="font-medium text-black hover:underline"><i class="fa-solid fa-trash"></i><i class="fa-solid fa-pen-to-square ml-3"></i></a>
                </td>
              </tr>

              <tr className="odd:bg-white  even:bg-gray-50 even:dark:bg-gray-300 border-b">
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Google Pixel Phone
                </th>
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Google Pixel Phone
                </th>
                <td className="px-6 py-4 text-gray-600">
                  Gray
                </td>
                <td className="px-6 py-4 text-gray-600">
                  Phone
                </td>
                <td className="px-6 py-4 text-gray-600">
                  $799
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <a href="#" className="font-medium text-black hover:underline"><i class="fa-solid fa-trash"></i><i class="fa-solid fa-pen-to-square ml-3"></i></a>
                </td>
              </tr>

              <tr className="odd:bg-white  even:bg-gray-50 even:dark:bg-gray-300 border-b">
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Magic Mouse 2
                </th>
                <th scope="row" className="px-6 py-4 text-gray-600 font-medium  whitespace-nowrap">
                  Magic Mouse 2
                </th>
                <td className="px-6 py-4 text-gray-600">
                  Black
                </td>
                <td className="px-6 py-4 text-gray-600">
                  Accessories
                </td>
                <td className="px-6 py-4 text-gray-600">
                  $99
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <a href="#" className="font-medium text-black hover:underline"><i class="fa-solid fa-trash"></i><i class="fa-solid fa-pen-to-square ml-3"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default Dashboard