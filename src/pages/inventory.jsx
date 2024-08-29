import React, { useRef, useState, useEffect } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbLink, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from "@/components/ui/button"
import axios from 'axios';
import { Textarea } from "@/components/ui/textarea"

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
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

const Inventory = () => {
    const fileInputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const ownerId = localStorage.getItem("UserId");
    const initialFormData = {
        model: '',
        year: '',
        image: null,
        description: '',
        status: 'available',
        owner_id: ownerId,
    };
    const [formData, setFormData] = useState(initialFormData);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");
    const [error1, setError1] = useState("");
    const [cars, setCars] = useState([]);
    const [isSaleDialogOpen, setIsSaleDialogOpen] = useState(false);
    const [price, setPrice] = useState(null);
    const [selectedCarId, setSelectedCarId] = useState(null);



    const handleFileSelect = () => {
        fileInputRef.current.click(); // Trigger the hidden file input click
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setFormData({ ...formData, image: files[0] });
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
            setError("");
            setSuccess("Car added successfully!");
            setFormData(initialFormData);
            setPreviewImage(null); // Clear the image preview
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || "An error occurred");
            } else if (err.request) {
                setError("No response received from the server");
            } else {
                setError("Error: " + err.message);
            }
            setSuccess("");
        }
    };
    const handleAddCarForSale = async (car_id) => {
        try {
            await axios.post(`http://localhost:3001/sale`, { car_id, price, user_id: ownerId });
            await axios.patch(`http://localhost:3001/cars/status/${car_id}`, { status: 'request' });
            setSuccess("Car requested to add for sale successfully!");
            setCars(cars.map(car => car.id === car_id ? { ...car, status: 'request' } : car));
            setIsSaleDialogOpen(false); // Close the dialog
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };
    const handleDeleteCar = async (car_id) => {
        try {
            await axios.delete(`http://localhost:3001/cars/${car_id}`);
            setSuccess("Car deleted successfully!");
            setCars(cars.filter(car => car.id !== car_id));
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };
    const handleCancelAction = async (carId, status) => {
        try {
            await axios.patch(`http://localhost:3001/cars/status/${carId}`, { status: 'available' });
            // Optionally, re-fetch the car data

            await axios.delete(`http://localhost:3001/sale/carId/${carId}`);

            const response = await axios.get(`http://localhost:3001/cars/owner/${ownerId}`);
            setCars(response.data);
        } catch (err) {
            setError(err.response?.data?.error || "An error occurred");
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:3001/cars/owner/${ownerId}`) // Replace with your API URL
            .then(response => {
                setCars(response.data);
            })
            .catch(err => {
                setError1(err.response?.data?.error || err.message || "An error occurred");
            });
    }, [ownerId]);


    return (
        <div className='h-full bg-gray-100'>
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
                                <BreadcrumbLink href="/components">Inventory</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <div className='p-10'>
                <Tabs defaultValue="addCar" className="">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="addCar" className="text-xl bg-orange-500 mx-4 rounded-xl"><span>Add Car</span></TabsTrigger>
                        <TabsTrigger value="manage" className="text-xl bg-black text-orange-500 mx-4 rounded-xl">Manage Cars</TabsTrigger>
                    </TabsList>
                    <TabsContent value="addCar">
                        <Card>
                            <CardHeader>
                                <CardTitle>Add New Car</CardTitle>
                                <CardDescription>
                                    Make changes to your account here. Click save when you're done.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <form onSubmit={handleAddCar}>
                                    <div className='grid grid-cols-2'>
                                        <div className="space-y-1">
                                            <Label htmlFor="model">Model</Label>
                                            <Input
                                                required
                                                className="w-1/2"
                                                id="model"
                                                name="model"
                                                value={formData.model}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="year">Year</Label>
                                            <Input
                                                required
                                                className="w-1/3"
                                                id="year"
                                                name="year"
                                                value={formData.year}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label htmlFor="description">Description</Label>
                                            <Textarea
                                                required
                                                className="w-1/2"
                                                id="description"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                            />
                                        </div>

                                        <div className='space-y-1 flex flex-col pt-4'>
                                            <Label htmlFor="image">Car Image</Label>
                                            <Button
                                                type="button"
                                                onClick={handleFileSelect}
                                                className='shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                                                Select
                                            </Button>
                                            {/* Hidden file input */}
                                            <input
                                                required
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
                                    </div>
                                    <CardFooter className="flex justify-end ">
                                        <Button className="bg-black text-white rounded mt-5" type="submit">Save changes</Button>
                                    </CardFooter>
                                </form>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="manage">
                        <Card>
                            <CardHeader>
                                <CardTitle>Manage Cars</CardTitle>
                                <CardDescription>
                                    Manage your cars here. Add or Remove cars.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2">
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
                                                    <div className='flex justify-between'>
                                                        {car.status === 'available' && (
                                                            <div className='flex gap-5'>


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
                                                                            <div>

                                                                                <div className="pt-10 flex justify-end">
                                                                                    <Button className=' rounded' onClick={() => handleAddCarForSale(car.id)}>Submit</Button>
                                                                                </div>
                                                                            </div>
                                                                        </DialogFooter>
                                                                    </DialogContent>
                                                                </Dialog>
                                                                <div className=" flex">
                                                                    <Button className='bg-red-600 hover:bg-red-700 rounded' onClick={() => handleDeleteCar(car.id)}>Delete</Button>
                                                                </div>
                                                            </div>
                                                        )}

                                                        {car.status === 'request' && (
                                                            <div>
                                                                <span className='font-bold px-4 py-2 rounded'>Requested to Add for Sale </span>
                                                                <Button onClick={() => { setSelectedCarId(car.id); handleCancelAction(car.id); }}>Cancel</Button>
                                                            </div>
                                                        )}
                                                        {car.status === 'for sale' && (
                                                            <div>
                                                                <span className='bg-green-500 px-4 py-2 rounded'>Added for Sale</span>
                                                                <Button onClick={() => { setSelectedCarId(car.id); handleCancelAction(car.id); }}>Cancel</Button>
                                                            </div>
                                                        )}
                                                        {car.status === 'sold' && (
                                                            <div>
                                                                <span className='bg-black text-white px-4 py-2 rounded'>Car Sold</span>
                                                                <Button onClick={() => { setSelectedCarId(car.id); handleDeleteCar(car.id); }}>Cancel</Button>
                                                            </div>
                                                        )}
                                                        {car.status === 'rented' && (
                                                            <div>
                                                                <span className='bg-black text-white px-4 py-2 rounded'>Car Rented</span>
                                                                <Button onClick={() => { setSelectedCarId(car.id); handleDeleteCar(car.id); }}>Cancel</Button>
                                                            </div>
                                                        )}

                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>                            </CardContent>

                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default Inventory;
