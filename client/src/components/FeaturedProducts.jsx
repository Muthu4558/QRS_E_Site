import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaShoppingCart } from 'react-icons/fa';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const productData = {
  Electronics: [
    { name: 'Smartphone', price: '₹30,000', offer: '₹24,999', img: 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/25626687/DSC08433.jpg?quality=90&strip=all&crop=16.675%2C0%2C66.65%2C100&w=2400' },
    { name: 'Headphones', price: '₹5,000', offer: '₹3,999', img: 'https://www.portronics.com/cdn/shop/files/Portronics_Muff_M3_best_headphones_under_5000.jpg?v=1744893854' },
    { name: 'Laptop', price: '₹70,000', offer: '₹59,999', img: 'https://pyxis.nymag.com/v1/imgs/c74/0b3/1c74372712c9ec655ac6b6b191eaabf118.rsquare.w600.jpg'},
    { name: 'Earbuds', price: '₹1500', offer: '₹999', img: 'https://m.media-amazon.com/images/I/51fkoZe-K6L.jpg' },
    { name: 'Mouse', price: '₹2,000', offer: '₹999', img: 'https://www.intex.in/cdn/shop/files/Nova.png?v=1720503757' },
    { name: 'Keyboard', price: '₹800', offer: '₹599', img: 'https://rukminim2.flixcart.com/image/704/844/xif0q/keyboard/desktop-keyboard/w/l/6/gaming-keyboard-with-87-keys-rgb-backlit-with-suspension-keys-original-imagzcgwtrabgjna.jpeg?q=90&crop=false' },
  ],
  Clothes: [
    { name: 'T-Shirt', price: '₹999', offer: '₹699', img: 'https://adimanav.com/cdn/shop/files/O.jpg?v=1713944514' },
    { name: 'Jeans', price: '₹2,000', offer: '₹1,499', img: 'https://www.realsimple.com/thmb/pylBi8okBliW5e5qvCQFWPQatoc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/types-of-denim-GettyImages-598820544-c87ecea4d6454e4a9184a35226c97735.jpg' },
    { name: 'Jacket', price: '₹3,000', offer: '₹2,499', img: 'https://www.voganow.com/cdn/shop/files/BBGJ-1108-014_2_copy.jpg?v=1752318542' },
    { name: 'Formal Pant', price: '₹999', offer: '₹699', img: 'https://media-uk.landmarkshops.in/cdn-cgi/image/h=730,w=540,q=85,fit=cover/lifestyle/1000012121840-Green-Olive-1000012121840_01-2100.jpg' },
    { name: 'Shorts', price: '₹2,000', offer: '₹1,499', img: 'https://bowandsquare.com/cdn/shop/files/1_96c0ebd8-9644-4c55-aa29-c23be6624064.png?v=1718283969' },
    { name: 'Hoodie', price: '₹3,000', offer: '₹2,499', img: 'https://assets.ajio.com/medias/sys_master/root/20240913/HDXy/66e468d16f60443f317a071a/-473Wx593H-700420474-white-MODEL.jpg' },
  ],
  Accessories: [
    { name: 'Watch', price: '₹4,000', offer: '₹3,199', img: 'https://www.fastrack.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw8089233e/images/Fastrack/Catalog/3308KM03_2.jpg?sw=600&sh=600' },
    { name: 'Belt', price: '₹1,000', offer: '₹799', img: 'https://www.jiomart.com/images/product/original/rvxrzbzksi/cimoni-classic-executive-men-s-leather-belt-semi-formal-pure-leather-belt-color-tan-brown-waist-upto-38-genuine-leather-belt-product-images-rvxrzbzksi-0-202208010436.jpg?im=Resize=(500,630)' },
    { name: 'Sunglasses', price: '₹1,500', offer: '₹999', img: 'https://images-cdn.ubuy.co.in/6429582590740665f65bb234-wearme-pro-flat-top-polarized-lens.jpg' },
    { name: 'Bracelet', price: '₹4,000', offer: '₹3,199', img: 'https://karizmajewels.com/cdn/shop/files/menbrals29.jpg?v=1733224832&width=1080' }
  ],
};

const Section = ({ title, products, index }) => (
  <div className="mb-16">
    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">{title}</h2>
    <div className="relative">
      <Swiper
        spaceBetween={20}
        slidesPerView={1.2}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation={{
          nextEl: `.next-${index}`,
          prevEl: `.prev-${index}`,
        }}
        modules={[Navigation]}
      >
        {products.map((product, i) => (
          <SwiperSlide key={i} className="px-1 sm:px-2 py-6">
            <motion.div
              className="bg-gray-100 rounded-2xl p-4 shadow-md hover:shadow-xl transition duration-300 relative group"
              whileHover={{ scale: 1.03 }}
            >
              <div className="absolute top-3 right-3 bg-white p-2 rounded-full cursor-pointer hover:bg-purple-100">
                <FaShoppingCart className="text-gray-600 text-lg" />
              </div>
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-64 object-cover rounded-xl mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-sm text-gray-500 line-through">{product.price}</p>
              <p className="text-xl font-bold text-green-600">{product.offer}</p>
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

      {/* Custom Nav Buttons */}
      <div className="absolute -bottom-12 right-2 flex gap-3 z-10">
        <button
          className={`prev-${index} p-2 bg-purple-100 rounded-full hover:bg-purple-600 hover:text-white transition`}
        >
          <IoIosArrowBack size={20} />
        </button>
        <button
          className={`next-${index} p-2 bg-purple-100 rounded-full hover:bg-purple-600 hover:text-white transition`}
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </div>
  </div>
);

const FeaturedProducts = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
        Featured Products
      </h1>
      {Object.entries(productData).map(([category, products], i) => (
        <Section key={category} title={category} products={products} index={i} />
      ))}
    </div>
  );
};

export default FeaturedProducts;