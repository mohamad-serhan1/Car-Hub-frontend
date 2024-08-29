import React, { useState } from 'react'
import CarCard from '@/components/ui/carCard'
import RentalCar from '@/components/RentalCars'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import CarFilter from '@/components/CarFilter'
import PriceRangeSlider from '@/components/ui/PriceRangeSlider'

const RentalCars = () => {
    const [filters, setFilters] = useState({
        model: '',
        year: '',
        priceRange: [0, 500],
    });

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };
    const handlePriceRangeChange = (value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            priceRange: value,
        }));
    };
    return (
        <div className='h-full bg-gray-100'>
            <div className=" bg-contain bg-right bg-no-repeat bg-black justify-end flex items-center relative">
                <img className='h-64 justify-self-end' src="samuele-errico-piccarini-FMbWFDiVRPs-unsplash.jpg" alt="" />
                <div className='absolute left-11 bottom-16 text-white'>
                    <Breadcrumb >
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/rentalCars">rental Cars</BreadcrumbLink>
                            </BreadcrumbItem>


                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

            </div>
            <div className='flex min-h-screen gap-10 px-10 pt-10'>
                <div className='basis-1/4 border p-4 '>
                    <h2 className=' font-bold'>Filters</h2>
                    <div className='mt-4'>
                        <label className=''>Model:</label>
                        <input
                            type="text"
                            name="model"
                            value={filters.model}
                            onChange={handleFilterChange}
                            className='w-full p-2 mt-2 rounded'
                            placeholder="Enter car model"
                        />
                    </div>
                    <div className='mt-4'>
                        <label className=''>Year:</label>
                        <input
                            type="text"
                            name="year"
                            value={filters.year}
                            onChange={handleFilterChange}
                            className='w-full p-2 mt-2 rounded'
                            placeholder="Enter year"
                        />
                    </div>
                    <div className='mt-4'>
                        <label>Price Range:</label>
                        <PriceRangeSlider
                        max={500}
                        step={50}
                            value={filters.priceRange}
                            onValueChange={handlePriceRangeChange}
                        />
                        <div className="flex justify-between mt-2">
                            <span>${filters.priceRange[0]}</span>
                            <span>${filters.priceRange[1]}</span>
                        </div>
                    </div>
                </div>
                <div className='bg-red- basis-3/4'>
                    <CarCard status='for rent' filters={filters} />
                </div>
            </div>
        </div>
    )
}
export default RentalCars