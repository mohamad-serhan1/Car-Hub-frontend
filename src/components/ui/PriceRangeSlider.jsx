import React, { useState } from 'react';
import * as Slider from '@radix-ui/react-slider';

const PriceRangeSlider = ({ value, onValueChange ,max,step}) => {
    return (
        <Slider.Root
            className="relative flex items-center select-none w-full h-5"
            value={value}
            onValueChange={onValueChange}
            min={0}
            max={max} // Adjust according to your price range
            step={step} // Adjust the step according to your needs
        >
            <Slider.Track className="bg-gray-300 relative grow h-1 rounded-full">
                <Slider.Range className="absolute bg-black h-full rounded-full" />
            </Slider.Track>
            <Slider.Thumb className="block w-5 h-5 bg-black rounded-full cursor-pointer" />
            <Slider.Thumb className="block w-5 h-5 bg-black rounded-full cursor-pointer" />
        </Slider.Root>
    );
};

export default PriceRangeSlider;
