import React, { useState } from 'react';

import CarCard from './ui/carCard';
const CarFilter = () => {
    const [filters, setFilters] = useState({
        model: '',
        year: '',
        priceRange: ''
    });

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const filteredCars = cars.filter(car => {
        return (
            (filters.model === '' || car.model.toLowerCase().includes(filters.model.toLowerCase())) &&
            (filters.year === '' || car.year.includes(filters.year)) &&
            (filters.priceRange === '' || car.priceRange.includes(filters.priceRange))
        );
    });

    return (
        <div className='flex min-h-screen gap-10 px-10 pt-10'>
            <div className='basis-1/4 border p-4'>
                <h2 className='font-bold'>Filters</h2>
                <div className='mt-4'>
                    <label>Model:</label>
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
                    <label>Year:</label>
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

            <div className='basis-3/4'>
                {filteredCars.map(car => (
                    <CarCard key={car.id} car={car} status='for rent'/>
                ))}
            </div>
        </div>
    );
};

export default CarFilter;
