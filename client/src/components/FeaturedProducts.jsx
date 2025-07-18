import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'swiper/css';
import 'swiper/css/navigation';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/products/featured/all")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching featured products:", err));
  }, []);

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    const category = product.category || 'Others';
    if (!acc[category]) acc[category] = [];
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
        Featured Products
      </h1>

      {Object.entries(groupedProducts).map(([category, items], idx) => {
        const navPrev = `.prev-btn-${idx}`;
        const navNext = `.next-btn-${idx}`;

        return (
          <div key={category} className="mb-20">
            {/* Category Title */}
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">{category}</h2>

            <div className="relative">
              {/* Swiper Carousel */}
              <Swiper
                spaceBetween={20}
                slidesPerView={1.2}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
                navigation={{ prevEl: navPrev, nextEl: navNext }}
                modules={[Navigation]}
              >
                {items.map((product, i) => (
                  <SwiperSlide key={product._id || i} className="px-1 sm:px-2 py-6">
                    <motion.div
                      className="bg-gray-100 rounded-2xl p-4 shadow-md hover:shadow-xl transition duration-300 relative group"
                      whileHover={{ scale: 1.03 }}
                    >
                      <div className="absolute top-3 right-3 bg-white p-2 rounded-full cursor-pointer hover:bg-purple-100">
                        <FaShoppingCart className="text-gray-600 text-lg" />
                      </div>
                      <img
                        src={`http://localhost:5000/uploads/${product.image}`}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-xl mb-4"
                      />
                      <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                      <p className="text-sm text-gray-500 line-through">₹{product.price}</p>
                      <p className="text-xl font-bold text-green-600">₹{product.offerPrice}</p>
                      <div className="mt-4 flex gap-3">
                        <button className="w-1/2 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition">
                          Buy Now
                        </button>
                        <button className="w-1/2 py-2 bg-gray-300 text-gray-800 rounded-xl hover:bg-gray-400 transition">
                          View
                        </button>
                      </div>
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Swiper Navigation Buttons */}
              <div className="absolute -bottom-10 right-2 flex gap-3 z-10">
                <button className={`prev-btn-${idx} p-2 bg-purple-100 rounded-full hover:bg-purple-600 hover:text-white transition`}>
                  <IoIosArrowBack size={20} />
                </button>
                <button className={`next-btn-${idx} p-2 bg-purple-100 rounded-full hover:bg-purple-600 hover:text-white transition`}>
                  <IoIosArrowForward size={20} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FeaturedProducts;