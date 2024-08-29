import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { IoChevronForwardSharp } from "react-icons/io5";
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
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link, useNavigate } from 'react-router-dom';

const services = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check for token and username in localStorage
        const token = localStorage.getItem("authToken");

        if (token) {
            setIsAuthenticated(true);
        }
    }, []);
    const handleLogin = () => {
        // Navigate to the login page or any action you'd like to take
        navigate('/login');
    };
    const handleCreate = () => {
        // Navigate to the login page or any action you'd like to take
        navigate('/register');
    };


    return (
        <div className='relative '>
            <div className='bg-orange-500 p-10 sm:p-20 rounded-2xl'>
                <div className='w-1/2 space-x-3'>
                    <h1 className='font-bold text-4xl text-white'>All the services we will provide you</h1>
                    <p className='font-thin text-white pt-9'>Get the car of your dreams with installments of your choice. There various attractive offers from CarHub through our collaboration with various trusted leasing partners.</p>
                </div>
            </div>
            <div className='absolute top-16 right-7 bg-white rounded-xl'>
                <Card className="w-[350px] border-none shadow-2xl p-4 rounded-xl">

                    <CardContent>

                        {isAuthenticated ? (
                            <div className=' space-x-2 flex'>
                                <div>

                                    <Link to='/rentalCars' className='font-semibold cursor-pointer'>Rent Car</Link>
                                    <p className='font-thin text-sm'>Choose from a variety of cars to rent, tailored to your needs and budget.</p>
                                </div>
                                <IoChevronForwardSharp className='self-center' />

                            </div>

                        ) : (
                            <div className=' space-x-2 flex '>
                                <div>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <p className="font-semibold cursor-pointer">Rent Car</p>

                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-white">
                                            <div className="flex justify-between items-start bg-white ">
                                                <AlertDialogTitle className="text-lg font-semibold">You need to be logged in to request a service.</AlertDialogTitle>
                                                <AlertDialogCancel className="border-none p-2 px-4" asChild>
                                                    <span aria-hidden="true" className='cursor-pointer'>&times;</span>
                                                </AlertDialogCancel>
                                            </div>
                                            <AlertDialogDescription className="mt-4">
                                                Please log in to your account to proceed with the purchase. If you don't have an account, create one.
                                            </AlertDialogDescription>
                                            <AlertDialogFooter className="mt-6">
                                                <AlertDialogAction onClick={handleCreate}>Create</AlertDialogAction>
                                                <AlertDialogAction onClick={handleLogin}>Login</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>


                                    <p className='font-thin text-sm'>Choose from a variety of cars to rent, tailored to your needs and budget.</p>
                                </div>
                                <IoChevronForwardSharp className='self-center' />

                            </div>

                        )}


                        <Separator className="my-4" />
                        {isAuthenticated ? (
                            <div className=' space-x-2 flex'>
                                <div>
                                    <Link to='/carList' className='font-semibold cursor-pointer'>Buy Car</Link>
                                    <p className='font-thin text-sm'>Choose from a variety of cars to rent, tailored to your needs and budget.</p>
                                </div>
                                <IoChevronForwardSharp className='self-center' />

                            </div>

                        ) : (
                            <div className=' space-x-2 flex '>
                                <div>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>

                                            <p className="font-semibold cursor-pointer">Buy Car</p>

                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-white">
                                            <div className="flex justify-between items-start bg-white ">
                                                <AlertDialogTitle className="text-lg font-semibold">You need to be logged in to make a purchase.</AlertDialogTitle>
                                                <AlertDialogCancel asChild>
                                                    <button className="text-gray-400 hover:text-gray-600">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
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
                                    <p className='font-thin text-sm'>Explore our selection of cars for sale and find your perfect match.</p>
                                </div>
                                <IoChevronForwardSharp className='self-center' />

                            </div>

                        )}
                        <Separator className="my-4" />
                        {isAuthenticated ? (
                            <div className=' space-x-2 flex'>
                                <div>
                                    <Link to='/inventory' className='font-semibold cursor-pointer'>Sell Car</Link>
                                    <p className='font-thin text-sm'>Easily list your car for sale and connect with potential buyers.</p>
                                </div>
                                <IoChevronForwardSharp className='self-center' />

                            </div>

                        ) : (
                            <div className=' space-x-2 flex '>
                                <div>

                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <p className="font-semibold cursor-pointer">Sell Car</p>

                                        </AlertDialogTrigger>
                                        <AlertDialogContent className="bg-white">
                                            <div className="flex justify-between items-start bg-white ">
                                                <AlertDialogTitle className="text-lg font-semibold">You need to be logged in to make a purchase.</AlertDialogTitle>
                                                <AlertDialogCancel asChild>
                                                    <button className="text-gray-400 hover:text-gray-600">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
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


                                    <p className='font-thin text-sm'>Easily list your car for sale and connect with potential buyers.</p>
                                </div>
                                <IoChevronForwardSharp className='self-center' />

                            </div>

                        )}
                    </CardContent>
                </Card>
            </div>
            <div>

            </div>
        </div>
    )
}

export default services