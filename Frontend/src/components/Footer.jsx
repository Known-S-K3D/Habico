import React from 'react';

const Footer = () => (
  <footer className="pt-16 pb-8 bg-white border-t border-gray-100">
    <div className="container px-4 mx-auto">
      {/* <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
       
        <div className="lg:col-span-2">
          <a href="#" className="inline-block mb-4 text-2xl font-pacifico text-primary">Habico</a>
          <p className="max-w-md mb-6 text-gray-600">We offer premium quality clothing and accessories for men and women. Our mission is to provide sustainable fashion that lasts.</p>
          <div className="flex space-x-4">
            <a href="#" className="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"><i className="ri-facebook-fill"></i></a>
            <a href="#" className="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"><i className="ri-instagram-line"></i></a>
            <a href="#" className="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"><i className="ri-twitter-x-line"></i></a>
            <a href="#" className="flex items-center justify-center w-10 h-10 text-gray-600 transition-colors bg-gray-100 rounded-full hover:bg-gray-200"><i className="ri-pinterest-line"></i></a>
          </div>
        </div>
      
        <div>
          <h3 className="mb-4 font-semibold text-gray-900">Shop</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">All Product</a></li>
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">Inabel</a></li>
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">Ikat</a></li>
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">Kalinga Weaves</a></li>
          </ul>
        </div>
        //
        
        <div>
          <h3 className="mb-4 font-semibold text-gray-900">Help</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">Customer Service</a></li>
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">My Account</a></li>
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">Find a Store</a></li>
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">Shipping & Returns</a></li>
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">FAQs</a></li>
          </ul>
        </div>
      
        <div>
          <h3 className="mb-4 font-semibold text-gray-900">About</h3>
          <ul className="space-y-3">
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">About Us</a></li>
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">Sustainability</a></li>
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">Careers</a></li>
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">Press</a></li>
            <li><a href="#" className="text-gray-600 transition-colors hover:text-primary">Contact Us</a></li>
          </ul>
        </div>
      </div> */}
      <div className="pt-8 mt-12 border-t border-gray-100">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <p className="mb-4 text-sm text-gray-500 md:mb-0">&copy; 2025 Hobico. All rights reserved.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy Policy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms of Service</a>
            {/* <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Cookies Settings</a> */}
          </div>
          <div className="flex items-center mt-4 space-x-3 md:mt-0">
            <i className="text-2xl text-gray-600 ri-visa-fill"></i>
            <i className="text-2xl text-gray-600 ri-mastercard-fill"></i>
            <i className="text-2xl text-gray-600 ri-paypal-fill"></i>
            <i className="text-2xl text-gray-600 ri-apple-fill"></i>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
