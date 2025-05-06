import React, { useState, useEffect } from 'react';
import { Save, PlusCircle, Trash2, ChevronDown, ChevronUp, Upload, Image as ImageIcon } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios';
import img1 from '../assets/img1.jpeg';
import img2 from '../assets/img2.jpeg';
import img3 from '../assets/img3.jpeg';
import img4 from '../assets/img4.jpeg';

// API URL configuration
const API_URL = 'https://beauty-app-v3-9yge.onrender.com/api';

const PackagesAdminPanel = () => {
  const [packages, setPackages] = useState([]);
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(true);

  // Load packages data on component mount
  useEffect(() => {
    fetchPackages();
  }, []);

  // Fetch packages from API
  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/packages`);
      setPackages(response.data);
      setLoading(false);
    } catch (error) {
      showMessage(`Error loading packages: ${error.message}`, 'error');
      setLoading(false);
    }
  };

  // Show status message
  const showMessage = (message, type) => {
    setStatusMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setStatusMessage('');
      setMessageType('');
    }, 3000);
  };

  // Toggle expanded package
  const togglePackage = (id) => {
    setExpandedPackage(expandedPackage === id ? null : id);
  };

  // Add a new package
  const addPackage = async () => {
    try {
      const newPackage = {
        name: 'New Package',
        description: 'Package description',
        image: 'https://via.placeholder.com/400x300',
        price: 2500,
        features: []
      };
      
      const response = await axios.post(`${API_URL}/packages`, newPackage);
      setPackages([...packages, response.data]);
      setExpandedPackage(response.data._id);
      showMessage('Package added successfully!', 'success');
    } catch (error) {
      showMessage(`Error adding package: ${error.message}`, 'error');
    }
  };

  // Update package data
  const updatePackage = async (id, field, value) => {
    try {
      const pkg = packages.find(p => p._id === id);
      if (!pkg) return;
      
      // Ensure price is a number
      if (field === 'price') {
        value = Number(value) || 0;
      }
      
      const updatedPackage = { ...pkg, [field]: value };
      
      // Update UI optimistically
      setPackages(packages.map(p => p._id === id ? updatedPackage : p));
      
      // Send update to server
      await axios.put(`${API_URL}/packages/${id}`, updatedPackage);
    } catch (error) {
      // Revert to original data if update fails
      fetchPackages();
      showMessage(`Error updating package: ${error.message}`, 'error');
    }
  };

  // Save all packages changes to server
  const savePackages = async () => {
    try {
      showMessage('Saving all packages...', 'success');
      for (const pkg of packages) {
        await axios.put(`${API_URL}/packages/${pkg._id}`, pkg);
      }
      showMessage('All packages saved successfully!', 'success');
    } catch (error) {
      showMessage(`Error saving packages: ${error.message}`, 'error');
    }
  };

  // Delete a package
  const deletePackage = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await axios.delete(`${API_URL}/packages/${id}`);
        setPackages(packages.filter(pkg => pkg._id !== id));
        if (expandedPackage === id) {
          setExpandedPackage(null);
        }
        showMessage('Package deleted successfully!', 'success');
      } catch (error) {
        showMessage(`Error deleting package: ${error.message}`, 'error');
      }
    }
  };

  // Handle image upload with FormData for proper file uploads
  const handleImageUpload = async (e, id) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await axios.post(`${API_URL}/packages/upload/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const imageUrl = response.data.imageUrl;
      const updatedPackage = { ...packages.find(p => p._id === id), image: imageUrl };
      
      // First update the package in the database
      await axios.put(`${API_URL}/packages/${id}`, updatedPackage);
      
      // Then update the local state
      setPackages(packages.map(p => p._id === id ? updatedPackage : p));
      
      showMessage('Image updated successfully!', 'success');
    } catch (error) {
      showMessage(`Error uploading image: ${error.message}`, 'error');
    }
  };


  const placeholderImages = [img1, img2, img3, img4];
  

  // Handle image errors
  const handleImageError = (e) => {
    const randomImage = placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    e.target.src = randomImage;
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Packages Admin Panel</h1>
            
            {/* Status message display */}
            {statusMessage && (
              <div className={`mb-6 p-4 rounded-md ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {statusMessage}
              </div>
            )}

            {/* Loading indicator */}
            {loading && (
              <div className="mb-6 p-4 rounded-md bg-blue-100 text-blue-700">
                Loading packages from database...
              </div>
            )}

            {/* Packages Section */}
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-700">Packages</h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button 
                    onClick={addPackage}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-blue-600 transition w-full sm:w-auto"
                  >
                    <PlusCircle size={18} className="mr-1" />
                    Add Package
                  </button>
                  <button 
                    onClick={savePackages}
                    className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-green-600 transition w-full sm:w-auto"
                  >
                    <Save size={18} className="mr-1" />
                    Save All Packages
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {packages.map(pkg => (
                  <div key={pkg._id} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                      onClick={() => togglePackage(pkg._id)}
                    >
                      <div className="flex items-center">
                        {expandedPackage === pkg._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        <h3 className="font-medium ml-2">{pkg.name} - ₹{pkg.price}</h3>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePackage(pkg._id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    {expandedPackage === pkg._id && (
                      <div className="p-4 border-t">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                            <input 
                              type="text" 
                              value={pkg.name} 
                              onChange={(e) => updatePackage(pkg._id, 'name', e.target.value)}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                            <input 
                              type="number" 
                              value={pkg.price} 
                              onChange={(e) => updatePackage(pkg._id, 'price', e.target.value)}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea 
                            value={pkg.description} 
                            onChange={(e) => updatePackage(pkg._id, 'description', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            rows="3"
                          />
                        </div>

                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                          <input
                            type="text"
                            value={(pkg.features || []).join(', ')}
                            onChange={(e) => updatePackage(pkg._id, 'features', e.target.value.split(',').map(item => item.trim()))}
                            className="w-full p-2 border rounded-md"
                            placeholder="Feature 1, Feature 2, Feature 3"
                          />
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                          <div className="flex items-center">
                            <img 
                              src={pkg.image.startsWith('http') ? pkg.image : `${API_URL}${pkg.image}`} 
                              alt={pkg.name} 
                              className="h-16 w-16 object-cover rounded-md mr-2"
                              onError={handleImageError}
                            />
                            <label className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-300 flex items-center">
                              <Upload size={16} className="mr-1" />
                              Change Image
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden"
                                onChange={(e) => handleImageUpload(e, pkg._id)}
                              />
                            </label>
                          </div>
                        </div>

                        <div className="mt-4">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id={`popular-${pkg._id}`}
                              checked={pkg.isPopular || false}
                              onChange={(e) => updatePackage(pkg._id, 'isPopular', e.target.checked)}
                              className="mr-2"
                            />
                            <label htmlFor={`popular-${pkg._id}`} className="text-sm font-medium text-gray-700">Mark as Popular</label>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PackagesAdminPanel;