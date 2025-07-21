import { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import 'swiper/css';
import 'swiper/css/navigation';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_APP_BASE_URL}/api/products/featured/all`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching featured products:", err));
  }, []);

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
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">{category}</h2>

            <div className="relative">
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
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
              </Swiper>

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