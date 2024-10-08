import { React, useState, useEffect } from 'react'
import { Line, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import PulseLoader from "react-spinners/PulseLoader";
import axios from 'axios';

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const EarningsChart = ({ data }) => {
  return <Line data={data} />;
};

const Analytics = () => {
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#010822");

  const [holidays, setHolidays] = useState([]);

  const [admissionsList, setAdmissionsList] = useState([]);
  const [patientsList, setPatientsList] = useState([]);

  const [malePatients, setMalePatients] = useState("");
  const [femalePatients, setFemalePatients] = useState("");

  const [maleAdmissions, setMaleAdmissions] = useState("");
  const [femaleAdmissions, setFemaleAdmissions] = useState("");

  const [male, setMale] = useState("");
  const [female, setFemale] = useState("");

  const [total, setTotal] = useState("");

  const [earningsData, setEarningsData] = useState({
    labels: [],
    datasets: [{
      label: 'Monthly Earnings',
      data: [],
      backgroundColor: '#010822',
      borderColor: '#010822',
      borderWidth: 1,
    }],
  });

  const URL = import.meta.env.VITE_BACKEND_URL;

  const fetchEarningsData = async () => {
    try {
      const year = new Date().getFullYear();
      const parentID = localStorage.getItem('id');
      const response = await axios.get(`${URL}/earnings`, {
        params: { year, parentID }
      });

      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const earnings = new Array(12).fill(0);

      response.data.forEach(entry => {
        const { month, earnings: amount } = entry;
        earnings[month - 1] = amount;
      });

      setEarningsData({
        labels: months,
        datasets: [{
          label: 'Monthly Earnings',
          data: earnings,
          backgroundColor: '#010822',
          borderColor: '#010822',
          borderWidth: 1,
        }],
      });
    } catch (error) {
      console.error('Error fetching earnings data:', error);
    }
  };

  const fetchAdmisions = async () => {
    try {
      const parentID = localStorage.getItem('id');

      const response = await axios.get(`${URL}/admissions`, {
        params: { parentID }
      });

      // Update the state with fetched admissions
      setAdmissionsList(response.data);
    } catch (error) {
      console.error('Error fetching admissions:', error);
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

  const computeTotal = () => {
    fetchAdmisions();
    fetchPatients();
    const patients = patientsList.length;
    const admissions = admissionsList.length;
    const total = patients + admissions;
    setTotal(total.toString());
  }

  const fetchGenderPatients = async () => {
    try {
      const parentID = localStorage.getItem('id');

      const response = await axios.get(`${URL}/patients`, { params: { parentID } });
      const patients = response.data;

      const malePatients = patients.filter(patient => patient.gender.toLowerCase() === "male");
      const femalePatients = patients.filter(patient => patient.gender.toLowerCase() === "female");

      setMalePatients(malePatients);
      setFemalePatients(femalePatients);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchGenderAdmissions = async () => {
    try {
      const parentID = localStorage.getItem('id');

      const response = await axios.get(`${URL}/admissions`, { params: { parentID } });
      const admissions = response.data;

      const maleAdmissions = admissions.filter(admission => admission.gender.toLowerCase() === "male");
      const femaleAdmissions = admissions.filter(admission => admission.gender.toLowerCase() === "female");

      setMaleAdmissions(maleAdmissions);
      setFemaleAdmissions(femaleAdmissions);
    } catch (error) {
      console.error('Error fetching admissions:', error);
    }
  }

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

  const computeGenderTotal = () => {
    fetchGenderPatients();
    fetchGenderAdmissions();
    const male = malePatients.length + maleAdmissions.length;
    const female = femalePatients.length + femaleAdmissions.length;
    setMale(male.toString());
    setFemale(female.toString());
  }

  useEffect(() => {
    fetchEarningsData();
    getHolidays();
  }, [])

  useEffect(() => {
    computeTotal();
    computeGenderTotal();
  }, [admissionsList, patientsList, total, male, female])

  return (
    <div className='bg-[#d0d0d0] min-h-screen flex flex-col md:flex-row'>
      {/* Left */}
      <div className='pt-6 pb-6 flex flex-col md:ml-72 ml-5 mr-5'>
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
        <div className='flex flex-col mt-5 items-center md:w-[590px] h-[285px] bg-white rounded-xl'>
          <h1 className='mt-10 font-bold text-[#C12A2A] text-2xl'>Total Active Patients</h1>
          <h5 className='font-medium text-2xl mt-5 text-center'>{total}</h5>
          <div className='flex gap-40 mt-16'>
            <div>
              <h1 className='font-bold text-[#C12A2A] text-2xl'>Male</h1>
              <h5 className='font-medium text-lg text-center'>{male}</h5>
            </div>
            <div>
              <h1 className='font-bold text-[#C12A2A] text-2xl'>Female</h1>
              <h5 className='font-medium text-lg text-center'>{female}</h5>
            </div>
          </div>

        </div>
      </div>

      {/* Right */}
      <div>
        <div className='bg-white md:w-[580px] h-[650px] mt-5 md:ml-6 ml-5 mr-5 rounded-lg p-5'>
          <h1 className='text-center font-bold text-[#C12A2A] text-2xl'>Upcoming Holidays</h1>

          {/* Table */}
          <div class="overflow-x-auto mt-5 max-h-[560px] overflow-auto">
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
                            {holiday.date.iso.slice(0, 10)}
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

export default Analytics;