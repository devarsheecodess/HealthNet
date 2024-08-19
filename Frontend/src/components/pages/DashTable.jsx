import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



const DashTable = () => {

    const [patientsList, setPatientsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const URL = import.meta.env.VITE_BACKEND_URL;
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [price, setPrice] = useState(0);
    const [doneID, setDoneID] = useState('')

    const fetchPatients = async () => {
        try {
            setLoading(true);
            const parentID = localStorage.getItem('id');
            const response = await axios.get(`${URL}/patients`, {
                params: { parentID }
            });

            setPatientsList(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching patients:', error);
            toast.error('Failed to load patients.');
        } finally {
            setLoading(false);
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
            const postResponse = await axios.post(`${URL}/earnings`, { year, month, earnings, parentID });
            console.log('Post response:', postResponse.data);

            // Attempt to delete the patient only if posting earnings was successful
            const deleteResponse = await axios.delete(`${URL}/patients`, { params: { id: doneID } });
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

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this patient?");
        if (!confirmDelete) return;
        try {
            const response = await axios.delete(`${URL}/patients`, { params: { id } });
            console.log(response.data);
            toast.success("Patient deleted successfully!");
            fetchPatients();
        } catch (error) {
            console.error('Error deleting patient:', error);
            toast.error('Failed to delete patient. Please try again.');
        }
    };

    const handleDone = (id) => {
        try {
            setShowPriceModal(true);
            setDoneID(id);
        } catch (error) {
            console.error('Error marking patient as done:', error);
            toast.error('Failed to mark patient as done. Please try again.');
        }
    };

    useEffect(() => {
        fetchPatients();
    }, [patientsList.length]);

    return (
        <div>
            {
                loading ? (<div className='self-center mt-10'>
                    <Skeleton height={440} />
                </div>) : (
                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-[#03071C] dark:text-gray-400 overflow-x-auto ">
                                <tr>
                                    <th scope="col" className="px-6 py-3">Patients</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                    <th scope="col" className="px-6 py-3">Time</th>
                                    <th scope="col" className="px-6 py-3">Doctor</th>
                                    <th scope="col" className="px-6 py-3">Issue</th>
                                    <th scope="col" className="px-6 py-3">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patientsList.length > 0 ? (
                                    patientsList.map((patient) => (
                                        <tr key={patient.id} className="overflow-x-auto odd:bg-white even:bg-gray-50 even:dark:bg-gray-300 border-b">
                                            <th scope="row" className="px-6 py-4 text-gray-600 font-medium whitespace-nowrap">{patient.name}</th>
                                            <td className="px-6 py-4 text-gray-600">{patient.doa}</td>
                                            <td className="px-6 py-4 text-gray-600">{patient.time}</td>
                                            <td className="px-6 py-4 text-gray-600">{patient.doctor}</td>
                                            <td className="px-6 py-4 text-gray-600">{patient.issue}</td>
                                            <td className="px-6 py-4 text-gray-600">
                                                <i className="fa-solid fa-trash text-red-800 hover:text-red-500 cursor-pointer" onClick={() => handleDelete(patient.id)}></i>
                                                <i className="fa-solid fa-circle-check ml-5 text-green-900 hover:text-green-500 cursor-pointer" onClick={() => handleDone(patient.id)}></i>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center text-gray-700 font-medium mt-10">No appointments!</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
    )
}
{
    showPriceModal && (
        <div className='fixed inset-0 flex justify-center items-center backdrop-blur-sm z-50'>
            <div className='bg-gray-800 text-white p-7 rounded-xl flex flex-col items-center'>
                <button type='button' onClick={() => setShowPriceModal(false)} className='self-end'><i className="fa-solid fa-xmark text-red-500"></i></button>
                <h1 className='font-bold mb-3'>Enter the billing amount of the patient</h1>
                <input
                    className="font-bold text-center mb-3 w-64 p-2 border text-black border-gray-600 rounded"
                    placeholder='Enter the bill of the patient'
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value))}
                />
                <div className="flex gap-4">
                    <button
                        className='bg-blue-700 text-white p-2 rounded-lg'
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
    )
}
        </div >
    );
};

export default DashTable;
