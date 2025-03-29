import React from 'react';
import pcarousel1 from '../../assets/pcarousel1.webp'
import pcarousel2 from '../../assets/pcarousel2.webp'
import pcarousel3 from '../../assets/pcarousel3.webp'
import pcarousel4 from '../../assets/pcarousel4.webp'
import pcarousel5 from '../../assets/pcarousel5.webp'
import pcarousel6 from '../../assets/pcarousel6.webp'

function Photocarousel() {

  const serviceImages = [
    pcarousel1,
    pcarousel2,
    pcarousel3,
    pcarousel4,
    pcarousel5,
    pcarousel6
  ];

  return (
    <div className="w-full overflow-hidden mt-10">

      <div className="flex overflow-x-auto space-x-4 pb-4">
        {serviceImages.map((image, index) => (
          <div 
            key={index} 
            className="flex-none w-64 h-48 md:w-72 md:h-56 relative"
          >
            <img 
              src={image} 
              alt={`Spa service ${index + 1}`} 
              className="w-full h-full object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Photocarousel;