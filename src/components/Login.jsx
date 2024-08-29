import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userName, setUserName] = useState(""); // Add state for user name
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Replace with your authentication endpoint
      const response = await axios.post('http://localhost:3001/auth/login', formData);

      // Extract token and user from the response
      const { token, user } = response.data;

      // Save the token and user information in localStorage
      localStorage.setItem("authToken", token);
      localStorage.setItem("firstName", user.firstName);
      localStorage.setItem("lastName", user.lastName);
      localStorage.setItem("UserId", user.id);
      localStorage.setItem("userRole", user.role);

      // Update the state
      setUserName(user.name);
      setSuccess("Login successful!");
      setError("");

      if (user.role === 'admin') {
        window.location.href = "/dashboard"; // Redirect to admin dashboard
      } else if (user.role === 'mechanic') {
        window.location.href = "/mechanic"; 
      } else {
        window.location.href = "/";
      } 

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

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/gabriel-gurrola-u6BPMXgURuI-unsplash.jpg')",
      }}
    >
      <div className="bg-[#0000009c] p-5 sm:p-20 flex flex-col items-center sm:w-1/4">
        <div className="font-bold text-white text-center pb-4 text-2xl">
          Login
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col justify-center items-center">
            <div className="p-4">
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
            <div className="p-4">
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
            <div className="w-full p-4">
              <button
                className="border rounded-md bg-black text-white p-2 w-full hover:bg-red-500"
                type="submit"
              >
                Login
              </button>
            </div>
            <div>
              <p className="text-white">
                Don't have an account?{" "}
                <Link to="/register" className="font-bold text-red-500">
                  Create a new account
                </Link>
              </p>
            </div>
          </div>
        </form>

        {error && (
          <p
            className="mt-7 p-2 font-semibold text-2xl bg-black"
            style={{ color: "red" }}
          >
            {error}
          </p>
        )}

      </div>
    </div>
  );
};

export default Login;
