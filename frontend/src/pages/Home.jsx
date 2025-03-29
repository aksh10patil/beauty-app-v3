import React, { useState } from 'react';
import { Search, Instagram, Facebook } from 'lucide-react';
import logo from '../assets/logo.webp';
import headerleft from '../assets/headerleft.webp';
import headerRight from '../assets/headerRight.webp';
import spaceimageright from '../assets/spaceimageright.webp';
import spaceimageleft from '../assets/spaceimageleft.webp';
import ServiceList from './ServiceList'
import Abovefooter from './Abovefooter'
import { Link } from 'react-router-dom';
import Header from './components/Header';
import Packages from './Packages';
import Footer from './components/Footer';



const BeautySalonHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="relative w-full h-screen">
      {/* Split background layout */}
      <div className="flex h-full">
        <div className="w-1/2 bg-gray-300">
        <img src={headerleft} alt = 'logo' className='w-full h-full object-cover' />
        </div>
        <div className="w-1/2 bg-pink-200">
        <img src={headerRight} alt='headerRight' className='w-full h-full object-cover' />
        </div>
      </div>
      

      <div className="absolute inset-0 flex flex-col">
        {/* Navigation bar */}
        <Header />
        
        {/* Hero content */}
        <div className="flex-1 flex items-center px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-6xl md:text-8xl font-dm font-light text-black leading-tight">
            <span className="italic text-white">Bea</span>
            <span className='italic'>utiful </span>
               <span className="italic">you,</span>
              <br />
              <span className="font-script text-5xl md:text-7xl text-pink-100 pl-12">from  </span><span className='font-dm italic'>head to toe</span>
            </h1>
            <p className="mt-6 text-white text-xl max-w-xl mx-auto">
              We're excited to offer a variety of services to make your nails, hair, makeup, brows, and lashes look great!
            </p>
            
            {/* Services menu button */}
            <div className="flex justify-center items-center mt-12 href=">
            <Link to="/Services" className="text-white font-medium"> <button className="bg-white rounded-full w-32 h-32 
              flex flex-col items-center justify-center text-gray-800 
              transform transition hover:scale-105">
                
                <span className="text-xs tracking-wider">OUR</span>
                <span className="text-sm tracking-wider">SERVICES</span>
                <span className="text-sm tracking-wider">MENU</span>
              </button></Link>
            </div>
          </div>
        </div>
      </div>
        
            <div className="flex justify-center items-center text-gray-500 h-screen w-full font-dm text-center">
              <h1 className="text-4xl md:text-6xl font-light leading-snug max-w-3xl">
                We are here for you and excited to serve you as you trust us with your look. 
                Let’s collaborate on your vision to make it come alive.
              </h1>
            </div>

            <div>
            <div className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16 bg-white">
      

      <div className="md:w-1/2">
        <h4 className="text-sm tracking-wide uppercase text-gray-500">A SPACE FOR YOU</h4>
        <h1 className="text-4xl md:text-5xl font-serif text-gray-800 mt-4 leading-tight">
          Personalized beauty treatments <br />
          <span className="italic text-pink-500">tailored</span> to you
        </h1>
      </div>


      <div className="md:w-1/2 flex justify-center relative">
        <img
          src={spaceimageright}
          alt="Facial Treatment"
          className="w-80 md:w-96 rounded-lg shadow-lg transform rotate-6"
        />
        <img
          src={spaceimageleft}
          alt="Salon Interior"
          className="w-100 md:w-80 rounded-lg shadow-lg absolute -left-20 -bottom-16 transform -rotate-6"
        />
      </div>


    </div>
  </div>

  <ServiceList />
  <Abovefooter />
  <Footer />

  
    

          


    </div>



    
  );
};

export default BeautySalonHeader;