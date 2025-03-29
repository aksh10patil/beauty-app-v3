import Eyebrow from '../assets/eyebrow.jpg';
import facial from '../assets/facial.jpg';
import haircut from '../assets/haircut.jpg';
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    title: "Eyebrow",
    description: "Highlight your eyes and shape your brows with our brow and lash experts.",
    price: "$30",
    image: Eyebrow,
  },
  {
    title: "Hair Cut",
    description: "Get a fresh look for your hair with our talented hairstylists.",
    price: "$80",
    image: haircut,
  },
  {
    title: "Facial",
    description: "Try our rejuvenating facial treatments for glowing skin.",
    price: "$50",
    image: facial,
  },
];

export default function ServicesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? services.length - 1 : prevIndex - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === services.length - 1 ? 0 : prevIndex + 1));
  };

  const getNextIndex = (index) => {
    return index === services.length - 1 ? 0 : index + 1;
  };

  return (
    <div className="bg-[#f4ebe6] py-16 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        <div>
          <h4 className="text-sm tracking-widest text-gray-500 uppercase">Our Services</h4>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mt-4 leading-tight">
            A range of high-quality beauty services
          </h2>
        </div>

        <div className="relative flex items-center justify-center px-12">
          <button
            onClick={prevSlide}
            className="absolute left-0 z-20 bg-[#b48586] text-white p-3 rounded-full hover:bg-[#a46b6c] transition"
          >
            <FaArrowLeft />
          </button>

          <div className="relative w-[320px] md:w-[450px] h-[500px] overflow-visible">

            <div 
              className="absolute top-0 right-[-40px] w-[320px] md:w-[400px] h-[500px] shadow-lg rounded-lg overflow-hidden transform scale-90 opacity-50 z-0"
            >
              <img 
                src={services[getNextIndex(currentIndex)].image} 
                alt={services[getNextIndex(currentIndex)].title} 
                className="w-full h-full object-cover" 
              />
            </div>


            <div className="relative w-[320px] md:w-[400px] h-[500px] shadow-lg rounded-lg overflow-hidden z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full"
                >
                  <img 
                    src={services[currentIndex].image} 
                    alt={services[currentIndex].title} 
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-4 left-4 bg-white text-black px-3 py-1 rounded-full text-sm">
                    From {services[currentIndex].price}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-black bg-opacity-40 p-3 rounded text-white">
                    <h3 className="text-2xl font-serif">{services[currentIndex].title}</h3>
                    <p className="text-sm mt-1 max-w-[200px]">{services[currentIndex].description}</p>
                    <button className="mt-3 border border-white px-4 py-2 text-white hover:bg-white hover:text-gray-800 transition">
                      View Details
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 z-20 bg-[#b48586] text-white p-3 rounded-full hover:bg-[#a46b6c] transition"
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
}