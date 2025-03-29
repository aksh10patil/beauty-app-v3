import React, { useRef } from 'react';
import dtanpg from '../../assets/dtanpg.webp';
import bodymassagepg from '../../assets/bodymassagepg.webp';
import manicurepg from '../../assets/manicurepg.webp';
import pgeyebrow from '../../assets/pgeyebrow.webp';


export default function PhotoGallery() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -650, // Adjust this value based on your card width
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 650, // Adjust this value based on your card width
        behavior: 'smooth'
      });
    }
  };




  const galleryItems = [
    { image: dtanpg, title: "D-Tan by Rebecca" },
    { image: manicurepg, title: "Eyebrow by Rebecca" },
    { image: bodymassagepg, title: "Body Massage" },
    { image: pgeyebrow, title: "Facial by Amanda" },
    { image: bodymassagepg, title: "Body Massage" },
    { image: pgeyebrow, title: "Facial by Amanda" },
  ];
  
  
  
  const AppointmentScheduler = () => {
      const[ formData, setFormData] = useState({
          Service: '',
          Stylist: '',
          name: '',
          phone:'',
          date: '',
          time: '',
          ampm: '',
      });
  
      const handleChange = (e) => {
          const { name , value } = e.target;
          setFormData( prevState => ({
              ...prevState,
              [name]: value
          }));
      }
  
      const handleSubmit = (e) => {
          e.preventDefault();
          console.log('Form Submitted:', formData);
          // for sending data to backend
          alert('Appointment request submitted! We will confirm shortly.');
      };






  return (
    <section className="py-16 bg-white">
      <div className="text-center">
        <p className="text-sm uppercase tracking-wide text-gray-500">Photo Gallery</p>
        <h2 className="text-4xl font-serif text-gray-800 mt-2">Your beauty is our priority</h2>
      </div>

      <div className="relative mt-8 overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="flex space-x-6 px-8 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {galleryItems.map((item, index) => (
            <div key={index} className="relative min-w-[300px] md:min-w-[350px] lg:min-w-[400px] flex-shrink-0">
              <img src={item.image} alt={item.title} className="rounded-lg object-cover w-full h-[450px]" />
              <p className="absolute bottom-4 left-4 text-white text-lg bg-black/50 px-3 py-1 rounded">
                {item.title}
              </p>
            </div>
          ))}
        </div>

        <button 
          onClick={scrollLeft}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
        >
          ←
        </button>
        <button 
          onClick={scrollRight}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
        >
          →
        </button>
      </div>


          <form />


    </section>

  );
}



}