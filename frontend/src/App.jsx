import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React, { useState } from 'react';
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import Appointment from "./pages/Appointment";
import Services from "./pages/Services";
import Checkout from "./pages/Checkout";
import Packages from  "./pages/Packages";
import Contact from "./pages/Contact";

export default function App() {
  const [cart, setCart] = useState([]);

 
  return (
      <>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/Appointment" element={<Appointment />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Packages" element={<Packages cart={cart} setCart={setCart} />} />
            <Route path="/Services" element={<Services cart={cart} setCart={setCart} />} />
            <Route path="/Checkout" element={<Checkout cart={cart} setCart={setCart}/>} />
          </Routes>

      </>
  )
}