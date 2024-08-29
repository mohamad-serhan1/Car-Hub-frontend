import React from "react";
import Products from "@/components/products";
import CustomerCars from "@/components/CustomersCars";
import RentalCars from "@/components/RentalCars";
import Services from "@/components/services";
import FAQ from "@/components/FAQ";
const home = () => {
  return (
    <div className="bg-gray-200"> 
      <div
        className="min-h-screen bg-cover bg-center flex justify-start items-center"
        style={{
          backgroundImage: "url('/banner.jpg')",
        }}
      >
        <div className="text-left bg-black bg-opacity-50 p-20 rounded-md">
          <h1 className="text-4xl text-white font-bold mb-4">
          Drive in Class, Define Your Style
          </h1>
          <p className="text-white text-lg">
            Discover the best cars for sale and rent, along with top-notch
            services.
          </p>
        </div>
      </div>
      <div className="p-20 shadow-lg">{<Services/>}</div>
      <div className="px-20 pt-32 shadow-lg">{<RentalCars/>}</div>
      <div className="px-20 pt-32 shadow-lg">{<CustomerCars/>}</div>
      <div className="px-20 pt-32  shadow-lg">{<Products/>}</div>
      <div className=" p-20">{<FAQ/>}</div>
    </div>
  );
};

export default home;
