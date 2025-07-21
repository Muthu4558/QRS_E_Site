import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX, FiChevronDown } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaCartPlus } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showProducts, setShowProducts] = useState(false);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      setShowNavbar(window.scrollY <= lastScrollY);
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  return (
    <nav
      className={`bg-white shadow-lg fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-purple-600">QRS Product</Link>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-lg font-medium items-center">
          <li><Link to="/" className="hover:text-purple-800">Home</Link></li>

          {/* Clickable Products Dropdown */}
          <li className="relative">
            <button
              className="flex items-center gap-1 text-black cursor-pointer"
              onClick={() => setShowProducts(!showProducts)}
            >
              Products <FiChevronDown className={`transition ${showProducts ? "rotate-180" : ""}`} size={16} />
            </button>
            {showProducts && (
              <ul className="absolute top-full left-0 bg-white shadow-md rounded-md mt-2 z-20 min-w-[160px]">
                <li>
                  <Link to="/products/electronics" className="block px-4 py-2 hover:bg-gray-100">Electronics</Link>
                </li>
                <li>
                  <Link to="/products/clothing" className="block px-4 py-2 hover:bg-gray-100">Clothing</Link>
                </li>
                <li>
                  <Link to="/products/accessories" className="block px-4 py-2 hover:bg-gray-100">Accessories</Link>
                </li>
              </ul>
            )}
          </li>

          {/* <li><Link to="/contact" className="hover:text-purple-800">Contact</Link></li> */}
          <li><Link to="/profile" className="hover:text-purple-800">Profile</Link></li>
          <li>
            <Link
              to="/cart"
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 font-medium shadow-sm"
            >
              <span>Cart</span>
              <FaCartPlus className="text-lg" />
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 font-medium shadow-sm"
            >
              Login
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white px-6 py-4 space-y-4 text-lg font-medium shadow"
        >
          <li><Link to="/" className="block">Home</Link></li>

          <li>
            <button
              onClick={() => setShowProducts(!showProducts)}
              className="flex justify-between w-full"
            >
              Products <FiChevronDown className={`${showProducts && "rotate-180"} transition`} />
            </button>
            {showProducts && (
              <ul className="mt-2 pl-4 space-y-2">
                <li><Link to="/products/electronics" className="block">Electronics</Link></li>
                <li><Link to="/products/clothing" className="block">Clothing</Link></li>
                <li><Link to="/products/accessories" className="block">Accessories</Link></li>
              </ul>
            )}
          </li>

          {/* <li><Link to="/contact" className="block">Contact</Link></li> */}
          <li><Link to="/profile" className="block">Profile</Link></li>
          <li>
            <Link
              to="/cart"
              className="flex items-center justify-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 shadow-md"
            >
              <span>Cart</span>
              <FaCartPlus className="text-lg" />
            </Link>
          </li>

          <li>
            <Link
              to="/login"
              className="flex items-center justify-center bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition duration-300 shadow-md"
            >
              Login
            </Link>
          </li>
        </motion.ul>
      )}
    </nav>
  );
};

export default Navbar;