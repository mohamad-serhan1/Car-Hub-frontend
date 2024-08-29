import React, { useState } from 'react'
import CarCard from '@/components/ui/carCard'
import Product from '@/components/products'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
const CompanyCars = () => {
    const [filters, setFilters] = useState({
        model: '',
        year: '',
        priceRange: ''
    });

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };
    return (
        <div className='h-full bg-gray-200'>
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
                                <BreadcrumbLink href="/components">Company-Cars</BreadcrumbLink>
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
                        <label className=''>Price Range:</label>
                        <input
                            type="text"
                            name="priceRange"
                            value={filters.priceRange}
                            onChange={handleFilterChange}
                            className='w-full p-2 mt-2 rounded'
                            placeholder="Enter price range"
                        />
                    </div>
                </div>


                <div className='bg-red- basis-3/4'>
                <CarCard status='for sale' ownerId ={1} />
                </div>
            </div>
        </div>
    )
}

export default CompanyCars