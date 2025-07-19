import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Electronics = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [sortOrder, setSortOrder] = useState('');
  const [offerOnly, setOfferOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/Electronics")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(product => product.price >= min && product.price <= max);
    }

    if (offerOnly) {
      filtered = filtered.filter(product => product.offerPrice && product.offerPrice < product.price);
    }

    if (featuredOnly) {
      filtered = filtered.filter(product => product.featured === true);
    }

    if (sortOrder === 'lowToHigh') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [searchTerm, priceRange, sortOrder, offerOnly, featuredOnly, products]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-36 mt-25 mb-20">
        <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">Explore Electronics</h2>

        {/* Filters */}
        <div className="bg-white/70 backdrop-blur-md rounded-xl shadow-md p-6 mb-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 transition-all">
          <input
            type="text"
            placeholder="🔍 Search product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            <option value="all">💰 All Prices</option>
            <option value="0-1000">₹0 - ₹1000</option>
            <option value="1000-5000">₹1000 - ₹5000</option>
            <option value="5000-10000">₹5000 - ₹10000</option>
            <option value="10000-999999">₹10000+</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none"
          >
            <option value="">🔃 Sort</option>
            <option value="lowToHigh">⬇️ Price: Low to High</option>
            <option value="highToLow">⬆️ Price: High to Low</option>
          </select>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 text-lg py-10">
            No products found. Try adjusting your filters.
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Electronics;