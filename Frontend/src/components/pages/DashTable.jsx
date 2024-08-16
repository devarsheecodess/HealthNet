import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'



const DashTable = () => {

    const [patientsList, setPatientsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const URL = import.meta.env.VITE_BACKEND_URL;


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
                    <div className='bg-white h-[440px] rounded-lg shadow-md'>
                        <div className="overflow-x-auto sm:rounded-lg mt-10 bg-white">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#03071C] dark:text-gray-400">
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
                                            <tr key={patient.id} className="odd:bg-white even:bg-gray-50 even:dark:bg-gray-300 border-b">
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
                                            <td colSpan="6" className="text-center text-gray-700 font-medium">No appointments!</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }

        </div>
    );
};

export default DashTable;
