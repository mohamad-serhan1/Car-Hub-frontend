import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Services = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cars, setCars] = useState([]);
    const [error1, setError1] = useState("");
    const [selectedCar, setSelectedCar] = useState(null); 
    const [selectedService, setSelectedService] = useState(null); // Track the selected service

    const userId = localStorage.getItem("UserId");
    const ownerId = localStorage.getItem("UserId");

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        axios.get('http://localhost:3001/service')
            .then(response => {
                setServices(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/cars/owner/${ownerId}`)
            .then(response => {
                setCars(response.data);
            })
            .catch(err => {
                setError1(err.response?.data?.error || err.message || "An error occurred");
            });
    }, []);

    const requestService = async (service_id, car_id) => {
        try {
            const response = await axios.post('http://localhost:3001/serviceReq', {
                service_id,
                user_id: userId,
                car_id
            });
            console.log('Service request created:', response.data);
            alert('Service request created successfully!');
        } catch (error) {
            console.error('Error creating service request:', error);
            alert('Failed to create service request.');
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    const handleCreate = () => {
        navigate('/register');
    };

    const handleRequestService = () => {
        if (isAuthenticated && userId && selectedCar && selectedService) {
            requestService(selectedService, selectedCar);
            setSelectedService(null); // Reset after request
        } else {
            alert('Please select a car and log in to request a service.');
        }
    };

    const openDialogForService = (service_id) => {
        setSelectedService(service_id);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className='h-full bg-gray-100'>
            <div className="bg-contain bg-right bg-no-repeat bg-black justify-end flex items-center relative">
                <img className='h-64 justify-self-end' src="samuele-errico-piccarini-FMbWFDiVRPs-unsplash.jpg" alt="" />
                <div className='absolute left-11 bottom-16 text-white'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/components">Services</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <div className='grid grid-cols-3 lg:p-20 gap-10'>
                {services.map((service) => (
                    <Card key={service.id} className="w-[350px] bg-orange-500 text-white rounded-xl">
                        <CardHeader className="text-center">
                            <CardTitle>{service.service_name}</CardTitle>
                            <CardDescription>{service.description}</CardDescription>
                        </CardHeader>
                        <CardFooter className="flex justify-center">
                            {isAuthenticated ? (
                                <>
                                    <Dialog onOpenChange={() =>{{selectedService === service.id}; openDialogForService(service.id)}}>
                                        <DialogTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="bg-black rounded-md"
                                            >
                                                Request Service
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-[425px] bg-white">
                                            <DialogHeader>
                                                <DialogTitle>Choose Your Car</DialogTitle>
                                                                                        </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Select onValueChange={setSelectedCar}>
                                                        <SelectTrigger className="w-[180px]">
                                                            <SelectValue placeholder="Select a Car" />
                                                        </SelectTrigger>
                                                        <SelectContent className="bg-gray-200">
                                                            <SelectGroup>
                                                                <SelectLabel>Cars</SelectLabel>
                                                                {cars.map((car) => (
                                                                    <SelectItem key={car.id} value={car.id} className="hover:bg-gray-400">
                                                                        {car.model}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectGroup>
                                                        </SelectContent>
                                                    </Select>

                                                </div>
                                            </div>
                                            <DialogFooter>
                                                <Button onClick={handleRequestService}>Request Service</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </>
                            ) : (
                                        <AlertDialog>
                                <AlertDialogTrigger asChild>
                                        <Button variant="outline" className="bg-black rounded-md">Request Service</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-white">
                                        <AlertDialogHeader>
                                            <div className="flex justify-between items-start bg-white ">
                                                <AlertDialogTitle className="text-lg font-semibold">You need to be logged in to request a service.</AlertDialogTitle>
                                                <AlertDialogCancel className="border-none p-2 px-4" asChild>
                                                    <span aria-hidden="true" className='cursor-pointer'>&times;</span>
                                                </AlertDialogCancel>
                                            </div>
                                        </AlertDialogHeader>
                                        <AlertDialogDescription>
                                            Please log in to your account to request a service. If you don't have an account, create one.
                                        </AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel onClick={handleCreate}>Create</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleLogin}>Login</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Services;
