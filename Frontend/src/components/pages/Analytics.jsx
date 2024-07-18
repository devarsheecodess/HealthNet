import { React, useState, useEffect } from 'react'
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import PulseLoader from "react-spinners/PulseLoader";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};


const earningsData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  datasets: [{
    label: 'Monthly Earnings',
    data: [312000, 193000, 17000, 322000, 150300, 230300, 200300, 138000, 210300, 193000, 230300, 230000],
    backgroundColor: '#010822',
    borderColor: '#010822',
    borderWidth: 1,
  }],
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EarningsChart = ({ data }) => {
  return <Line data={data} />;
};

const Analytics = () => {
  //For Loader
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#010822");

  const [holidays, setHolidays] = useState([]);

  const getHolidays = async () => {
    setLoading(true)
    const date = new Date();
    const year = date.getFullYear();
    const API_KEY = "GO4UZGtTTh2Qw4mJC46YG5BLlwGGh6Vm"
    const resp = await fetch(`https://calendarific.com/api/v2/holidays?&api_key=${API_KEY}&country=IN&year=${year}`)
    const data = await resp.json();
    const upcoming = data.response.holidays.filter((holiday) => new Date(holiday.date.iso) > date)
    setHolidays(upcoming.slice(0, 10));
    setLoading(false)
  }

  useEffect(() => {
    getHolidays();
  }, [])

  return (
    <div className='bg-[#d0d0d0] min-h-screen flex'>
      {/* Left */}
      <div className='pt-6 pb-6 flex flex-col ml-72'>
        {/* Graph */}
        <div>
          <div className='bg-white p-5 rounded-lg'>
            <h1 className='font-bold text-[#C12A2A] text-lg'>Hospital Earnings</h1>
            <div style={{ maxWidth: '600px', maxHeight: '300px' }}>
              <EarningsChart data={earningsData} />
            </div>
          </div>
        </div>

        {/* Total Patients*/}
        <div className='flex flex-col mt-5 items-center w-[590px] h-[285px] bg-white rounded-xl'>
          <h1 className='mt-10 font-bold text-[#C12A2A] text-2xl'>Total Patients Visited</h1>
          <h5 className='font-medium text-2xl mt-5 text-center'>5000</h5>
          <div className='flex gap-40 mt-16'>
            <div>
              <h1 className='font-bold text-[#C12A2A] text-2xl'>Male</h1>
              <h5 className='font-medium text-lg text-center'>2500</h5>
            </div>
            <div>
              <h1 className='font-bold text-[#C12A2A] text-2xl'>Female</h1>
              <h5 className='font-medium text-lg text-center'>2500</h5>
            </div>
          </div>

        </div>
      </div>

      {/* Right */}
      <div>
        <div className='bg-white w-[580px] h-[650px] mt-5 ml-10 rounded-lg p-5'>
          <h1 className='text-center font-bold text-[#C12A2A] text-2xl'>Upcoming Holidays</h1>

          {/* Table */}
          <div class="relative overflow-x-auto mt-5 max-h-[560px] overflow-auto">
            <div class='flex flex-wrap'>
              <table class="w-full text-sm text-left rtl:text-right">
                <thead class="text-xs text-[#C12A2A] uppercase bg-[#e27979]">
                  <tr>
                    <th scope="col" class="px-6 py-3">
                      Holiday
                    </th>
                    <th scope="col" class="px-6 py-3">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (<div className='flex justify-center items-center mt-5 mb-5 ml-44'>
                    <PulseLoader
                      color={color}
                      loading={loading}
                      cssOverride={override}
                      size={15}
                      className='text-center'
                    />
                  </div>)}
                  {
                    holidays.map((holiday) => {
                      return (
                        <tr class="bg-white dark:bg-gray-800">
                          <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {holiday.name}
                          </th>
                          <td class="px-6 py-4 text-white">
                            {holiday.date.iso}
                          </td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Analytics