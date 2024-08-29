import React, { useEffect, useState } from 'react'
import Autoplay from "embla-carousel-autoplay"
import axios from 'axios'
import { Button } from "@/components/ui/button"
import { FaUser } from "react-icons/fa6";
import PaymentForm from './PaymentForm';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
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
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link, useNavigate } from 'react-router-dom';

const CustomerCars = () => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState("");
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isRentDialogOpen, setIsRentDialogOpen] = useState(false);

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

    const plugin = React.useRef(
        Autoplay({ delay: 2000, stopOnInteraction: true })
    )

    useEffect(() => {
        // Fetch car data from API
        axios.get('http://localhost:3001/carDetails') // Replace with your API URL
            .then(response => {
                // Filter cars with status 'for rent'
                const filteredCars = response.data.filter(car => car.owner_id != 1 && car.status === "for sale");
                setCars(filteredCars);
                setLoading(false);
            })
            .catch(err => {
                setError(err);
                setLoading(false);
            });
    }, []);
    console.log("cars by customers" + cars)
    const handleResultClick = (id) => {
        // Handle click on a search result
        // For example, navigate to the car details page
        window.location.href = `/products/${id}`;
    };
    return (
        <div className='flex flex-col justify-center items-center'>
            <div>
                <Link to="/carList" className='font-bold text-2xl'>Cars By Customers</Link>
            </div>
            {cars.length === 0 ? (
                <div className='p-20'>

                    <Card className="p-10">
                        <CardContent>
                            <p>No cars available from customers for sale at the moment.</p>
                        </CardContent>
                    </Card>
                </div>
            ) : (
                <Carousel
                    plugins={[plugin.current]}
                    opts={{
                        align: "start",
                    }}
                    className="w-full p-44"
                >
                    <CarouselContent>
                        {cars.map((car, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex flex-col  items-center justify-center relative">
                                            <img onClick={() => handleResultClick(car.id)} className='bg-cover cursor-pointer h-52 w-full' src={`http://localhost:3001/${car.image}`} alt="no image" />

                                            <div className='absolute bottom-0 w-full flex'>
                                                {isAuthenticated ? (
                                                    <div className='w-full'>
                                                        <Dialog open={isRentDialogOpen} onOpenChange={setIsRentDialogOpen}>
                                                            <DialogTrigger asChild>
                                                               <Button onClick={() => { setIsRentDialogOpen(true); }} className="w-full bg-green-500 hover:bg-green-600">Buy</Button>
                                                            </DialogTrigger>
                                                            <DialogContent className="sm:max-w-[425px] bg-white">
                                                                <PaymentForm carId={car.id} status={car.status}/>
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
                                        </CardContent>
                                        <CardFooter className="bg-slate-900 text-white p-4 w-full">
                                            <div className="flex flex-col w-full">
                                                <div className='flex gap-4 justify-center text-center w-full font-bold '>
                                                    <p className='pt-2'>{car.model}</p>
                                                    <p className='pt-2'>{car.year}</p>
                                                </div>
                                                <div className='flex items-center gap-3 pt-2 '>
                                                    <FaUser />
                                                    <p>{car.owner_firstName} {car.owner_lastName}</p>
                                                </div>
                                                <div className='pt-2'>
                                                    <p className='flex items-center gap-3 '>
                                                        ${car.details}
                                                    </p>
                                                </div>
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>)}
        </div>
    )
}

export default CustomerCars