import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* About Section */}
          <div>
          <img className='h-60 justify-self-end' src="samuele-errico-piccarini-FMbWFDiVRPs-unsplash.jpg" alt="" />

          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">About Us</h3>
            <p>
              Welcome to CarHub, your trusted platform for buying, selling, and renting cars. Our mission is to make automotive transactions easy, secure, and transparent. Whether you're looking to buy your dream car, sell your current vehicle, or find a rental, we've got you covered.
            </p>
          </div>
          {/* Quick Links Section */}
          {/* <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/carList" className="hover:underline">Buy a Car</a></li>
              <li><a href="/inventory" className="hover:underline">Sell a Car</a></li>
              <li><a href="/rentalCars" className="hover:underline">Rent a Car</a></li>
              <li><a href="/services" className="hover:underline">Services</a></li>
            </ul>
          </div> */}
          {/* Contact Section */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get in Touch</h3>
            <p>Email: support@carhub.com</p>
            <p>Phone: +961 71054903</p>
            <div className="flex space-x-4 mt-4">
              <a href="http://www.facebook.com" className="hover:text-orange-500"><i className="fab fa-facebook"></i> Facebook</a>
              <a href="http://www.x.com" className="hover:text-orange-500"><i className="fab fa-twitter"></i> Twitter</a>
              <a href="http://www.instagram.com" className="hover:text-orange-500"><i className="fab fa-instagram"></i> Instagram</a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 border-t pt-4 border-gray-700">
          <p>&copy; {new Date().getFullYear()} CarHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
