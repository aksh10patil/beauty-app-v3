import abovefooter from '../assets/abovefooter.webp';

export default function BeautyGlowUp() {
    return (
        <div>
            <div className="flex flex-col md:flex-row items-center justify-between h-screen">
                {/* Left - Image Section */}
                <div className="md:w-1/2 w-full h-full">
                    <img
                        src={abovefooter} 
                        alt="Salon Welcome"
                        className="w-full h-full object-cover"
                    />
                </div>
        
                {/* Right - Text Section */}
                <div className="md:w-1/2 w-full h-full bg-[#6D7154] text-white p-10 md:p-20 flex flex-col justify-center">
                    <h1 className="text-4xl md:text-5xl font-serif leading-tight text-white">
                        Exclusive all-in-one glow up beauty <br />
                        <span className="italic text-pink-300">packages</span>
                    </h1>
        
                    <p className="text-lg mt-6 text-gray-200">
                        We created this space with you in mind, for your time with us to be calming and invigorating.
                        It's your time to rest easy in our salon home. But before you're gone, pay our photo booth a visit
                        and you'll be so glad you did.
                    </p>
        
                    <ul className="mt-6 space-y-3">
                        <li className="flex items-center text-lg text-gray-100">
                            <span className="text-pink-300 text-xl mr-3">✔</span>
                            Tailored treatments for every client;
                        </li>
                        <li className="flex items-center text-lg text-gray-100">
                            <span className="text-pink-300 text-xl mr-3">✔</span>
                            A range of high-quality beauty services;
                        </li>
                        <li className="flex items-center text-lg text-gray-100">
                            <span className="text-pink-300 text-xl mr-3">✔</span>
                            Top-rated by our clients.
                        </li>
                    </ul>
                    <button 
                        onClick={() => window.location.href = '/packages'} 
                        className="bg-white text-gray-800 text-sm mt-4 tracking-wide px-4 py-3 border border-white hover:bg-gray-200 rounded-md transition"
                    >
                        LEARN MORE
                    </button>
                </div>
            </div>
        </div>
    );
}