import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Description } from '@radix-ui/react-alert-dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [error, setError] = useState('');
    const [error1, setError1] = useState('');
    const [success, setSuccess] = useState('');
    const [cars, setCars] = useState([]);
    const [saleCars, setSaleCars] = useState([]);
    const [rentCars, setRentCars] = useState([]);
    const [requests, setRequests] = useState([]);
    const [price, setPrice] = useState(null);
    const [pricePerDay, setPricePerDay] = useState(null);
    const [statusToUpdate, setStatusToUpdate] = useState(null); // New state to track the car status update
    const [selectedCarId, setSelectedCarId] = useState(null); // New state to track selected car ID for update


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
    const initialFormData = {
        model: "",
        year: "",
        status: "available",
        image: "",
        description: "",
        owner_id: 1,
    };

    const [formData, setFormData] = useState(initialFormData);

    const [previewImage, setPreviewImage] = useState(null); // New state for image preview
    const fileInputRef = useRef(null);
    const [isRentDialogOpen, setIsRentDialogOpen] = useState(false);
    const [isSaleDialogOpen, setIsSaleDialogOpen] = useState(false);
    const [rentStatus, setRentStatus] = useState({});
    const [saleStatus, setSaleStatus] = useState({});

    const [formData1, setFormData1] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        role: "mechanic"
    });

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setFormData1({ ...formData1, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:3001/auth/register",
                formData1
            );
            setSuccess("Registration successful!");
            setError("");
        } catch (err) {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                setError(err.response.data.error || "An error occurred");
            } else if (err.request) {
                // The request was made but no response was received
                setError("No response received from the server");
            } else {
                // Something happened in setting up the request that triggered an Error
                setError("Error: " + err.message);
            }
            setSuccess("");
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
            // Create a preview URL for the selected image
            setPreviewImage(URL.createObjectURL(files[0]));
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleAddCar = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        try {
            const response = await axios.post(
                "http://localhost:3001/cars",
                formDataToSend,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setError(""); // Clear any previous errors
            setSuccess("Car added successfully!");
            setFormData(initialFormData); // Reset form data
            setPreviewImage(null)
        } catch (err) {
            if (err.response) {
                // Error from the server response
                setError(err.response.data.error || "An error occurred");
            } else if (err.request) {
                // No response received
                setError("No response received from the server");
            } else {
                // Error setting up the request
                setError("Error: " + err.message);
            }
            setSuccess(""); // Clear any previous success messages
        }
    };


    useEffect(() => {
        axios.get('http://localhost:3001/cars/owner/1') // Replace with your API URL
            .then(response => {
                setCars(response.data);
            })
            .catch(err => {
                setError1(err.response?.data?.error || err.message || "An error occurred");
            });
    }, [cars]);
    useEffect(() => {
        axios.get(`http://localhost:3001/carDetails/for rent`) // Replace with your API URL
            .then(response => {
                setRentCars(response.data);
            })
            .catch(err => {
                setError1(err.response?.data?.error || err.message || "An error occurred");
            });
    }, [rentCars]);
    useEffect(() => {
        axios.get(`http://localhost:3001/carDetails/for sale`) // Replace with your API URL
            .then(response => {
                setSaleCars(response.data);
            })
            .catch(err => {
                setError1(err.response?.data?.error || err.message || "An error occurred");
            });
    }, [saleCars]);
    useEffect(() => {
        axios.get('http://localhost:3001/carDetails/request') // Replace with your API URL
            .then(response => {
                setRequests(response.data);
            })
            .catch(err => {
                setError1(err.response?.data?.error || err.message || "An error occurred");
            });
    }, [requests]);

    const handleFileSelect = () => {
        fileInputRef.current.click(); // Trigger the hidden file input click
    };
    const handleAddCarForRent = async () => {
        try {
            await axios.post(`http://localhost:3001/rental`, { car_id: selectedCarId, price_per_day: pricePerDay, user_id: 1, status: "Available" });
            await axios.patch(`http://localhost:3001/cars/status/${selectedCarId}`, { status: 'for rent' });
            setSuccess("Car added for rent successfully!");
            setStatusToUpdate('added for rent');
            setCars(cars.map(car => car.id === selectedCarId ? { ...car, status: 'for rent' } : car));
            setIsRentDialogOpen(false); // Close the dialog
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };

    const handleAddCarForSale = async () => {
        try {
            await axios.post(`http://localhost:3001/sale`, { car_id: selectedCarId, price, user_id: 1 });
            await axios.patch(`http://localhost:3001/cars/status/${selectedCarId}`, { status: 'for sale' });
            setSuccess("Car added for sale successfully!");
            setStatusToUpdate('added for sale');
            setCars(cars.map(car => car.id === selectedCarId ? { ...car, status: 'for sale' } : car));
            setIsSaleDialogOpen(false); // Close the dialog
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };

    const handlePricePerDayChange = (e) => {
        setPricePerDay(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };


    const handleCancelAction = async (status, carId) => {
        try {
            await axios.patch(`http://localhost:3001/cars/status/${carId}`, { status: 'available' });
            if (status === 'for rent') {
                await axios.delete(`http://localhost:3001/rental/carId/${carId}`);
            } else if (status === 'for sale') {
                await axios.delete(`http://localhost:3001/sale/carId/${carId}`);
            }
            setSuccess("Action canceled successfully!");
            setStatusToUpdate(null);
            setCars(cars.map(car => car.id === carId ? { ...car, status: 'available' } : car));
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };
    const handleAcceptRequest = async (carId) => {
        try {
            await axios.patch(`http://localhost:3001/cars/status/${carId}`, { status: 'for sale' });
            setCars(cars.map(car => car.id === selectedCarId ? { ...car, status: 'for sale' } : car));
        } catch (error) {
            setError(err.response?.data?.error || "An error occurred");
        }
    }
    const handleRejectRequest = async (carId) => {
        try {
            await axios.patch(`http://localhost:3001/cars/status/${carId}`, { status: 'available' });
            setCars(cars.map(car => car.id === selectedCarId ? { ...car, status: 'for sale' } : car));
        } catch (error) {
            setError(err.response?.data?.error || "An error occurred");
        }
    }
    const handleDeleteCar = async (carId) => {
        const token = localStorage.getItem('authToken');

        try {
            await axios.delete(`http://localhost:3001/cars/${carId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setSuccess("Car deleted successfully!");
            setCars(cars.filter(car => car.id !== carId)); // Update the state to remove the deleted car
        } catch (err) {
            if (err.response) {
                // Error response from the server
                setError(err.response.data.error || "An error occurred");
            } else if (err.request) {
                // No response received
                setError("No response received from the server");
            } else {
                // Error setting up the request
                setError("Error: " + err.message);
            }
            setSuccess(""); // Clear any previous success messages
        }
    };

    const allCars = saleCars.length + rentCars.length;

    const renderContent = () => {
        switch (activeTab) {
            case 'Dashboard':
                return (
                    <div>
                        {/* Car Stats */}
                        <div className='grid grid-cols-3 gap-4 mb-6'>
                            <div className='p-10 bg-white shadow-md rounded-lg'>
                                <h3 className='text-2xl font-semibold'>Total Cars</h3>
                                <p className='text-2xl px-1 font-bold'>{allCars}</p>
                            </div>
                            <div className='p-10 bg-white shadow-md rounded-lg'>
                                <h3 className='text-2xl font-semibold'>Cars For Sale</h3>
                                <p className='text-2xl px-1 font-bold'>{saleCars.length}</p>
                            </div>
                            <div className='p-10 bg-white shadow-md rounded-lg'>
                                <h3 className='text-2xl font-semibold'>Cars For Rent</h3>
                                <p className='text-2xl px-1 font-bold'>{rentCars.length}</p>
                            </div>

                        </div>

                        {/* Recent Activity */}
                        <div className='mb-6'>
                            {/* <h3 className='text-2xl font-bold mb-4'>Recent Activities</h3>
                            <div className='p-4 bg-white shadow-md rounded-lg'>
                                <ul>
                                    <li className='mb-2'>Car ID 123 added to inventory.</li>
                                    <li className='mb-2'>Car ID 456 sold.</li>
                                    <li className='mb-2'>Car ID 789 rented.</li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                );
            case 'Add New Car':
                return (
                    <div className='p-4 bg-white shadow-md rounded-lg'>
                        <h3 className='text-2xl font-bold mb-4'>Add New Car</h3>
                        {/* Add New Car Form */}
                        <form onSubmit={handleAddCar}>
                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="model">Car Model</label>
                                <input required onChange={handleChange} value={formData.model} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="model" name="model" type="text" placeholder="Enter car model" />
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="year">Car Year</label>
                                <input required onChange={handleChange} value={formData.year} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="year" name="year" type="text" placeholder="Enter car year" />
                            </div>


                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="image">Car Image</label>
                                <button type="button" onClick={handleFileSelect} className='shadow appearance-none border rounded w-[300px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                    Select
                                </button>
                                {/* Hidden file input */}
                                <input required
                                    ref={fileInputRef}
                                    onChange={handleChange}
                                    className='hidden'
                                    id="image"
                                    name="image"
                                    type="file"
                                />
                                {/* Image preview */}
                                {previewImage && (
                                    <div className='mt-4'>
                                        <img src={previewImage} alt="Image preview" className='w-64 h-40 object-cover rounded-2xl' />
                                    </div>
                                )}
                            </div>

                            <div className='mb-4'>
                                <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="description">Description </label>
                                <input required onChange={handleChange} value={formData.description} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id="description" name="description" type="text" placeholder="Enter car description" />
                            </div>

                            <div className="flex flex-col items-center justify-center mb-4 gap-4">
                                {success && <p className="text-green-600">{success}</p>}
                                {error && <p className="text-red-600">{error}</p>}
                                <Button className="hover:bg-orange-500 rounded-lg" variant='outline' type="submit">Submit</Button>
                            </div>
                        </form>
                    </div>
                );
            case 'Manage Cars':
                return (
                    <div className='p-4 bg-white shadow-md rounded-lg'>
                        <h3 className='text-2xl font-bold mb-4'>Manage Cars</h3>
                        <ul>
                            {cars.map(car => (
                                <li key={car.id} className='mb-4'>
                                    <div className='grid grid-cols-3 items-center border p-5'>
                                        <div>
                                            <img className="w-64 h-40 object-cover bg-center rounded-2xl" src={`http://localhost:3001/${car.image}`} alt="" />
                                        </div>
                                        <div >
                                            <p><span className='text-lg font-semibold'>Car Model:</span> {car.model} </p>
                                            <p><span className='text-lg font-semibold'>Car Year: </span>{car.year} </p>
                                            <p><span className='text-lg font-semibold'>Description: </span>{car.description}</p>

                                        </div>
                                        <div>
                                            {car.status === 'available' && (
                                                <div className='flex gap-5'>
                                                    <Dialog open={isRentDialogOpen} onOpenChange={setIsRentDialogOpen}>
                                                        <DialogTrigger asChild>
                                                            <Button onClick={() => { setSelectedCarId(car.id); setIsRentDialogOpen(true); }} className="bg-orange-500 hover:bg-orange-600 rounded px-4">Add for Rent</Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px] bg-white">
                                                            <DialogHeader>
                                                                <DialogTitle>Add for Rent</DialogTitle>
                                                                <DialogDescription>
                                                                    Add your car for Rent
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="pricePerDay" className="text-right">
                                                                        Price/Day
                                                                    </Label>
                                                                    <Input
                                                                        value={pricePerDay}
                                                                        onChange={handlePricePerDayChange}
                                                                        id="pricePerDay"
                                                                        name="pricePerDay"
                                                                        placeholder="Enter rental price/day"
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <Button onClick={handleAddCarForRent}>Submit</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>

                                                    <Dialog open={isSaleDialogOpen} onOpenChange={setIsSaleDialogOpen}>
                                                        <DialogTrigger asChild>
                                                            <Button onClick={() => { setSelectedCarId(car.id); setIsSaleDialogOpen(true); }} className="bg-green-500 hover:bg-green-600 rounded px-4">Add for Sale</Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px] bg-white">
                                                            <DialogHeader>
                                                                <DialogTitle>Add for Sale</DialogTitle>
                                                                <DialogDescription>
                                                                    Add your car for sale
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="price" className="text-right">
                                                                        Price
                                                                    </Label>
                                                                    <Input
                                                                        value={price}
                                                                        onChange={handlePriceChange}
                                                                        id="price"
                                                                        name="price"
                                                                        placeholder="Enter sale price"
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <Button onClick={handleAddCarForSale}>Add for Sale</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            )}
                                            {car.status === 'for rent' && (
                                                <div>
                                                    <span className='bg-orange-500 px-4 py-2 rounded'>Added for Rent</span>
                                                    <Button onClick={() => { setSelectedCarId(car.id); handleCancelAction(car.status, car.id); }}>Cancel</Button>
                                                </div>
                                            )}
                                            {car.status === 'for sale' && (
                                                <div>
                                                    <span className='bg-green-500 px-4 py-2 rounded'>Added for Sale</span>
                                                    <Button onClick={() => { setSelectedCarId(car.id); handleCancelAction(car.status, car.id); }}>Cancel</Button>
                                                </div>
                                            )}
                                            {car.status === 'sold' && (
                                                <div>
                                                    <span className='bg-black px-4 py-2 rounded text-white'>Car Sold</span>
                                                </div>
                                            )}
                                            {car.status === 'rented' && (
                                                <div>
                                                    <span className='bg-black px-4 py-2 rounded text-white'>Car Rented</span>
                                                </div>
                                            )}
                                            <div className="pt-10 flex justify-end">
                                                <Button className='bg-red-600 hover:bg-red-700 rounded' onClick={() => handleDeleteCar(car.id)}>Delete</Button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'Manage Request':
                return (
                    <div className='p-4 bg-white shadow-md rounded-lg'>
                        <h3 className='text-2xl font-bold mb-4'>Manage Requests</h3>
                        <ul>
                            {requests.map(car => (
                                <li key={car.id} className='mb-4'>
                                    <div className='grid grid-cols-3 items-center border p-5'>
                                        <div>
                                            <img className="w-64 h-40 object-cover bg-center rounded-2xl" src={`http://localhost:3001/${car.image}`} alt="" />
                                        </div>
                                        <div >
                                            <p><span className='text-lg font-semibold'>Car Model:</span> {car.model} </p>
                                            <p><span className='text-lg font-semibold'>Car Year: </span>{car.year} </p>
                                            <p><span className='text-lg font-semibold'>Description: </span>{car.description}</p>
                                            <p><span className='text-lg font-semibold'>Customer: </span>{car.owner_firstName} {car.owner_firstName}</p>
                                            <p><span className='text-lg font-semibold'>Price: </span>{car.details}</p>

                                        </div>
                                        <div>
                                            {car.status === 'available' && (
                                                <div className='flex gap-5'>
                                                    <Dialog open={isRentDialogOpen} onOpenChange={setIsRentDialogOpen}>
                                                        <DialogTrigger asChild>
                                                            <Button onClick={() => { setSelectedCarId(car.id); setIsRentDialogOpen(true); }} className="bg-orange-500 hover:bg-orange-600 rounded px-4">Add for Rent</Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Add for Rent</DialogTitle>
                                                                <DialogDescription>
                                                                    Add your car for Rent
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="pricePerDay" className="text-right">
                                                                        Price/Day
                                                                    </Label>
                                                                    <Input
                                                                        value={pricePerDay}
                                                                        onChange={handlePricePerDayChange}
                                                                        id="pricePerDay"
                                                                        name="pricePerDay"
                                                                        placeholder="Enter rental price/day"
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <Button onClick={handleAddCarForRent}>Add for Rent</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>

                                                    <Dialog open={isSaleDialogOpen} onOpenChange={setIsSaleDialogOpen}>
                                                        <DialogTrigger asChild>
                                                            <Button onClick={() => { setSelectedCarId(car.id); setIsSaleDialogOpen(true); }} className="bg-green-500 hover:bg-green-600 rounded px-4">Add for Sale</Button>
                                                        </DialogTrigger>
                                                        <DialogContent className="sm:max-w-[425px]">
                                                            <DialogHeader>
                                                                <DialogTitle>Add for Sale</DialogTitle>
                                                                <DialogDescription>
                                                                    Add your car for sale
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="grid gap-4 py-4">
                                                                <div className="grid grid-cols-4 items-center gap-4">
                                                                    <Label htmlFor="price" className="text-right">
                                                                        Price
                                                                    </Label>
                                                                    <Input
                                                                        value={price}
                                                                        onChange={handlePriceChange}
                                                                        id="price"
                                                                        name="price"
                                                                        placeholder="Enter sale price"
                                                                        className="col-span-3"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <DialogFooter>
                                                                <Button onClick={handleAddCarForSale}>Add for Sale</Button>
                                                            </DialogFooter>
                                                        </DialogContent>
                                                    </Dialog>
                                                </div>
                                            )}
                                            {car.status === 'for rent' && (
                                                <div>
                                                    <span className='bg-orange-500 px-4 py-2 rounded'>Added for Rent</span>
                                                    <Button onClick={() => { setSelectedCarId(car.id); handleCancelAction(); }}>Cancel</Button>
                                                </div>
                                            )}
                                            {car.status === 'for sale' && (
                                                <div>
                                                    <span className='bg-green-500 px-4 py-2 rounded'>Added for Sale</span>
                                                    <Button onClick={() => { setSelectedCarId(car.id); handleCancelAction(); }}>Cancel</Button>
                                                </div>
                                            )}
                                            <div className="pt-10 flex justify-end gap-7">
                                                <Button className='bg-green-600 hover:bg-green-700 rounded' onClick={() => handleAcceptRequest(car.id)}>Accept</Button>
                                                <Button className='bg-red-600 hover:bg-red-700 rounded' onClick={() => handleRejectRequest(car.id)}>Reject</Button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                );
            case 'Add Mechanic':

                return (

                    <div className='p-4 bg-white shadow-md rounded-lg w-full'>
                        <style jsx global>{`
      input[type=number]::-webkit-outer-spin-button,
      input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    
      input[type=number] {
        -moz-appearance: textfield;
      }
    `}</style>
                        <div className=" p-5 rounded-lg sm:p-10 lg:w-1/4 ">
                            <div className="font-bold   text-center pb-4 text-2xl">
                                Add Mechanic
                            </div>

                            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center ">
                                <div className="p-1 lg:p-4">
                                    {/* <label className="text-white ">name:</label> */}
                                    <input
                                        className="border-1 bg--200 px-2 py-1 border-b "
                                        type="string"
                                        name="firstName"
                                        placeholder="First Name"
                                        value={formData.firstName}
                                        onChange={handleChange1}
                                        required

                                    />
                                </div>
                                <div className="p-1 lg:p-4">
                                    {/* <label className="text-white ">name:</label> */}
                                    <input
                                        className="border-1 bg--200 px-2 py-1 border-b "
                                        type="string"
                                        name="lastName"
                                        placeholder="Last Name"
                                        value={formData.lastName}
                                        onChange={handleChange1}
                                        required

                                    />
                                </div>
                                <div className="p-1 lg:p-4">
                                    {/* <label className="text-white">Email:</label> */}
                                    <input
                                        className="border-1 bg--200 px-2 py-1 border-b "
                                        type="email"
                                        name="email"
                                        placeholder="Email"

                                        value={formData.email}
                                        onChange={handleChange1}
                                        required
                                    />
                                </div>
                                <div className="p-1 lg:p-4">
                                    {/* <label className="text-white">Password:</label> */}
                                    <input
                                        className="border-1 bg--200 px-2 py-1 border-b "
                                        type="password"
                                        name="password"
                                        placeholder="Password"

                                        value={formData.password}
                                        onChange={handleChange1}
                                        required
                                    />
                                </div>
                                <div className="p-1 lg:p-4">
                                    {/* <label className="text-white">Password:</label> */}
                                    <input
                                        className="border-1 bg--200 px-2 py-1 border-b "
                                        type="number"
                                        name="phone"
                                        placeholder="Phone Number"

                                        value={formData.phone}
                                        onChange={handleChange1}
                                        required
                                    />
                                </div>

                                <div className="">
                                    <button
                                        className="border rounded-md bg-black text-white p-2 hover:bg-red-500 w-full "
                                        type="submit"
                                    >
                                        Add Mechanic
                                    </button>


                                    {error && <p className="pt-9" style={{ color: "red" }}>{error}</p>}

                                </div>
                            </form>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };


    return (
        <div className='flex h-full min-h-screen '>
            {/* Sidebar */}
            <div className='basis-1/5 bg-gray-800 p-4 text-white '>
                <div className='h-24 flex justify-center'>
                    <img src="logo.png" alt="Logo" />
                </div>
                <div className='pt-10'>
                    <h2 className='font-bold text-xl mb-4'>Admin Panel</h2>
                    <ul>
                        <li className='mb-2'>
                            <Button variant="outline" className='w-full' onClick={() => setActiveTab('Dashboard')}>Dashboard</Button>
                        </li>
                        <li className='mb-2'>
                            <Button variant="outline" className='w-full' onClick={() => setActiveTab('Add New Car')}>Add New Car</Button>
                        </li>
                        <li className='mb-2'>
                            <Button variant="outline" className='w-full' onClick={() => setActiveTab('Manage Cars')}>Manage Cars</Button>
                        </li>
                        <li className='mb-2'>
                            <div className='relative'>
                                <Button variant="outline" className='w-full' onClick={() => setActiveTab('Manage Request')}>Manage Request</Button>
                                <p className='absolute bottom-5 right-6 translate-x-1/2 translate-y-1/2 rounded-full h-6 w-6  bg-red-500 flex justify-center items-center text-white text-xs'>{requests.length}</p>
                            </div>
                        </li>
                        <li className='mb-2'>
                            <Button variant="outline" className='w-full' onClick={() => setActiveTab('Add Mechanic')}>Add Mechanic</Button>
                        </li>
                        {/* <li className='mb-2'>
                            <Button variant="outline" className='w-full' onClick={() => setActiveTab('Sales Reports')}>Sales Reports</Button>
                        </li> */}
                        <li className='mb-2'>
                            <Button variant="outline" onClick={handleLogout} className="text-white rounded w-full mt-4">Logout</Button>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Main Content */}
            <div className='basis-4/5 bg-gray-100 p-6'>
                {renderContent()}
            </div>
        </div>
    );
};

export default Dashboard;
