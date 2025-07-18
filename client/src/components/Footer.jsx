import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-bold text-purple-400 mb-2">QRS Product</h2>
          <p className="text-gray-400">
            Discover quality products at unbeatable prices. Shop smart, live better with ShopNest.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/products" className="hover:text-white transition">Products</a></li>
            <li><a href="/about" className="hover:text-white transition">About Us</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
          <p className="text-gray-400 mb-4">hello@qrsproduct.com</p>
          <div className="flex justify-center md:justify-start gap-4 text-xl">
            <a href="#" className="hover:text-purple-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-purple-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-purple-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-purple-400 transition"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        &copy; 2025 QRS Product. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;