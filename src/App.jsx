import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./pages/home";
import Services from "./pages/Services";
import CarList from "./pages/CarList";
import RentalCars from "./pages/RentalCars";
import CompanyCars from "./pages/CompanyCars";
import Appointments from "./pages/appointments";
import CustomersCars from "./pages/CustomersCars";
import Inventory from "./pages/inventory";
import Dashboard from "./pages/dashboard";
import AboutUs from './pages/aboutUs';
import Mechanic from "./pages/Mechanic";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductPage from './pages/ProductPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [userRole, setUserRole] = useState(null); // State to hold the user role

  useEffect(() => {
    // Retrieve the user's role (assuming from local storage or API)
    const role = localStorage.getItem('userRole'); // Example: 'admin', 'mechanic', 'customer'
    setUserRole(role);
  }, []);

  // Determine if Navbar and Footer should be displayed
  const showNavbarFooter = userRole !== 'admin' && userRole !== 'mechanic';
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        {showNavbarFooter && (
          <>
            <Navbar />
          </>
        )}
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ProductPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/companyCars" element={<CompanyCars />} /> */}
            <Route path="/carList" element={<CarList />} />
            <Route path="/rentalCars" element={<RentalCars />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            {/* <Route path="/customerCars" element={<CustomersCars />} /> */}
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/mechanic" element={<Mechanic />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/cars" element={<CarList />} />
            <Route path="/services" element={<Services />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        {showNavbarFooter && (
          <Footer />
        )}
      </Router>
    </div>

  )
}

export default App
