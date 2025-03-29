import Header from './components/Header';
import React from 'react';
import Footer from './components/Footer';
import { ShoppingCart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import pcarousel5 from '../assets/pcarousel5.webp';
import pcarousel2 from '../assets/pcarousel2.webp';
import bodymassagepg from '../assets/bodymassagepg.webp';

const Services = ({ cart = [], setCart }) => {
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = React.useState(false);

    const services = [
        {
            id: 1,
            name: "Hair Styling",
            description: "Professional hair styling services for all hair types and preferences.",
            image: pcarousel5,
            options: [
                { id: 101, name: "Women's Haircut", price: 65 },
                { id: 102, name: "Men's Haircut", price: 45 },
                { id: 103, name: "Color & Highlights", price: 120 },
                { id: 104, name: "Blowout & Styling", price: 55 },
            ]
        },
        {
            id: 2,
            name: "Facial Massage",
            description: "Rejuvenating facial treatments to refresh and revitalize your skin.",
            image: pcarousel2,
            options: [
                { id: 201, name: "Classic Facial", price: 80 },
                { id: 202, name: "Anti-Aging Treatment", price: 110 },
                { id: 203, name: "Hydrating Facial", price: 95 },
                { id: 204, name: "Deep Cleansing", price: 85 },
            ]
        },
        {
            id: 3,
            name: "Body Massage",
            description: "Therapeutic massage treatments to relieve stress and tension.",
            image: bodymassagepg,
            options: [
                { id: 301, name: "Swedish Massage (60 min)", price: 90 },
                { id: 302, name: "Deep Tissue (60 min)", price: 110 },
                { id: 303, name: "Hot Stone Massage", price: 130 },
                { id: 304, name: "Aromatherapy Massage", price: 100 },
            ]
        }
    ];

    const addToCart = React.useCallback((service, option) => {
        const cartItem = {
            id: `${service.id}-${option.id}`,
            serviceName: service.name,
            optionName: option.name,
            price: option.price
        };
        setCart((prevCart) => [...prevCart, cartItem]);
        setIsCartOpen(false);
    }, [setCart]);

    const removeFromCart = React.useCallback((itemId) => {
        setCart((prevCart) => prevCart.filter(item => item.id !== itemId));
    }, [setCart]);

    const getCartTotal = React.useCallback(() => {
        return cart.reduce((total, item) => total + item.price, 0);
    }, [cart]);

    const handleCheckout = () => {
        setIsCartOpen(false);
        navigate('/checkout');
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">

                <section className="bg-pink-100 py-16 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Our Services</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto px-4">
                        Indulge in our premium beauty and wellness services designed to enhance your natural beauty
                    </p>
                </section>


                <section className="max-w-6xl mx-auto py-16 px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {services.map(service => (
                            <article key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg">
                                <img
                                    src={service.image}
                                    alt={service.name}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{service.name}</h2>
                                    <p className="text-gray-600 mb-6">{service.description}</p>

                                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Options & Pricing</h3>
                                    <ul className="space-y-3">
                                        {service.options.map(option => (
                                            <li key={option.id} className="flex justify-between items-center border-b pb-2">
                                                <span>{option.name}</span>
                                                <div className="flex items-center">
                                                    <span className="font-medium mr-3">₹{option.price}</span>
                                                    <button
                                                        onClick={() => addToCart(service, option)}
                                                        className="bg-pink-500 text-white p-1 rounded-full hover:bg-pink-600 transition"
                                                        aria-label={`Add ₹{option.name} to cart`}
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>


                <div className={`fixed right-0 top-0 h-full w-80 bg-white shadow-lg transform transition-transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="p-4 bg-pink-500 text-white flex justify-between items-center">
                        <h2 className="text-xl font-bold flex items-center">
                            <ShoppingCart className="mr-2" size={20} />
                            Your Cart
                        </h2>
                        <button onClick={() => setIsCartOpen(false)} className="text-white" aria-label="Close cart">
                            &times;
                        </button>
                    </div>

                    <div className="p-4 overflow-y-auto h-[calc(100%-14rem)]">
                        {cart.length === 0 ? (
                            <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                        ) : (
                            <ul className="divide-y">
                                {cart.map(item => (
                                    <li key={item.id} className="py-3">
                                        <div className="flex justify-between">
                                            <div>
                                                <p className="font-medium">{item.serviceName}</p>
                                                <p className="text-sm text-gray-600">{item.optionName}</p>
                                            </div>
                                            <div className="flex items-start">
                                                <span className="font-medium mr-2">₹{item.price}</span>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="text-red-500 text-sm"
                                                    aria-label={`Remove ${item.optionName} from cart`}
                                                >
                                                    &times;
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 bg-white p-4 border-t">
                        <div className="flex justify-between mb-4">
                            <span className="font-medium">Total:</span>
                            <span className="font-bold">₹{getCartTotal()}</span>
                        </div>
                        <button
                            className={`w-full py-2 rounded ${cart.length > 0 ? 'bg-pink-500 text-white hover:bg-pink-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            disabled={cart.length === 0}
                            onClick={handleCheckout}
                            aria-label="Proceed to checkout"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>


                <button
                    className="fixed bottom-6 right-6 bg-pink-500 text-white p-3 rounded-full shadow-lg hover:bg-pink-600 transition flex items-center justify-center"
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    aria-label="Open cart"
                >
                    <ShoppingCart size={24} />
                    {cart.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                            {cart.length}
                        </span>
                    )}
                </button>
            </div>
            <Footer />
        </>
    );
};

export default React.memo(Services);