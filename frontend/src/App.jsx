import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import React, { useState } from 'react';
import Home from "./pages/Home"
import AboutUs from "./pages/AboutUs"
import Appointment from "./pages/Appointment";
import Services from "./pages/Services";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/AdminPanel"
// import ProtectedRoute from './pages/ProtectedRoute';
import AdminLogin from './pages/AdminLogin';




const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return children;
};


export default function App() {
  const [cart, setCart] = useState([]);

  return (
      <>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/Appointment" element={<Appointment />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Login" element={<AdminLogin />} />

            <Route path="/Services" element={<Services cart={cart} setCart={setCart} />} />
                  <Route 
                path="/checkout" 
                element={<Checkout cart={cart} setCart={setCart} />} 
              />
                  <Route path="/admin/login" element={<AdminLogin />} />
                          <Route 
                            path="/admin/appointments" 
                            element={
                              <ProtectedRoute>
                                <AdminPanel />
                              </ProtectedRoute>
                            } 
                  />
          </Routes>
      </>
  )
}
