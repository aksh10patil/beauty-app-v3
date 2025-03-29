import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.webp';
import { Instagram, Twitter, Facebook } from 'lucide-react';

function Footer() {
    return (
        <div>
            <div className="bg-white text-gray-800 px-10 py-16">       
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <div className="flex flex-col items-center md:items-start">
                        <img src={logo} alt="Beauty at Home Logo" className="w-40 mb-4" />
                        <p className="text-lg font-serif">Stay Updated</p>
                        <p className="text-sm text-gray-600 mt-2">
                            Beauty At Home | 2025 - All Rights Reserved <br />
                        </p>
                    </div>

                    <div>
                        <h3 className="text-gray-500 uppercase text-sm tracking-wide mb-4">Pages</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about-us" className="hover:text-pink-600">About Us</Link></li>
                            <li><Link to="/Packages" className="hover:text-pink-600">Packages</Link></li>
                            <li><Link to="/Services" className="hover:text-pink-600">Our Services</Link></li>
                            <li><Link to="/Contact" className="hover:text-pink-600">Contacts</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-500 uppercase text-sm tracking-wide mb-4">Contacts</h3>
                        <p className="text-gray-700">
                            Rampur Garden, Civil Line, Bareilly, Uttar Pradesh
                        </p>
                        <p className="mt-2 text-gray-700">
                            Mon – Fri: 9:30 am – 8:00 pm <br />
                            Sat – Sun: Closed
                        </p>
                        <p className="mt-3 text-lg font-semibold text-green-700">
                            +91-7906427874
                        </p>
                        <p className="text-gray-600">info@beautyathome.co.in</p>

                        <div className="flex space-x-4 mt-4">

                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                            className="text-gray-600 hover:text-pink-600">
                                <Instagram size={24} />
                            </a>
                            <a href="https://x.com" target="_blank" rel="noopener noreferrer" 
                            className="text-gray-600 hover:text-black">
                                <Twitter size={24} />
                            </a>
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                            className="text-gray-600 hover:text-blue-600">
                                <Facebook size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;