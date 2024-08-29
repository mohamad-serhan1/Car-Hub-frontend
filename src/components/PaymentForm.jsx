import React, { useState } from "react";
import axios from "axios";
const PaymentForm = ({ carId ,status }) => {
  const [formData, setFormData] = useState({
    name: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [formVisible, setFormVisible] = useState(true); // State to control form visibility

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status ==="for sale"){

      await axios.patch(`http://localhost:3001/cars/status/${carId}`, { status: 'sold' });
      await axios.delete(`http://localhost:3001/sale/carId/${carId}`);
    }else{
      await axios.patch(`http://localhost:3001/cars/status/${carId}`, { status: 'rented' });
      await axios.delete(`http://localhost:3001/rental/carId/${carId}`);
    }
    // Handle form submission, e.g., send data to the backend
    console.log(formData);
    // Close the form after submission
    setFormVisible(false);
  };

  if (!formVisible) {
    return (
      <div className="text-center font-bold text-xl text-green-600">Payment is successfully done</div>
    ); // Return null if form is not visible
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Payment Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name on Card
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="John Doe"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="flex mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MM/YY"
              required
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="123"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
