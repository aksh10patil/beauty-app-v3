
import logo from '../../assets/logo.webp';



export default function () {
    return (
        <>


            <div>
                        <div class="bg-white shadow-sm">
              <div class="container mx-auto px-4 flex items-center justify-between">

                <nav class="flex items-center space-x-8">
                  <a href="#" class="py-4 font-medium text-black">Home</a>
                  <a href="#" class="py-4 font-medium text-gray-500">About Us</a>
                  <div class="relative group">
                    <a href="#" class="py-4 font-medium text-gray-800 flex items-center">
                      Services
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </a>

                    <div class="absolute hidden group-hover:block bg-white shadow-md mt-1 py-2 w-48 z-10">
                      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Service 1</a>
                      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Service 2</a>
                      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-gray-100">Service 3</a>
                    </div>
                  </div>
                  <a href="#" class="py-4 font-medium text-gray-500">Blog</a>
                  <a href="#" class="py-4 font-medium text-gray-500">Appointment</a>
                  <a href="#" class="py-4 font-medium text-gray-500">Contacts</a>
                </nav>
                

                <div class="absolute left-1/2 transform -translate-x-1/2">
                  <img src={logo} alt="BHC Logo" class="h-16 w-16 rounded-full bg-black border-2 border-yellow-500" />
                </div>
                

                <div class="flex items-center space-x-6">

                  <button class="text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                  

                  <div class="relative">
                    <button class="text-gray-700">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </button>
                    <span class="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">2</span>
                  </div>
                  

                  <a href="#" class="border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors font-medium">BOOK A VISIT</a>
                </div>
               </div>
  

                <div class="border-b border-gray-200"></div>
              </div>
            </div>


        
        
        </>
    )
}