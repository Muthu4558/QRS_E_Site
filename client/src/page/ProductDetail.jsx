import { useCart } from "../context/CartContext";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaStar, FaShoppingCart, FaShoppingBag } from "react-icons/fa";
import { motion } from "framer-motion";

const starCount = 5;

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState("specs");

    useEffect(() => {
        fetch(`http://localhost:5000/api/products/id/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading)
        return (
            <div className="min-h-screen flex items-center justify-center text-indigo-600 text-2xl font-semibold">
                Loading...
            </div>
        );
    if (!product)
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
                Product not found
            </div>
        );

    // Calculate discount percentage if offerPrice exists
    const discountPercent = product.offerPrice
        ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
        : 0;

    // Fake rating (replace with real rating if available)
    const rating = product.rating ? product.rating : 4.2;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;

    return (
        <>
            <Navbar />
            <div className="mt-18 min-h-[80vh] bg-gradient-to-br from-teal-50 via-indigo-50 to-gray-100 pt-10 pb-20 px-4">
                <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 flex flex-col md:flex-row gap-10">
                    {/* Image */}
                    <motion.div
                        className="flex-shrink-0 w-full md:w-1/2 flex items-center justify-center bg-white rounded-xl shadow-md"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        style={{ perspective: 1000 }}
                    >
                        <motion.img
                            src={`http://localhost:5000/uploads/${product.image}`}
                            alt={product.name}
                            className="rounded-xl object-contain max-h-[450px] cursor-zoom-in"
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3 }}
                        />
                    </motion.div>

                    {/* Info */}
                    <div className="flex flex-col flex-grow max-w-full md:max-w-md space-y-4">
                        {/* Title */}
                        <h1 className="text-4xl font-extrabold text-indigo-900">{product.name}</h1>

                        {/* Pricing */}
                        <div className="flex items-baseline space-x-3">
                            <span className="text-3xl font-bold text-teal-700">
                                ₹{product.offerPrice ?? product.price}
                            </span>
                            {product.offerPrice && (
                                <>
                                    <span className="text-lg text-gray-400 line-through">
                                        ₹{product.price}
                                    </span>
                                    <span className="ml-auto bg-teal-100 text-teal-800 px-2 py-1 rounded-md text-sm font-semibold">
                                        {discountPercent}% OFF
                                    </span>
                                </>
                            )}
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-2">
                            {[...Array(fullStars)].map((_, idx) => (
                                <FaStar key={idx} className="text-yellow-400" />
                            ))}
                            {halfStar && <FaStar className="text-yellow-400 opacity-50" />}
                            {[...Array(starCount - fullStars - (halfStar ? 1 : 0))].map((_, idx) => (
                                <FaStar key={idx} className="text-gray-300" />
                            ))}
                            <span className="ml-2 text-gray-600 font-medium">{rating.toFixed(1)}</span>
                        </div>

                        {/* Short Description */}
                        <p className="text-gray-700 leading-relaxed flex-grow">
                            {product.description || "No description available for this product."}
                        </p>

                        {/* Buttons */}
                        <div className="flex space-x-4 mt-4">
                            <motion.button
                                whileHover={{ scale: 1.07, boxShadow: "0 8px 24px rgba(13, 148, 136, .17)" }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => addToCart(product)}
                                className="
                                    flex items-center justify-center
                                    gap-2
                                    px-7 py-3
                                    bg-gradient-to-r from-teal-500 to-indigo-500
                                    text-white font-bold text-lg
                                    rounded-full
                                    shadow-xl hover:shadow-2xl
                                    transition-all duration-200
                                    focus:outline-none focus:ring-4 focus:ring-teal-300
                                    active:outline-none active:ring-2 active:ring-indigo-400
                                "
                                >
                                <FaShoppingCart className="w-5 h-5" />
                                Add to Cart
                            </motion.button>

                            {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex-1 py-3 rounded-full bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition"
              >
                <FaShoppingBag className="mr-2" />
                Buy Now
              </motion.button> */}
                        </div>
                    </div>
                </div>

                {/* Tabs: Specifications & Reviews */}
                <div className="max-w-6xl mx-auto mt-12 bg-white rounded-xl shadow-lg p-6">
                    <div className="flex border-b border-gray-200 mb-6">
                        <button
                            className={`py-3 px-6 font-semibold transition ${activeTab === "specs"
                                    ? "border-b-4 border-teal-600 text-teal-600"
                                    : "text-gray-600 hover:text-teal-600"
                                }`}
                            onClick={() => setActiveTab("specs")}
                        >
                            Specifications
                        </button>
                        <button
                            className={`py-3 px-6 font-semibold transition ${activeTab === "reviews"
                                    ? "border-b-4 border-indigo-600 text-indigo-600"
                                    : "text-gray-600 hover:text-indigo-600"
                                }`}
                            onClick={() => setActiveTab("reviews")}
                        >
                            Customer Reviews
                        </button>
                    </div>

                    {activeTab === "specs" && (
                        <motion.div
                            key="specs"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-6"
                        >
                            {/* Replace below specs with real product specs */}
                            <div>
                                <h3 className="font-semibold mb-2">General</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Category: {product.category}</li>
                                    <li>Available Stock: {product.stock ?? "N/A"}</li>
                                    <li>Brand: {product.brand ?? "N/A"}</li>
                                </ul>
                            </div>
                            {/* <div>
                                <h3 className="font-semibold mb-2">Technical Details</h3>
                                <ul className="list-disc list-inside space-y-1">
                                    <li>Weight: {product.weight ?? "N/A"}</li>
                                    <li>Dimensions: {product.dimensions ?? "N/A"}</li>
                                    <li>Material: {product.material ?? "N/A"}</li>
                                </ul>
                            </div> */}
                        </motion.div>
                    )}

                    {activeTab === "reviews" && (
                        <motion.div
                            key="reviews"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="space-y-6"
                        >
                            {/* Replace with dynamic reviews */}
                            <Review
                                author="Jane Doe"
                                rating={4.5}
                                comment="Great product! Highly recommend."
                            />
                            <Review
                                author="John Smith"
                                rating={4}
                                comment="Good value for money. Packaging was nice."
                            />
                        </motion.div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

const Review = ({ author, rating, comment }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const starCount = 5;

    return (
        <div className="bg-gray-50 rounded-lg p-5 shadow-sm">
            <div className="flex items-center mb-2">
                <div className="flex text-yellow-400 mr-2">
                    {[...Array(fullStars)].map((_, idx) => (
                        <FaStar key={idx} />
                    ))}
                    {halfStar && <FaStar className="opacity-50" />}
                    {[...Array(starCount - fullStars - (halfStar ? 1 : 0))].map((_, idx) => (
                        <FaStar key={idx} className="text-gray-300" />
                    ))}
                </div>
                <h4 className="font-semibold text-gray-700">{author}</h4>
            </div>
            <p className="text-gray-600">{comment}</p>
        </div>
    );
};

export default ProductDetail;