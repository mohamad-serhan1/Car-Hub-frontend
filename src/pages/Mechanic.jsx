import React, { useState, useEffect } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink } from '@/components/ui/breadcrumb';
import axios from 'axios';
import { Button } from '@/components/ui/button';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { format, isBefore } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

const Mechanic = () => {
    const [date, setDate] = useState(null);
    const [notes, setNotes] = useState('');
    const [requests, setRequests] = useState([]);
    const [cars, setCars] = useState({});
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [requestId, setRequestId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userInitials, setUserInitials] = useState("");
    const [userName, setUserName] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        const firstName = localStorage.getItem("firstName");
        const lastName = localStorage.getItem("lastName");

        if (token && firstName && lastName) {
            setIsAuthenticated(true);
            setUserName(firstName);
            const initials = `${firstName[0]}${lastName[0]}`;
            setUserInitials(initials.toUpperCase());
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("firstName");
        localStorage.removeItem("lastName");
        localStorage.removeItem("UserId");
        localStorage.removeItem("userRole");

        setIsAuthenticated(false);
        setUserName("");
        setUserInitials("");

        window.location.href = "/"; // Use navigate instead of window.location.href
    };
    useEffect(() => {
        axios.get('http://localhost:3001/serviceReq')
            .then(response => {
                setRequests(response.data);
                const carRequests = response.data.map(request =>
                    axios.get(`http://localhost:3001/cars/${request.car_id}`)
                );
                Promise.all(carRequests)
                    .then(responses => {
                        const carData = {};
                        responses.forEach(response => {
                            const car = response.data;
                            carData[car.id] = car;
                        });
                        setCars(carData);
                    })
                    .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
    }, []);

    const handleAddAppointment = () => {
        if (!date) {
            console.log('Please select an appointment date.');
            return;
        }
    
        const appointmentData = {
            car_id: selectedRequest.car_id,
            customer_id: selectedRequest.user_id,
            mechanic_id: 4,
            service_type: selectedRequest.service_name,
            appointment_date: date.toISOString(),
            status: 'Scheduled',
            notes: notes,
        };
    
        axios.post('http://localhost:3001/appointment', appointmentData)
            .then(response => {
                console.log('Appointment added:', response.data);
    
                // Delete the service request after adding the appointment
                axios.delete(`http://localhost:3001/serviceReq/${requestId}`)
                    .then(() => {
                        // Update the state to remove the deleted request
                        setRequests(prevRequests => prevRequests.filter(request => request.request_id !== requestId));
    
                        // Close the dialog and reset the form fields
                        setIsDialogOpen(false);
                        setSelectedRequest(null);
                        setDate(null);
                        setNotes('');
    
                        console.log('Service request deleted and UI updated');
                    })
                    .catch(error => console.error('Error deleting service request:', error));
            })
            .catch(error => console.error('Error adding appointment:', error));
    };



    const openDialog = (request) => {
        setSelectedRequest(request);
        setRequestId(request.request_id)
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        setSelectedRequest(null);
        setDate(null);
        setNotes('');
    };
    const today = new Date();

    return (
        <div className='min-h-screen'>
            <div className="bg-contain bg-right bg-no-repeat bg-black justify-end flex items-center relative">

                <img className='h-64 justify-self-end' src="samuele-errico-piccarini-FMbWFDiVRPs-unsplash.jpg" alt="" />
                <div className='absolute left-11 bottom-16 text-white'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Mechanic</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <div className='p-10'>
                <div className='flex justify-between'>

                    <h1 className='font-bold text-3xl'>Service Requests</h1>
                    <Button onClick={handleLogout} className="bg-black hover:bg-black text-white rounded">Logout</Button>
                </div>
                <ul className='pl-4 border-b py-7'>
                    {requests.map(request => (
                        <li key={request.id} className='p-4'>

                            <div className=' w-1/2 '>
                                <div>
                                    <span className='font-bold'>{request.service_name} </span>
                                    requested by Customer <span className='font-bold pr-2 text-lg'>{request.firstName}</span>
                                    with Car Model <span className='font-bold text-lg'>{cars[request.car_id]?.model || 'Loading...'}</span>
                                </div>
                                <div className='flex justify-end'>
                                    {request.status == 'pending' ? (
                                        <p>Responded</p>
                                    ) : (

                                        <Button className="bg-black rounded text-white  hover:bg-[#000000c0]" onClick={() => openDialog(request)}>
                                           Book Appointment
                                        </Button>
                                    )}
                                </div>
                            </div>

                        </li>
                    ))}
                </ul>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={closeDialog}>
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Car Details and Appointment</DialogTitle>
                        <DialogDescription>
                            Review car details and add to appointments.
                        </DialogDescription>
                    </DialogHeader>
                    {selectedRequest && cars[selectedRequest.car_id] && (
                        <div className="grid gap-4 py-4">
                            <p htmlFor="carModel" className="text-center font-bold text-xl">{cars[selectedRequest.car_id].model || ''} ({cars[selectedRequest.car_id].year || ''})</p>

                            <div className="grid grid-cols-2 items-center gap-4">
                                <Label htmlFor="appointmentDate" className="text-right">Appointment Date:</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-white">
                                        <Calendar
                                            required
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                            disabled={(day) => isBefore(day, today)} // Disable past dates

                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="grid grid-cols-2 items-center gap-4">
                                <Label htmlFor="notes" className="text-right">Notes:</Label>
                                <Input
                                    required
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    id="notes"
                                    name="notes"
                                    placeholder="Add any notes"
                                    className="col-span-1"
                                />
                            </div>
                        </div>
                    )}
                    <DialogFooter>
                        <Button
                            onClick={handleAddAppointment}
                            disabled={!date || !notes.trim()}
                            className={!date || !notes.trim() ? 'bg-gray-300 cursor-not-allowed' : ''}
                        >
                            Submit
                        </Button>                      
                         <Button onClick={closeDialog} variant="outline">Cancel</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Mechanic;
