import React, { useState, useEffect, useCallback } from "react";
import { GoChevronDown } from "react-icons/go";
import { FaSearch } from "react-icons/fa";
import { Button } from "./ui/button";
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import debounce from "lodash.debounce";
import appointments from "@/pages/appointments";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userInitials, setUserInitials] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const [loading, setLoading] = useState(false); // State for loading
  const [isResultsVisible, setIsResultsVisible] = useState(false); // State for showing results
  const userId = localStorage.getItem("UserId");
  const appointmentsnotes= localStorage.getItem("appointment")

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");

    if (token && firstName && lastName) {
      setIsAuthenticated(true);
      setUserName(firstName);
      const initials = `${firstName[0]}${lastName[0]}`;
      setUserInitials(initials.toUpperCase());
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("UserId");
    localStorage.removeItem("userRole");


    setIsAuthenticated(false);
    setUserName("");
    setUserInitials("");

    window.location.href = "/"; // Use navigate instead of window.location.href
  };

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query) return;
      setLoading(true);
      setIsResultsVisible(true);

      try {
        const response = await fetch(`http://localhost:3001/carSearch/search?q=${encodeURIComponent(query)}`);

        if (response.ok) {
          const results = await response.json();
          setSearchResults(results);
        } else {
          console.error("Error fetching search results");
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    }, 300), // 300ms delay
    []
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setIsResultsVisible(false); // Close the search results
      setSearchResults([]);       // Clear the search results
    } else {
      debouncedSearch(query); // Call debounced function for searching
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    debouncedSearch(searchQuery); // Trigger search on form submit
  };

  const handleResultClick = (id) => {
    // Handle click on a search result
    // For example, navigate to the car details page
    window.location.href = `/products/${id}`;
  };

  return (
    <nav className=" bg-black border-b  fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
            
              <img
                className="h-14 pr-9 w-auto object-cover"
                src="/11.png"
                alt="Logo"
              />
           
            <div className="hidden sm:flex sm:items-center sm:space-x-4">
              <div className="flex space-x-4">
                <a
                  href="/"
                  className="text-white hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </a>
                <div
                  href="#"
                  className="text-white hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium flex items-center "
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger className="" asChild>
                      <div className="flex items-center gap-1 border-none ">

                        <Button className="h-0 border-none" variant="outline">Cars</Button>
                        <GoChevronDown />

                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 bg-white mt-3">
                      <DropdownMenuSeparator />

                      <DropdownMenuCheckboxItem className="border-b hover:bg-gray-400 cursor-pointer">
                        <Link to="/rentalCars" className="w-full">
                          Cars for Rent
                        </Link>
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuSeparator />

                      <DropdownMenuCheckboxItem className="border-b hover:bg-gray-400 cursor-pointer">
                        <Link to="/carList" className="w-full">Car for Sale </Link>
                      </DropdownMenuCheckboxItem>
                     

                    
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <a
                  href="/services"
                  className="text-white hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Services
                </a>
                <a
                  href="/aboutUs"
                  className="text-white hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  About Us
                </a>

              </div>
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search for cars..."
                  className="px-4 py-2 rounded-md border border-gray-300 text-black"
                />
                <button
                  type="submit"
                  className="absolute inset-y-0 right-0 flex items-center px-3"
                >
                  <FaSearch className="text-gray-500" />
                </button>
                {isResultsVisible && (
                  <div className="absolute mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                    {loading ? (
                      <div className="p-4 text-center">Loading...</div>
                    ) : (
                      <ul>
                        {searchResults.length > 0 ? (
                          searchResults.map((car) => (
                            <li
                              key={car.id}
                              className="p-2 hover:bg-gray-200 cursor-pointer"
                              onClick={() => handleResultClick(car.id)}
                            >
                              {car.model} - {car.details}
                            </li>
                          ))
                        ) : (
                          <li className="p-2 text-gray-500">No results found</li>
                        )}
                      </ul>
                    )}
                  </div>
                )}
              </form>
            </div>
            <div className="ml-auto flex justify-center items-center">
              {!isAuthenticated ? (
                <a
                  href="/login"
                  className="text-white hover:text-orange-600 px-3 py-2 pt4 rounded-md text-sm font-medium"
                >
                  Login
                </a>
              ) : (
               
                <DropdownMenu>
                  <DropdownMenuTrigger className="" asChild>
                    <span className="text-white">
                      <Avatar className="bg-black cursor-pointer">
                        <AvatarFallback>{userInitials}</AvatarFallback>
                      </Avatar>
                    </span>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-white mt-3">
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="border-b font-bold text-center text-white text-lg bg-gradient-to-r from-orange-500 to-black ">
                      <p className=" w-full  py-2">{userName}</p>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <DropdownMenuItem className="border-b hover:bg-gray-400 cursor-pointer">
                      {userId != 1 &&
                        

                          <Link to='/inventory' className="text-black w-full  py-2 hover:text-orange-700">Inventory</Link>
                       
                      }
                    </DropdownMenuItem>
                    <DropdownMenuItem className="border-b hover:bg-gray-400 cursor-pointer relative">

                      {userId != 1 &&
                    

                          <Link to='/appointments' className="text-black w-full  py-2 hover:text-orange-700">Appointments</Link>
                       
                      }

                    </DropdownMenuItem>

                    <DropdownMenuSeparator />

                    <DropdownMenuItem onClick={handleLogout} className="py-3 hover:bg-red-600 cursor-pointer bg-red-500 text-white" >
                      
                        Logout
                     
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="/"
            className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
          <a
            href="/cars"
            className="text-white hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium flex items-center gap-3"
          >
            Cars
            <GoChevronDown />
          </a>
          <a
            href="/services"
            className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </a>
          <a
            href="/aboutUs"
            className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            About Us
          </a>

          {!isAuthenticated ? (
            <a
              href="/login"
              className="text-white hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Login
            </a>
          ) : (
            <button
              onClick={handleLogout}
              className="text-white hover:bg-gray-700 py-2"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
