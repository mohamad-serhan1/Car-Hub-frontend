import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        formData
      );
      setSuccess("Registration successful!");
      setError("");
    } catch (err) {
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setError(err.response.data.error || "An error occurred");
      } else if (err.request) {
        // The request was made but no response was received
        setError("No response received from the server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("Error: " + err.message);
      }
      setSuccess("");
    }
  };
  
  return (
    <div
    className="min-h-screen flex justify-center items-center bg-cover bg-center "
    style={{
      backgroundImage: "url('/dima-panyukov-_4ZLmHzwARY-unsplash.jpg')",
    }}
    >
    <style jsx global>{`
      input[type=number]::-webkit-outer-spin-button,
      input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    
      input[type=number] {
        -moz-appearance: textfield;
      }
    `}</style>
      {" "}
      <div className="bg-[#0000009c] p-5 rounded-lg sm:p-10 lg:w-1/4">
        <div className="font-bold  text-white text-center pb-4 text-2xl">
          Register
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
          <div className="p-1 lg:p-4">
            {/* <label className="text-white ">name:</label> */}
            <input
              className="border-1 bg--200 px-2 py-1 border-b bg-[#000000a9] text-white"
              type="string"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required

            />
          </div>
          <div className="p-1 lg:p-4">
            {/* <label className="text-white ">name:</label> */}
            <input
              className="border-1 bg--200 px-2 py-1 border-b bg-[#000000a9] text-white"
              type="string"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required

            />
          </div>
          <div className="p-1 lg:p-4">
            {/* <label className="text-white">Email:</label> */}
            <input
              className="border-1 bg--200 px-2 py-1 border-b bg-[#000000a9] text-white"
              type="email"
              name="email"
              placeholder="Email"

              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="p-1 lg:p-4">
            {/* <label className="text-white">Password:</label> */}
            <input
              className="border-1 bg--200 px-2 py-1 border-b bg-[#000000a9] text-white"
              type="password"
              name="password"
              placeholder="Password"

              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="p-1 lg:p-4">
            {/* <label className="text-white">Password:</label> */}
            <input
              className="border-1 bg--200 px-2 py-1 border-b bg-[#000000a9] text-white"
              type="number"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="">
            <button
              className="border rounded-md bg-black text-white p-2 hover:bg-red-500 w-full "
              type="submit"
            >
              Register
            </button>
            <div className="pt-6">
              <p className="text-white">already have an account! <Link to="/login" className="font-bold text-red-500">
                Login
              </Link></p>
            </div>

            {error && <p className="pt-9" style={{ color: "red" }}>{error}</p>}
            {success && <p className="pt-9" style={{ color: "green" }}>{success}</p>}

          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
