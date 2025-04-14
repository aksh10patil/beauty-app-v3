import React, { useState, useEffect } from 'react';
import { Save, PlusCircle, Trash2, ChevronDown, ChevronUp, Upload, Image as ImageIcon } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import axios from 'axios'; // Make sure axios is installed

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000';
const API_URL = 'http://localhost:4000/api';

const AdminPanel2 = () => {
  const [services, setServices] = useState([]);
  const [expandedService, setExpandedService] = useState(null);
  const [expandedOption, setExpandedOption] = useState(null);
  const [packages, setPackages] = useState([]);
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [loading, setLoading] = useState(true);

  // Load all data on component mount
  useEffect(() => {
    fetchServices();
    fetchPackages();
  }, []);

  // Fetch services from API
  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/services`);
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      showMessage(`Error loading services: ${error.message}`, 'error');
      setLoading(false);
    }
  };

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

  // Toggle expanded service
  const toggleService = (id) => {
    setExpandedService(expandedService === id ? null : id);
    setExpandedOption(null); // Close any open option when toggling service
  };

  // Toggle expanded option
  const toggleOption = (id) => {
    setExpandedOption(expandedOption === id ? null : id);
  };

  // Toggle expanded package
  const togglePackage = (id) => {
    setExpandedPackage(expandedPackage === id ? null : id);
  };

  // Add a new service
  const addService = async () => {
    try {
      const newService = {
        name: 'New Service',
        description: 'Service description',
        image: 'https://via.placeholder.com/400x300',
        options: [
          {
            name: 'Standard Option',
            price: 1000
          }
        ]
      };
      
      const response = await axios.post(`${API_URL}/services`, newService);
      setServices([...services, response.data]);
      setExpandedService(response.data._id);
      showMessage('Service added successfully!', 'success');
    } catch (error) {
      showMessage(`Error adding service: ${error.message}`, 'error');
    }
  };

  // Add a new option to a service
  const addOption = async (serviceId) => {
    try {
      const service = services.find(s => s._id === serviceId);
      if (!service) return;
      
      const updatedOptions = [
        ...service.options,
        {
          name: 'New Option',
          price: 1000
        }
      ];
      
      const response = await axios.put(`${API_URL}/services/${serviceId}`, {
        ...service,
        options: updatedOptions
      });
      
      setServices(services.map(s => s._id === serviceId ? response.data : s));
      showMessage('Option added successfully!', 'success');
    } catch (error) {
      showMessage(`Error adding option: ${error.message}`, 'error');
    }
  };

  // Update service data
  const updateService = async (id, field, value) => {
    try {
      const service = services.find(s => s._id === id);
      if (!service) return;
      
      const updatedService = { ...service, [field]: value };
      
      // Update UI optimistically
      setServices(services.map(s => s._id === id ? updatedService : s));
      
      // Send update to server
      await axios.put(`${API_URL}/services/${id}`, updatedService);
    } catch (error) {
      // Revert to original data if update fails
      fetchServices();
      showMessage(`Error updating service: ${error.message}`, 'error');
    }
  };

  // Save all services changes to server (bulk save)
  const saveServices = async () => {
    try {
      showMessage('Saving all services...', 'success');
      // If you need to update multiple services at once, you could implement a bulk update API endpoint
      // For now, we'll save each service one by one
      for (const service of services) {
        await axios.put(`${API_URL}/services/${service._id}`, service);
      }
      showMessage('All services saved successfully!', 'success');
    } catch (error) {
      showMessage(`Error saving services: ${error.message}`, 'error');
    }
  };

  // Update option data
  const updateOption = async (serviceId, optionId, field, value) => {
    try {
      const service = services.find(s => s._id === serviceId);
      if (!service) return;
      
      const updatedOptions = service.options.map((option, index) => {
        if (index === optionId) {
          // If field is price, ensure it's a number
          if (field === 'price') {
            return { ...option, [field]: Number(value) || 0 };
          }
          return { ...option, [field]: value };
        }
        return option;
      });
      
      const updatedService = { ...service, options: updatedOptions };
      
      // Update UI optimistically
      setServices(services.map(s => s._id === serviceId ? updatedService : s));
      
      // Send update to server
      await axios.put(`${API_URL}/services/${serviceId}`, updatedService);
    } catch (error) {
      // Revert to original data if update fails
      fetchServices();
      showMessage(`Error updating option: ${error.message}`, 'error');
    }
  };

  // Delete a service
  const deleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await axios.delete(`${API_URL}/services/${id}`);
        setServices(services.filter(service => service._id !== id));
        if (expandedService === id) {
          setExpandedService(null);
        }
        showMessage('Service deleted successfully!', 'success');
      } catch (error) {
        showMessage(`Error deleting service: ${error.message}`, 'error');
      }
    }
  };

  // Delete an option
  const deleteOption = async (serviceId, optionId) => {
    if (window.confirm('Are you sure you want to delete this option?')) {
      try {
        const service = services.find(s => s._id === serviceId);
        if (!service) return;
        
        const updatedOptions = service.options.filter((_, index) => index !== optionId);
        const updatedService = { ...service, options: updatedOptions };
        
        await axios.put(`${API_URL}/services/${serviceId}`, updatedService);
        
        setServices(services.map(s => s._id === serviceId ? updatedService : s));
        if (expandedOption === optionId) {
          setExpandedOption(null);
        }
        showMessage('Option deleted successfully!', 'success');
      } catch (error) {
        showMessage(`Error deleting option: ${error.message}`, 'error');
      }
    }
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
      // If you need to update multiple packages at once, you could implement a bulk update API endpoint
      // For now, we'll save each package one by one
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
  const handleImageUpload = async (e, id, type) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append('image', file);
      
      let response;
      if (type === 'service') {
        response = await axios.post(`${API_URL}/services/upload/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        const updatedService = services.find(s => s._id === id);
        if (updatedService) {
          updatedService.image = response.data.imageUrl;
          setServices([...services.filter(s => s._id !== id), updatedService]);
        }
      } else if (type === 'package') {
        response = await axios.post(`${API_URL}/packages/upload/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        const updatedPackage = packages.find(p => p._id === id);
        if (updatedPackage) {
          updatedPackage.image = response.data.imageUrl;
          setPackages([...packages.filter(p => p._id !== id), updatedPackage]);
        }
      }
      
      showMessage('Image updated successfully!', 'success');
    } catch (error) {
      showMessage(`Error uploading image: ${error.message}`, 'error');
    }
  };

  // Handle image errors
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x300';
  };

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white shadow-md rounded-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Panel</h1>
            
            {/* Status message display */}
            {statusMessage && (
              <div className={`mb-6 p-4 rounded-md ${messageType === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {statusMessage}
              </div>
            )}

            {/* Loading indicator */}
            {loading && (
              <div className="mb-6 p-4 rounded-md bg-blue-100 text-blue-700">
                Loading data from database...
              </div>
            )}

            {/* Services Section */}
            <div className="mb-12">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <h2 className="text-2xl font-bold text-gray-700">Services</h2>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button 
                    onClick={addService}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-blue-600 transition w-full sm:w-auto"
                  >
                    <PlusCircle size={18} className="mr-1" />
                    Add Service
                  </button>
                  <button 
                    onClick={saveServices}
                    className="bg-green-500 text-white px-4 py-2 rounded-md flex items-center justify-center hover:bg-green-600 transition w-full sm:w-auto"
                  >
                    <Save size={18} className="mr-1" />
                    Save All Services
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {services.map(service => (
                  <div key={service._id} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                      onClick={() => toggleService(service._id)}
                    >
                      <div className="flex items-center">
                        {expandedService === service._id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        <h3 className="font-medium ml-2">{service.name}</h3>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteService(service._id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    {expandedService === service._id && (
                      <div className="p-4 border-t">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                            <input 
                              type="text" 
                              value={service.name} 
                              onChange={(e) => updateService(service._id, 'name', e.target.value)}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                            <div className="flex items-center">
                              <img 
                                src={service.image.startsWith('http') ? service.image : `${API_URL}${service.image}`} 
                                alt={service.name} 
                                className="h-10 w-10 object-cover rounded-md mr-2"
                                onError={handleImageError}
                              />
                              <label className="bg-gray-200 text-gray-700 px-3 py-1.5 rounded-md cursor-pointer hover:bg-gray-300 flex items-center">
                                <ImageIcon size={16} className="mr-1" />
                                Upload
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden"
                                  onChange={(e) => handleImageUpload(e, service._id, 'service')}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea 
                            value={service.description} 
                            onChange={(e) => updateService(service._id, 'description', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            rows="3"
                          />
                        </div>
                        
                        {/* Options Section */}
                        <div className="mt-6">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium text-gray-700">Options</h4>
                            <button 
                              onClick={() => addOption(service._id)}
                              className="text-blue-500 flex items-center text-sm hover:text-blue-700"
                            >
                              <PlusCircle size={16} className="mr-1" />
                              Add Option
                            </button>
                          </div>
                          
                          <div className="space-y-3">
                            {service.options && service.options.map((option, index) => (
                              <div key={index} className="border rounded-md">
                                <div 
                                  className="flex justify-between items-center p-3 cursor-pointer bg-gray-50 hover:bg-gray-100"
                                  onClick={() => toggleOption(index)}
                                >
                                  <div className="flex items-center">
                                    {expandedOption === index ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    <span className="ml-2">{option.name} - ₹{option.price}</span>
                                  </div>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteOption(service._id, index);
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                                
                                {expandedOption === index && (
                                  <div className="p-3 border-t">
                                    <div className="grid md:grid-cols-2 gap-3">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Option Name</label>
                                        <input 
                                          type="text" 
                                          value={option.name} 
                                          onChange={(e) => updateOption(service._id, index, 'name', e.target.value)}
                                          className="w-full p-2 border rounded-md"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                        <input 
                                          type="number" 
                                          value={option.price} 
                                          onChange={(e) => updateOption(service._id, index, 'price', e.target.value)}
                                          className="w-full p-2 border rounded-md"
                                        />
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
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
                          />
                        </div>
                        
                        <div>
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
                                onChange={(e) => handleImageUpload(e, pkg._id, 'package')}
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

export default AdminPanel2;