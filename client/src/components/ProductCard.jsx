import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShoppingCart } from "react-icons/fa";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();

    return (
        <motion.div
            className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition duration-300 relative group w-full max-w-[380px] mx-auto"
            whileHover={{ scale: 1.03 }}
        >
            {/* Cart Icon */}
            <div className="absolute top-3 right-3 bg-purple-100 p-2 rounded-full cursor-pointer hover:bg-purple-200 transition">
                <FaShoppingCart className="text-purple-700 text-lg" />
            </div>

            {/* Product Image */}
            <img
                src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${product.image}`}
                alt={product.name}
                className="h-64 w-full object-cover rounded-lg"
            />

            {/* Product Info */}
            <h3 className="text-lg font-semibold text-gray-800 mt-3 truncate">{product.name}</h3>
            <div className="flex items-center gap-2 mt-1">
                <p className="text-sm text-gray-400 line-through">₹{product.price}</p>
                <p className="text-lg font-bold text-green-600">₹{product.offerPrice}</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-4 flex gap-3">
                <button
                    onClick={() => addToCart(product)}
                    className="w-1/2 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition cursor-pointer">
                    Add to Cart
                </button>
                <button
                    onClick={() => navigate(`/products/${product._id}`)}
                    className="w-1/2 py-2 border border-gray-300 text-gray-800 rounded-xl hover:bg-gray-100 transition cursor-pointer">
                    View
                </button>
            </div>

        </motion.div>
    );
};

export default ProductCard;