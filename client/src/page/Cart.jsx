import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { useCart } from '../context/CartContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConfirmDeleteModal = ({ open, productName, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl min-w-[320px] text-center relative">
        <h3 className="text-lg font-semibold mb-2 text-gray-800">Remove Item</h3>
        <p className="mb-5 text-gray-700">
          Are you sure you want to remove{' '}
          <span className="font-bold text-purple-700">{productName}</span> from your cart?
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <button
            className="bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 cursor-pointer"
            onClick={onConfirm}
          >
            Yes, Remove
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded hover:bg-gray-300 cursor-pointer"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, checkoutCart } = useCart();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmProductId, setConfirmProductId] = useState(null);
  const [confirmProductName, setConfirmProductName] = useState('');

  const total = cartItems.reduce(
    (acc, item) => acc + (item.product.offerPrice || item.product.price) * item.quantity,
    0
  );

  const askDelete = (productId, productName) => {
    setConfirmProductId(productId);
    setConfirmProductName(productName);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    removeFromCart(confirmProductId);
    toast.success(`${confirmProductName} removed from cart`);
    setConfirmOpen(false);
    setConfirmProductId(null);
    setConfirmProductName('');
  };

  const handleCancelDelete = () => {
    toast.info('Item removal cancelled');
    setConfirmOpen(false);
    setConfirmProductId(null);
    setConfirmProductName('');
  };

  return (
    <>
      <Navbar />
      <ConfirmDeleteModal
        open={confirmOpen}
        productName={confirmProductName}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-100 to-white py-12 px-4 mt-16">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-4xl font-extrabold text-purple-700 mb-8 text-center">
            Your Shopping Cart
          </h2>
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 text-xl py-20">
              <p className="mb-4">Your cart is empty</p>
              <img
                src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-4085814-3371650.png"
                alt="Empty Cart"
                className="mx-auto w-52"
              />
            </div>
          ) : (
            <>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div
                    key={item.product._id}
                    className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-purple-100 shadow hover:shadow-md transition p-4 rounded-xl"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <img
                        src={`${import.meta.env.VITE_APP_BASE_URL}/uploads/${item.product.image}`}
                        alt={item.product.name}
                        className="w-24 h-24 object-cover rounded-lg border"
                      />
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">{item.product.name}</h4>
                        <div className="flex items-center gap-2 mt-1">
                          {item.product.offerPrice ? (
                            <>
                              <p className="text-sm text-gray-400 line-through">₹{item.product.price}</p>
                              <p className="text-lg font-bold text-green-600">₹{item.product.offerPrice}</p>
                            </>
                          ) : (
                            <p className="text-lg font-bold text-purple-600">₹{item.product.price}</p>
                          )}
                        </div>
                        <p className="text-gray-500 mt-1">
                          Subtotal: ₹
                          {(item.product.offerPrice || item.product.price) * item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
                      {/* Quantity controls */}
                      <div className="flex items-center border border-purple-300 rounded-md px-3 py-1">
                        <button
                          className="text-xl text-purple-500 hover:text-purple-700 px-2"
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                          disabled={item.quantity === 1}
                          aria-label="Decrease quantity"
                        >-</button>
                        <span className="px-3 font-medium">{item.quantity}</span>
                        <button
                          className="text-xl text-purple-500 hover:text-purple-700 px-2"
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                      {/* Delete icon */}
                      <button
                        className="text-red-500 hover:text-red-700 text-2xl transition cursor-pointer"
                        title="Remove item"
                        onClick={() => askDelete(item.product._id, item.product.name)}
                        aria-label="Remove from cart"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/* Cart total section */}
              <div className="mt-10 flex flex-col md:flex-row justify-between items-center border-t pt-6">
                <div className="text-2xl font-semibold">
                  Total: <span className="text-purple-700 font-bold">₹{total}</span>
                </div>
                <button
                  onClick={checkoutCart}
                  className="mt-4 md:mt-0 bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 shadow-md transition duration-300 cursor-pointer">
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