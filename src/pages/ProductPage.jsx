import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from "@/components/ui/button";
import PaymentForm from "@/components/PaymentForm";
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
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const ProductPage = () => {
    const { id } = useParams(); // Get the product ID from the URL params
    const [product, setProduct] = useState(null);
    const [isRentDialogOpen, setIsRentDialogOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch product data based on the ID
        axios.get(`http://localhost:3001/carSearch/${id}`)
            .then(response => {
                setProduct(response.data);
            })
            .catch(error => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    useEffect(() => {
        // Check for token in localStorage
        const token = localStorage.getItem("authToken");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    if (!product) {
        return <p>Loading...</p>;
    }

    const handleLogin = () => {
        navigate('/login');
    };

    const handleCreate = () => {
        navigate('/register');
    };

    return (
        <div className='h-full'>
            <div className=" bg-contain bg-right bg-no-repeat bg-black justify-end flex items-center relative">
                <img className='h-64 justify-self-end' src="samuele-errico-piccarini-FMbWFDiVRPs-unsplash.jpg" alt="" />
                <div className='absolute left-11 bottom-16 text-white'>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Car</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/components">{id}</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <div className="container mx-auto p-4">
                <div className="flex flex-col justify-center items-center border-b">

                    <h1 className="text-3xl font-bold mb-4">{product.model} ({product.year})</h1>
                    <img src={`http://localhost:3001/${product.image}`} alt={product.name} className="mb-4 h-[350px] w-auto" />
                </div>

                <div className="flex justify-between p-10">
                    <div className="w-full">
                        <p className="font-bold block">Description:</p>
                        <p className="w-3/4 inline-block text-wrap whitespace-pre-wrap">
                            {product.description}
                        </p>
                        <p className="text-xl font-semibold">
                            {product.status === "for sale" ? `Price: $${product.details}` : `Price/day: $${product.details}`}
                        </p>
                    </div>
                    <div>
                        {isAuthenticated ? (
                            <div className='w-full'>
                                <Dialog open={isRentDialogOpen} onOpenChange={setIsRentDialogOpen}>
                                    <DialogTrigger asChild>
                                        {product.status === "for sale" ? (

                                            <Button className="w-full bg-green-500 hover:bg-green-600 rounded">
                                                Buy Now
                                            </Button>
                                        ) : (
                                            <Button className="w-full bg-orange-500 hover:bg-orange-600 rounded">
                                                Rent Now
                                            </Button>

                                        )}
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px] bg-white">
                                        <PaymentForm />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ) : (
                            <div className='w-full'>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        {product.status === "for sale" ? (

                                            <Button className="w-full bg-green-500 hover:bg-green-600 rounded">
                                                Buy Now
                                            </Button>
                                        ) : (
                                            <Button className="w-full bg-orange-500 hover:bg-orange-600 rounded">
                                                Rent Now
                                            </Button>

                                        )}
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="bg-white">
                                        <AlertDialogHeader>
                                            <div className="flex justify-between items-start bg-white ">
                                                <AlertDialogTitle className="text-lg font-semibold">You need to be logged in to buy a car.</AlertDialogTitle>
                                                <AlertDialogCancel className="border-none p-2 px-4" asChild>
                                                    <span aria-hidden="true" className='cursor-pointer'>&times;</span>
                                                </AlertDialogCancel>
                                            </div>
                                        </AlertDialogHeader>
                                        <AlertDialogDescription>
                                            Please log in to your account to continue. If you don't have an account, you can create one.
                                        </AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel onClick={handleCreate}>Create</AlertDialogCancel>
                                            <AlertDialogAction onClick={handleLogin}>Login</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
