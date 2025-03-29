import React, { useState } from 'react';
import logo from '../../assets/logo.webp';
import { Link, useLocation } from 'react-router-dom';
import { Search, Instagram, Facebook } from 'lucide-react';

export default function BeautySalonHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/Home';

  return (
    <>
      <nav className={`flex items-center justify-between px-8 py-4 ${!isHomePage ? 'bg-rose-400' : ''}`}>
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center text-yellow-500 font-script">
            <img src={logo} alt="logo" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white font-medium">Home</Link>
          <Link to="/about-us" className="text-white font-medium">About Us</Link>
          <Link to="/Services" className="text-white font-medium flex items-center">
            Services
            <svg className="ml-1 w-1 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </Link>
          <Link to="/Blog" className="text-white font-medium">Blog</Link>
          <Link to="/Appointment" className="text-white font-medium">Appointment</Link>
          <Link to="/Packages" className="text-white font-medium">Packages</Link>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button type="button" aria-label="Search" className="text-white">
            <Search size={20} />
          </button>
          <a href="#" aria-label="Instagram" className="text-white">
            <Instagram size={20} />
          </a>
          <a href="#" aria-label="Facebook" className="text-white">
            <Facebook size={20} />
          </a>
          <Link to="/Services" className="border border-white text-white px-4 py-2 hover:bg-white hover:text-pink-300 transition duration-300">
            BOOK A VISIT
          </Link>
        </div>

        <button 
          type="button" 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 bg-opacity-90 p-4">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-white font-medium">Home</Link>
            <Link to="/about-us" className="text-white font-medium">About Us</Link>
            <Link to="/Services" className="text-white font-medium">Services</Link>
            <Link to="/Blog" className="text-white font-medium">Blog</Link>
            <Link to="/Appointment" className="text-white font-medium">Appointment</Link>
            <Link to="/Contact" className="text-white font-medium">Contacts</Link>
            <div className="flex space-x-4 pt-4">
              <a href="#" aria-label="Instagram" className="text-white">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Facebook" className="text-white">
                <Facebook size={20} />
              </a>
            </div>
            <Link to="/Services" className="border border-white text-white px-4 py-2 text-center">
              BOOK A VISIT
            </Link>
          </div>
        </div>
      )}
    </>
  );
}