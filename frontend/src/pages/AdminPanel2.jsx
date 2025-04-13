import React, { useState, useEffect } from 'react';
import { Save, PlusCircle, Trash2, ChevronDown, ChevronUp, Upload, Image as ImageIcon } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import { Link } from 'react-router-dom';

const AdminPanel2 = () => {
  const [services, setServices] = useState([]);
  const [expandedService, setExpandedService] = useState(null);
  const [expandedOption, setExpandedOption] = useState(null);
  const [packages, setPackages] = useState([]);
  const [expandedPackage, setExpandedPackage] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLocalStorageAvailable, setIsLocalStorageAvailable] = useState(false);

  // Check if localStorage is available
  useEffect(() => {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      setIsLocalStorageAvailable(true);
    } catch (e) {
      setIsLocalStorageAvailable(false);
      showMessage('LocalStorage is not available. Changes will not be saved.', 'error');
    }
  }, []);

  // Load all data on component mount
  useEffect(() => {
    if (isLocalStorageAvailable) {
      loadServices();
      loadPackages();
    } else {
      // Set default data if localStorage is not available
      setDefaultData();
    }
  }, [isLocalStorageAvailable]);

  // Set default data when localStorage is not available
  const setDefaultData = () => {
    setServices([
      {
        id: 'service-1',
        name: 'Sample Service',
        description: 'This is a sample service description.',
        image: 'https://via.placeholder.com/400x300',
        options: [
          {
            id: 'option-1',
            name: 'Standard Option',
            price: 1000
          }
        ]
      }
    ]);
    
    setPackages([
      {
        id: 'package-1',
        name: 'Sample Package',
        description: 'This is a sample package description.',
        image: 'https://via.placeholder.com/400x300',
        price: 2500,
        services: []
      }
    ]);
  };

  // Load services from localStorage
  const loadServices = () => {
    try {
      const savedServices = localStorage.getItem('spaServices');
      if (savedServices) {
        setServices(JSON.parse(savedServices));
      } else {
        // If no services found in localStorage, set a default one
        setServices([
          {
            id: 'service-1',
            name: 'Sample Service',
            description: 'This is a sample service description.',
            image: 'https://via.placeholder.com/400x300',
            options: [
              {
                id: 'option-1',
                name: 'Standard Option',
                price: 1000
              }
            ]
          }
        ]);
      }
    } catch (error) {
      showMessage(`Error loading services: ${error.message}`, 'error');
      setDefaultData();
    }
  };

  // Load packages from localStorage
  const loadPackages = () => {
    try {
      const savedPackages = localStorage.getItem('spaPackages');
      if (savedPackages) {
        setPackages(JSON.parse(savedPackages));
      } else {
        // If no packages found in localStorage, set a default one
        setPackages([
          {
            id: 'package-1',
            name: 'Sample Package',
            description: 'This is a sample package description.',
            image: 'https://via.placeholder.com/400x300',
            price: 2500,
            services: []
          }
        ]);
      }
    } catch (error) {
      showMessage(`Error loading packages: ${error.message}`, 'error');
      setDefaultData();
    }
  };

  // Save services to localStorage
  const saveServices = () => {
    if (!isLocalStorageAvailable) {
      showMessage('LocalStorage is not available. Changes cannot be saved.', 'error');
      return;
    }
    
    try {
      localStorage.setItem('spaServices', JSON.stringify(services));
      showMessage('Services saved successfully!', 'success');
    } catch (error) {
      showMessage(`Error saving services: ${error.message}`, 'error');
    }
  };

  // Save packages to localStorage
  const savePackages = () => {
    if (!isLocalStorageAvailable) {
      showMessage('LocalStorage is not available. Changes cannot be saved.', 'error');
      return;
    }
    
    try {
      localStorage.setItem('spaPackages', JSON.stringify(packages));
      showMessage('Packages saved successfully!', 'success');
    } catch (error) {
      showMessage(`Error saving packages: ${error.message}`, 'error');
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
  const addService = () => {
    const newService = {
      id: `service-${Date.now()}`,
      name: 'New Service',
      description: 'Service description',
      image: 'https://via.placeholder.com/400x300',
      options: [
        {
          id: `option-${Date.now()}`,
          name: 'Standard Option',
          price: 1000
        }
      ]
    };
    setServices([...services, newService]);
    setExpandedService(newService.id);
  };

  // Add a new option to a service
  const addOption = (serviceId) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        return {
          ...service,
          options: [
            ...service.options,
            {
              id: `option-${Date.now()}`,
              name: 'New Option',
              price: 1000
            }
          ]
        };
      }
      return service;
    });
    setServices(updatedServices);
  };

  // Update service data
  const updateService = (id, field, value) => {
    const updatedServices = services.map(service => {
      if (service.id === id) {
        return { ...service, [field]: value };
      }
      return service;
    });
    setServices(updatedServices);
  };

  // Update option data
  const updateOption = (serviceId, optionId, field, value) => {
    const updatedServices = services.map(service => {
      if (service.id === serviceId) {
        const updatedOptions = service.options.map(option => {
          if (option.id === optionId) {
            // If field is price, ensure it's a number
            if (field === 'price') {
              return { ...option, [field]: Number(value) || 0 };
            }
            return { ...option, [field]: value };
          }
          return option;
        });
        return { ...service, options: updatedOptions };
      }
      return service;
    });
    setServices(updatedServices);
  };

  // Delete a service
  const deleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(service => service.id !== id));
      if (expandedService === id) {
        setExpandedService(null);
      }
    }
  };

  // Delete an option
  const deleteOption = (serviceId, optionId) => {
    if (window.confirm('Are you sure you want to delete this option?')) {
      const updatedServices = services.map(service => {
        if (service.id === serviceId) {
          return {
            ...service,
            options: service.options.filter(option => option.id !== optionId)
          };
        }
        return service;
      });
      setServices(updatedServices);
      if (expandedOption === optionId) {
        setExpandedOption(null);
      }
    }
  };

  // Add a new package
  const addPackage = () => {
    const newPackage = {
      id: `package-${Date.now()}`,
      name: 'New Package',
      description: 'Package description',
      image: 'https://via.placeholder.com/400x300',
      price: 2500,
      services: []
    };
    setPackages([...packages, newPackage]);
    setExpandedPackage(newPackage.id);
  };

  // Update package data
  const updatePackage = (id, field, value) => {
    const updatedPackages = packages.map(pkg => {
      if (pkg.id === id) {
        // Ensure price is a number
        if (field === 'price') {
          return { ...pkg, [field]: Number(value) || 0 };
        }
        return { ...pkg, [field]: value };
      }
      return pkg;
    });
    setPackages(updatedPackages);
  };

  // Delete a package
  const deletePackage = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(pkg => pkg.id !== id));
      if (expandedPackage === id) {
        setExpandedPackage(null);
      }
    }
  };

  // Handle image upload (modified to use base64 images that can be stored in localStorage)
  const handleImageUpload = (e, id, type) => {
    const file = e.target.files[0];
    if (file) {
      // Read file as data URL (base64)
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Image = reader.result;
        
        if (type === 'service') {
          updateService(id, 'image', base64Image);
        } else if (type === 'package') {
          updatePackage(id, 'image', base64Image);
        }
        
        showMessage('Image updated successfully!', 'success');
      };
      reader.onerror = () => {
        showMessage('Error reading image file', 'error');
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image errors
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x300';
  };

  return (
    <>
      <Header />

      <Link to="/">Go to All Appointments Page</Link>

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

            {/* LocalStorage warning */}
            {!isLocalStorageAvailable && (
              <div className="mb-6 p-4 rounded-md bg-yellow-100 text-yellow-700">
                Warning: LocalStorage is not available in this environment. Your changes will not be saved between page refreshes.
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
                  <div key={service.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                      onClick={() => toggleService(service.id)}
                    >
                      <div className="flex items-center">
                        {expandedService === service.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        <h3 className="font-medium ml-2">{service.name}</h3>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteService(service.id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    {expandedService === service.id && (
                      <div className="p-4 border-t">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
                            <input 
                              type="text" 
                              value={service.name} 
                              onChange={(e) => updateService(service.id, 'name', e.target.value)}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                            <div className="flex items-center">
                              <img 
                                src={service.image} 
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
                                  onChange={(e) => handleImageUpload(e, service.id, 'service')}
                                />
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea 
                            value={service.description} 
                            onChange={(e) => updateService(service.id, 'description', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            rows="3"
                          />
                        </div>
                        
                        {/* Options Section */}
                        <div className="mt-6">
                          <div className="flex justify-between items-center mb-3">
                            <h4 className="font-medium text-gray-700">Options</h4>
                            <button 
                              onClick={() => addOption(service.id)}
                              className="text-blue-500 flex items-center text-sm hover:text-blue-700"
                            >
                              <PlusCircle size={16} className="mr-1" />
                              Add Option
                            </button>
                          </div>
                          
                          <div className="space-y-3">
                            {service.options.map(option => (
                              <div key={option.id} className="border rounded-md">
                                <div 
                                  className="flex justify-between items-center p-3 cursor-pointer bg-gray-50 hover:bg-gray-100"
                                  onClick={() => toggleOption(option.id)}
                                >
                                  <div className="flex items-center">
                                    {expandedOption === option.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                                    <span className="ml-2">{option.name} - ₹{option.price}</span>
                                  </div>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      deleteOption(service.id, option.id);
                                    }}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 size={16} />
                                  </button>
                                </div>
                                
                                {expandedOption === option.id && (
                                  <div className="p-3 border-t">
                                    <div className="grid md:grid-cols-2 gap-3">
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Option Name</label>
                                        <input 
                                          type="text" 
                                          value={option.name} 
                                          onChange={(e) => updateOption(service.id, option.id, 'name', e.target.value)}
                                          className="w-full p-2 border rounded-md"
                                        />
                                      </div>
                                      <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                        <input 
                                          type="number" 
                                          value={option.price} 
                                          onChange={(e) => updateOption(service.id, option.id, 'price', e.target.value)}
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
                  <div key={pkg.id} className="border border-gray-200 rounded-lg bg-white overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer bg-gray-50 hover:bg-gray-100"
                      onClick={() => togglePackage(pkg.id)}
                    >
                      <div className="flex items-center">
                        {expandedPackage === pkg.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        <h3 className="font-medium ml-2">{pkg.name} - ₹{pkg.price}</h3>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          deletePackage(pkg.id);
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    {expandedPackage === pkg.id && (
                      <div className="p-4 border-t">
                        <div className="grid md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                            <input 
                              type="text" 
                              value={pkg.name} 
                              onChange={(e) => updatePackage(pkg.id, 'name', e.target.value)}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                            <input 
                              type="number" 
                              value={pkg.price} 
                              onChange={(e) => updatePackage(pkg.id, 'price', e.target.value)}
                              className="w-full p-2 border rounded-md"
                            />
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <textarea 
                            value={pkg.description} 
                            onChange={(e) => updatePackage(pkg.id, 'description', e.target.value)}
                            className="w-full p-2 border rounded-md"
                            rows="3"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                          <div className="flex items-center">
                            <img 
                              src={pkg.image} 
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
                                onChange={(e) => handleImageUpload(e, pkg.id, 'package')}
                              />
                            </label>
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
