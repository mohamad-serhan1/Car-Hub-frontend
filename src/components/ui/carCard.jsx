import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from './button';
import PaymentForm from '../PaymentForm';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
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
const CarCard = ({ status, filters, sortCriteria }) => {
    const [isRentDialogOpen, setIsRentDialogOpen] = useState(false);
    const [cars, setCars] = useState([]);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);



    useEffect(() => {
        axios.get(`http://localhost:3001/carDetails/${status}`)
            .then(response => {
                setCars(response.data);
            })
            .catch(err => {
                setError(err);
            });
    }, [status]);

    const filteredCars = cars.filter(car => {
        return (
            (!filters.model || car.model.toLowerCase().includes(filters.model.toLowerCase())) &&
            (!filters.year || car.year.toString().includes(filters.year)) &&
            (car.details >= filters.priceRange[0] && car.details <= filters.priceRange[1])
        );
    });

    const sortedCars = filteredCars.sort((a, b) => {
        if (sortCriteria === 'company') return a.owner_id === 1 ? -1 : 1;
        if (sortCriteria === 'customer') return a.owner_id !== 1 ? -1 : 1;
        return 0; // No sorting
    });

    if (error) return <div>Error: {error.message}</div>;
    useEffect(() => {
        // Check for token and username in localStorage
        const token = localStorage.getItem("authToken");

        if (token) {
            setIsAuthenticated(true);
        }
    }, []);
    const handleResultClick = (id) => {
        window.location.href = `/products/${id}`;
    };

    const handleLogin = () => {
        // Navigate to the login page or any action you'd like to take
        navigate('/login');
    };
    const handleCreate = () => {
        // Navigate to the login page or any action you'd like to take
        navigate('/register');
    };
    return (
        <div className='flex flex-col gap-4'>
            {sortedCars.length === 0 ? (
                <div className='text-center mt-10'>
                    <h2 className='text-xl font-bold'>No Data Found</h2>
                    <p className='mt-2'>No cars match the applied filters.</p>
                </div>
            ) : (
                sortedCars.map(car => (
                    <div key={car.id} className='border p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 hover:border-b-red-600 transition-all duration-150'>
                        <div>
                            <img className="w-64 h-40 object-cover rounded-2xl" src={`http://localhost:3001/${car.image}`} alt={car.model} />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <p className='font-semibold'>Model: <span className='font-normal'>{car.model}</span></p>
                            <p className='font-semibold'>Year: <span className='font-normal'>{car.year}</span></p>
                            <p className='font-semibold'>Description: <span className='font-normal block max-w-xs max-h-20 overflow-hidden text-ellipsis'>{car.description}</span></p>
                            {car.owner_id !== 1 ? (
                                <p className='font-semibold'>Customer: <span className='font-normal'>{car.owner_firstName} {car.owner_lastName}</span></p>
                            ) : (
                                <p className='font-semibold'>By CarHub Company</p>
                            )}
                        </div>
                        {car.status === "for sale" ? (
                            <div className='mt-2 flex flex-col justify-between gap-5'>
                                <p><span className='font-semibold'>Price:</span> {car.details}$</p>
                                <div>
                                    <Button onClick={() => handleResultClick(car.id)} className="bg-black text-green-500 hover:bg-black w-full mb-2">View</Button>

                                    {isAuthenticated ? (
                                        <div className='w-full'>
                                            <Dialog open={isRentDialogOpen} onOpenChange={setIsRentDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button onClick={() => { setIsRentDialogOpen(true); }} className="w-full bg-green-500 hover:bg-green-600">Buy</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px] bg-white">

                                                    <PaymentForm carId={car.id} status={car.status} />

                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    ) : (
                                        <div className='w-full'>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <div>
                                                        <Button className="w-full bg-green-500 hover:bg-green-600">Buy</Button>
                                                    </div>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="bg-white">
                                                    <div className="flex justify-between items-start bg-white ">
                                                        <AlertDialogTitle className="text-lg font-semibold">You need to be logged in to buy a car.</AlertDialogTitle>
                                                        <AlertDialogCancel className="border-none p-2 px-4" asChild>
                                                            <span aria-hidden="true" className='cursor-pointer'>&times;</span>
                                                        </AlertDialogCancel>
                                                    </div>

                                                    <AlertDialogDescription className="mt-4">
                                                        Please log in to your account to proceed with the purchase. If you don't have an account, create one.
                                                    </AlertDialogDescription>
                                                    <AlertDialogFooter className="mt-6">
                                                        <AlertDialogCancel onClick={handleCreate}>Create</AlertDialogCancel>
                                                        <AlertDialogAction onClick={handleLogin}>Login</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    )}

                                </div>
                            </div>
                        ) : (
                            <div className='mt-2 flex flex-col justify-between gap-5'>
                                <p><span className='font-semibold'>Price/day:</span>{car.details}$</p>
                                <div>
                                    <Button onClick={() => handleResultClick(car.id)} className="bg-black text-orange-500 hover:bg-black w-full mb-2">View</Button>
                                    {isAuthenticated ? (
                                        <div className='w-full'>
                                            <Dialog open={isRentDialogOpen} onOpenChange={setIsRentDialogOpen}>
                                                <DialogTrigger asChild>
                                                    <Button onClick={() => { setIsRentDialogOpen(true); }} className="w-full bg-orange-500 hover:bg-orange-600">Rent</Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[425px] bg-white">
                                                    <PaymentForm carId={car.id} status={car.status} />
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    ) : (
                                        <div className='w-full'>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <div>
                                                        <Button className="w-full bg-orange-500 hover:bg-orange-600">Rent</Button>
                                                    </div>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent className="bg-white">
                                                    <div className="flex justify-between items-start bg-white ">
                                                        <AlertDialogTitle className="text-lg font-semibold">You need to be logged in to buy a car.</AlertDialogTitle>
                                                        <AlertDialogCancel className="border-none p-2 px-4" asChild>
                                                            <span aria-hidden="true" className='cursor-pointer'>&times;</span>
                                                        </AlertDialogCancel>
                                                    </div>

                                                    <AlertDialogDescription className="mt-4">
                                                        Please log in to your account to proceed with the purchase. If you don't have an account, create one.
                                                    </AlertDialogDescription>
                                                    <AlertDialogFooter className="mt-6">
                                                        <AlertDialogCancel onClick={handleCreate}>Create</AlertDialogCancel>
                                                        <AlertDialogAction onClick={handleLogin}>Login</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default CarCard;
