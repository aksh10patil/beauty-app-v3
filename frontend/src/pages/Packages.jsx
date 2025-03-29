import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { ShoppingCart, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Packages = ({ cart = [], setCart }) => {
    const navigate = useNavigate();
    const [isCartOpen, setIsCartOpen] = React.useState(false);

    const packages = [
        {
            id: 1,
            name: "Normal Package",
            description: "Basic treatment options for those who want essential services.",
            price: "₹2500",
            color: "blue",
            features: [
                "EyeBrow",
                "Upperlip",
                "Hand massage",
                "Normal Wax (Full Hand)",
                "Face bleach",
                "Facial (Twacha / KYC)",
                
            ]
        },
        {
            id: 2,
            name: "Medium Package",
            description: "Enhanced services with more options and premium products.",
            price: "₹3500",
            color: "green",
            features: [
               "EyeBrow",
                "Upperlip",
                "Dry Manicure",
                "Wax (Full hand)",
                "Head Message (Oil)",
                "D-tan",
                "Facial (O3)",
            ],
            isPopular: true
        },
        {
            id: 3,
            name: "High Package",
            description: "Luxury treatment with extensive options and top-tier products.",
            price: "₹6000",
            color: "purple",
            features: [
               "EyeBrow",
                "Upperlip",
                "Dry Manicure",
                "Hair Trimming",
                "Head Message (Oil)",
                "D-tan (half hand & leg)",
                "D-tan (face)",
                "Facial (hydra)",
            ]
        },
        {
            id: 4,
            name: "Bridal Package",
            description: "Complete bridal service with everything needed for your special day.",
            price: "₹7500",
            color: "pink",
            features: [
                "EyeBrow",
                "Upperlip (Ricewax)",
                "Forehead (Ricewax)",
                "Hair Trimming",
                "Head Message (Oil)",
                "D-tan (half hand & leg)",
                "Face Bleach (O3)",
                "Facial (casmara / blossom / kanpeki)",

            ]
        }
    ];

    const getColorClasses = (color) => {
        const classes = {
            blue: {
                bg: "bg-blue-500",
                hover: "hover:bg-blue-600",
                border: "border-blue-500",
                text: "text-blue-500"
            },
            green: {
                bg: "bg-green-500",
                hover: "hover:bg-green-600",
                border: "border-green-500",
                text: "text-green-500"
            },
            purple: {
                bg: "bg-purple-500",
                hover: "hover:bg-purple-600",
                border: "border-purple-500",
                text: "text-purple-500"
            },
            pink: {
                bg: "bg-pink-500",
                hover: "hover:bg-pink-600",
                border: "border-pink-500",
                text: "text-pink-500"
            }
        };
        return classes[color] || classes.blue;
    };

    const addToCart = React.useCallback((pkg) => {
        const cartItem = {
            id: `package-${pkg.id}`,
            serviceName: `${pkg.name} Package`,
            optionName: "Complete Package",
            price: parseFloat(pkg.price.replace('₹', ''))
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
                {/* Page Header */}
                <section className="bg-pink-100 py-16 text-center">
                    <h1 className="text-4xl font-bold text-gray-800">Our Packages</h1>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto px-4">
                        Choose from our selection of carefully curated packages designed to meet your needs
                    </p>
                </section>

                {/* Packages Container */}
                <section className="py-16 px-4 overflow-x-auto">
                    <div className="max-w-6xl mx-auto flex flex-row space-x-6 min-w-max pb-6">
                        {packages.map(pkg => {
                            const colorClasses = getColorClasses(pkg.color);
                            return (
                                <article 
                                    key={pkg.id} 
                                    className={`w-72 bg-white rounded-lg shadow-md overflow-hidden transition transform hover:-translate-y-1 hover:shadow-lg relative ${pkg.isPopular ? `border-t-4 ${colorClasses.border}` : ''}`}
                                >
                                    {pkg.isPopular && (
                                        <div className="absolute top-0 right-0 bg-yellow-400 text-xs font-bold uppercase py-1 px-4 transform rotate-45 translate-x-7 translate-y-3 text-gray-800">
                                            Most Popular
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h2 className={`text-2xl font-bold mb-2 ${colorClasses.text}`}>{pkg.name}</h2>
                                        <div className="text-3xl font-bold my-4">{pkg.price}</div>
                                        <p className="text-gray-600 mb-6">{pkg.description}</p>

                                        <h3 className="text-lg font-semibold text-gray-700 mb-3">Features</h3>
                                        <ul className="space-y-3 mb-6">
                                            {pkg.features.map((feature, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-green-500 mr-2">✓</span>
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        
                                        <button
                                            onClick={() => addToCart(pkg)}
                                            className={`w-full py-3 text-white font-semibold rounded transition ${colorClasses.bg} ${colorClasses.hover}`}
                                            aria-label={`Select ${pkg.name}`}
                                        >
                                            Select Package
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </section>

                {/* Cart */}
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

                {/* Floating Cart Button */}
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

export default React.memo(Packages);