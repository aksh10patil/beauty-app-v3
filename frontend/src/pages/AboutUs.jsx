import React from 'react';
import logo from '../assets/logo.webp';
import abovefooter from '../assets/abovefooter.webp';
import aboutus from '../assets/aboutus.webp';
import PhotoGallery from './components/PhotoGallery';
import Form from './components/Form';
import Header from './components/Header';


function AboutUs() {
  return (

        <>
                    <div class="bg-pink-200 p-3 flex flex-wrap items-center justify-between">

                    <div class="flex items-center space-x-6">

                        <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span class="ml-2 text-gray-700">Rampur garden, civil line, Bareilly</span>
                        </div>
                        

                        <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="ml-2 text-gray-700">Mon – Sat: 8:30 am – 8:00 pm, Sun: Closed</span>
                        </div>
                    </div>
                    

                    <div class="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span class="ml-2 text-gray-700 font-medium">+91 9876543210 Instagram - Facebook</span>
                    </div>
                    </div>
                    <Header />


                   



            <div>
            <section class="flex flex-col md:flex-row w-full">

            <div class="w-full md:w-1/2">
                <img 
                src={abovefooter} 
                alt="Smiling stylist in salon" 
                class="w-full h-full object-cover"
                />
            </div>
            
            

            <div class="w-full md:w-1/2 bg-stone-100 flex items-center p-8 md:p-16">
                <div class="max-w-lg">
                <h3 class="uppercase text-gray-700 tracking-wider text-sm font-medium mb-6">ABOUT US</h3>
                
                <h2 class="text-4xl md:text-5xl lg:text-6xl font-serif text-gray-800 mb-8">
                    Why We are the Best?
                </h2>
                
                <p class="text-gray-600 text-lg leading-relaxed">
                    We are here for you and excited to serve you as you trust us with your look. Let's collaborate on your vision to make it come alive.
                </p>
                </div>
            </div>
            </section>
            </div>

            <div>

            <section className="bg-white py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Text Section */}
        <div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mb-4">About Us</h2>
          <p className="text-gray-600 leading-relaxed">
            We created this space with you in mind, for your time with us to be calming and invigorating. 
            It’s your time to rest easy in our salon home. But before you’re gone, pay our photo booth a visit 
            and you’ll be so glad you did. We are here for you and excited to serve you as you trust us with your look. 
            Let’s collaborate on your vision to make it come alive.
          </p>
        </div>

        {/* Image Section */}
        <div className="relative">
          <div className="w-full h-[450px] overflow-hidden rounded-lg shadow-lg">
            <img
              src={aboutus}
              alt="Beauty Salon"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Decorative Effect */}
          <div className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 w-24 h-24 bg-white rounded-full shadow-md"></div>
        </div>
        
      </div>
    </section>

            </div>

            <div>
                    <PhotoGallery />
                    <Form />

            </div>

           
        </>


  );
}

export default AboutUs;