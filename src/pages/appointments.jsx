import React, { useEffect, useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import axios from 'axios'
const appointments = () => {
    const [appointment, setAppointment] = useState([])
    const [error, setError] = useState([])
    const ownerId = localStorage.getItem("UserId")
    useEffect(() => {
        axios.get(`http://localhost:3001/appointment/user/${ownerId}`) // Replace with your API URL
            .then(response => {
                setAppointment(response.data);
            })
            .catch(err => {
                setError(err.response?.data?.error || err.message || "An error occurred");
            });
    }, []);
    localStorage.setItem("appointment",appointment.length )
    console.log(appointment)
    return (
        <div className='h-full min-h-screen bg-gray-100'>
            <div className=" bg-contain bg-right bg-no-repeat bg-black justify-end flex items-center relative">
                <img className='h-64 justify-self-end' src="samuele-errico-piccarini-FMbWFDiVRPs-unsplash.jpg" alt="" />
                <div className='absolute left-11 bottom-16 text-white'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/components">Appointments</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <div className="p-4">
                <h2 className="text-2xl font-bold mb-4">Appointments</h2>
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Car Model</th>
                            <th className="border border-gray-300 p-2">Service Type</th>
                            <th className="border border-gray-300 p-2">Appointment Date</th>
                            <th className="border border-gray-300 p-2">Notes</th>
                            <th className="border border-gray-300 p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointment.map(appointment => (
                            <tr key={appointment.id}>
                                <td className="border border-gray-300 p-2">{appointment.car_model}</td>
                                <td className="border border-gray-300 p-2">{appointment.service_type}</td>
                                <td className="border border-gray-300 p-2">
                                    {new Date(appointment.appointment_date).toLocaleDateString()}
                                </td>                              
                                  <td className="border border-gray-300 p-2">{appointment.notes}</td>
                                <td className="border border-gray-300 p-2">{appointment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default appointments