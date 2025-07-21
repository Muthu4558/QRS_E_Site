import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Aarav Mehta',
    role: 'Fashion Retailer',
    message:
      'ShopNest has completely changed the way I run my store. The UI is smooth, and I love how fast I can add new products.',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
    rating: 5,
  },
  {
    name: 'Sneha Patel',
    role: 'Tech Blogger',
    message:
      'Excellent platform for buying and selling electronics. Their support team is also super responsive.',
    avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 4,
  },
  {
    name: 'Rahul Singh',
    role: 'Freelancer',
    message:
      'The best e-commerce experience I’ve had in a while. The site loads fast, is user-friendly, and checkout is smooth.',
    avatar: 'https://randomuser.me/api/portraits/men/40.jpg',
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col justify-center py-12 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">💬 What Our Customers Say</h1>
        <p className="text-gray-600 mt-2 text-lg">
          Hear from our happy customers who trust ShopNest.
        </p>
      </div>

      {/* Testimonial Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((item, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.03 }}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
          >
            <div className="flex items-center mb-4">
              <img
                src={item.avatar}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h3 className="font-semibold text-gray-800">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>
            <p className="text-gray-700 italic mb-4">“{item.message}”</p>
            <div className="flex text-yellow-400">
              {Array.from({ length: item.rating }, (_, i) => (
                <FaStar key={i} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;