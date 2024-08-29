import React, { useState } from 'react';
import CarCard from '@/components/ui/carCard';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import PriceRangeSlider from '@/components/ui/PriceRangeSlider';

const CarList = () => {
    const [filters, setFilters] = useState({
        model: '',
        year: '',
        priceRange: [0, 100000], // Initialize with min and max values
    });

    const [sortCriteria, setSortCriteria] = useState('all'); // State for sorting criteria

    const handleFilterChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    const handlePriceRangeChange = (value) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            priceRange: value,
        }));
    };

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

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
                                <BreadcrumbLink href="/components">Car List</BreadcrumbLink>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
            <div className='flex min-h-screen gap-10 px-10 pt-10'>
                <div className='basis-1/4 border p-4'>
                    <h2 className='font-bold'>Filters</h2>
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
                            max={100000}
                            step={1000}
                            value={filters.priceRange}
                            onValueChange={handlePriceRangeChange}
                        />
                        <div className="flex justify-between mt-2">
                            <span>${filters.priceRange[0]}</span>
                            <span>${filters.priceRange[1]}</span>
                        </div>
                    </div>
                    <div className="flex justify-between mt-10">
                        <p className="font-bold block">Sort By:</p>
                        <select onChange={handleSortChange} value={sortCriteria} className="border p-2 rounded">
                            <option value="all">All Cars</option>
                            <option value="company">Company Cars</option>
                            <option value="customer">Customer Cars</option>
                        </select>
                    </div>
                </div>
                <div className='basis-3/4'>
                    <CarCard status='for sale' filters={filters} sortCriteria={sortCriteria} />
                </div>
            </div>
        </div>
    );
};

export default CarList;
