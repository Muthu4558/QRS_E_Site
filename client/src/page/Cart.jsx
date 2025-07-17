import React from 'react';
import { FaTrash } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Cart = () => {
    const cartItems = [
        {
            id: 1,
            name: "Wireless Headphones",
            price: 1299,
            quantity: 1,
            image: "https://via.placeholder.com/100",
        },
        {
            id: 2,
            name: "Smart Watch",
            price: 1999,
            quantity: 2,
            image: "https://via.placeholder.com/100",
        },
    ];

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white py-12 px-4 mt-15">
                <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-4xl font-extrabold text-purple-700 mb-8 text-center">Your Shopping Cart</h2>

                    {cartItems.length === 0 ? (
                        <div className="text-center text-gray-500 text-xl py-20">
                            <p className="mb-4">Your cart is empty</p>
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-4085814-3371650.png" alt="Empty Cart" className="mx-auto w-52" />
                        </div>
                    ) : (
                        <>
                            <div className="space-y-6">
                                {cartItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-purple-100 shadow hover:shadow-md transition p-4 rounded-xl"
                                    >
                                        <div className="flex items-center gap-4">
                                            <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                                            <div>
                                                <h4 className="text-xl font-bold">{item.name}</h4>
                                                <p className="text-purple-600 font-semibold text-lg">₹{item.price}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                                            <div className="flex items-center border border-purple-300 rounded-md px-3 py-1">
                                                <button className="text-xl text-purple-500 hover:text-purple-700 px-2">-</button>
                                                <span className="px-3 font-medium">{item.quantity}</span>
                                                <button className="text-xl text-purple-500 hover:text-purple-700 px-2">+</button>
                                            </div>
                                            <button
                                                className="text-red-500 hover:text-red-700 text-2xl transition"
                                                title="Remove item"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t pt-6">
                                <div className="text-2xl font-semibold">
                                    Total: <span className="text-purple-700 font-bold">₹{total}</span>
                                </div>
                                <button className="mt-4 md:mt-0 bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 shadow-md transition duration-300">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Cart;