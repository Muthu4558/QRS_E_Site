// Admin.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdAddPhotoAlternate, MdDelete, MdEdit } from 'react-icons/md';
import { FaPlus, FaCheckCircle, FaTimesCircle, FaSignOutAlt } from 'react-icons/fa'; // ✅ Added logout icon
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/Navbar';

const Admin = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        price: '',
        offerPrice: '',
        description: '',
        stock: '',
        brand: '',
        category: 'Electronics',
        image: null,
        featured: false,
    });

    const [preview, setPreview] = useState(null);
    const [products, setProducts] = useState([]);
    const [editingProductId, setEditingProductId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);

    // ✅ Fetch products on load
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/products');
            setProducts(res.data);
        } catch (err) {
            toast.error('❌ Failed to load products');
        }
    };

    const handleChange = (e) => {
        const { name, value, files, type, checked } = e.target;
        if (name === 'image') {
            const file = files[0];
            setFormData(prev => ({ ...prev, image: file }));
            setPreview(URL.createObjectURL(file));
        } else if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'featured') {
                data.append(key, value ? 'true' : 'false');
            } else {
                data.append(key, value);
            }
        });

        try {
            if (editingProductId) {
                await axios.put(`http://localhost:5000/api/products/update/${editingProductId}`, data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                toast.success('✅ Product updated successfully');
            } else {
                await axios.post('http://localhost:5000/api/products/add', data, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
                toast.success('🎉 Product added successfully');
            }
            resetForm();
            fetchProducts();
        } catch (err) {
            toast.error('❌ Failed to submit');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            price: '',
            offerPrice: '',
            category: 'Electronics',
            image: null,
            featured: false,
        });
        setPreview(null);
        setEditingProductId(null);
        setShowModal(false);
    };

    const handleEdit = (product) => {
        setFormData({
            name: product.name,
            price: product.price,
            offerPrice: product.offerPrice,
            category: product.category,
            image: product.image,
            featured: product.featured,
        });
        setEditingProductId(product._id);
        setPreview(`http://localhost:5000/uploads/${product.image}`);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        setProductToDelete(id);
    };

    const confirmDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/products/delete/${productToDelete}`);
            toast.success('🗑️ Product deleted');
            fetchProducts();
        } catch (err) {
            toast.error('❌ Delete failed');
        } finally {
            setProductToDelete(null);
        }
    };

    const handleLogout = async () => {
        try {
            await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });

            // JWT from localStorage
            localStorage.removeItem("token");

            toast.success("Logged out");

            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } catch (err) {
            toast.error("Logout failed");
        }
    };


    return (
        <>
            <Navbar />
            <ToastContainer />
            <div className="mt-18 min-h-screen bg-gradient-to-tr from-violet-200 via-fuchsia-200 to-indigo-100 flex flex-col items-center justify-start p-6 gap-10">
                {/* Logout */}
                <div className="w-full max-w-6xl flex justify-end">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-white bg-red-500 px-4 py-2 rounded-xl font-semibold hover:bg-red-600 transition"
                    >
                        <FaSignOutAlt /> Logout
                    </button>
                </div>

                {/* Product Inventory */}
                <div className="w-full max-w-6xl bg-white shadow-[0_10px_25px_rgba(0,0,0,0.1)] rounded-3xl p-8 border border-purple-200">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-purple-700">Product Inventory</h2>
                        <button
                            onClick={() => setShowModal(true)}
                            className="flex gap-3 items-center bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700 transition"
                        >
                            <span>Add Product</span>
                            <span><FaPlus /></span>
                        </button>
                    </div>

                    <div className="overflow-x-auto rounded-2xl shadow-md border border-purple-300">
                        <table className="min-w-full text-sm text-left text-gray-700 bg-white">
                            <thead className="bg-gradient-to-r from-purple-100 via-fuchsia-100 to-purple-200 sticky top-0 z-10 shadow">
                                <tr>
                                    <th className="px-6 py-4 font-semibold border-b border-purple-200">Image</th>
                                    <th className="px-6 py-4 font-semibold border-b border-purple-200">Name</th>
                                    <th className="px-6 py-4 font-semibold border-b border-purple-200">Price</th>
                                    <th className="px-6 py-4 font-semibold border-b border-purple-200">Offer</th>
                                    <th className="px-6 py-4 font-semibold border-b border-purple-200">Category</th>
                                    <th className="px-6 py-4 font-semibold border-b border-purple-200">Stock</th>
                                    <th className="px-6 py-4 font-semibold border-b border-purple-200">Brand</th>
                                    <th className="px-6 py-4 font-semibold border-b border-purple-200">Description</th>
                                    <th className="px-6 py-4 font-semibold border-b border-purple-200 text-center">Featured</th>
                                    <th className="px-6 py-4 font-semibold border-b border-purple-200 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id} className="hover:bg-purple-50 transition border-b border-purple-100">
                                        <td className="px-6 py-3 text-center">
                                            <img
                                                src={`http://localhost:5000/uploads/${product.image}`}
                                                alt={product.name}
                                                className="w-14 h-14 object-cover rounded-md mx-auto shadow"
                                            />
                                        </td>
                                        <td className="px-6 py-3">{product.name}</td>
                                        <td className="px-6 py-3">₹{product.price}</td>
                                        <td className="px-6 py-3">{product.offerPrice ? `₹${product.offerPrice}` : '-'}</td>
                                        <td className="px-6 py-3">{product.category}</td>
                                        <td className="px-6 py-3">{product.stock ?? "-"}</td>
                                        <td className="px-6 py-3">{product.brand ?? "-"}</td>
                                        <td className="px-6 py-3">{product.description}</td>
                                        <td className="px-6 py-3 text-center">
                                            {product.featured ? (
                                                <FaCheckCircle className="text-green-500 text-xl mx-auto" />
                                            ) : (
                                                <FaTimesCircle className="text-red-500 text-xl mx-auto" />
                                            )}
                                        </td>
                                        <td className="px-6 py-3 flex justify-center items-center gap-3 text-lg">
                                            <button onClick={() => handleEdit(product)} className="text-yellow-500 hover:text-yellow-600">
                                                <MdEdit />
                                            </button>
                                            <button onClick={() => handleDelete(product._id)} className="text-red-500 hover:text-red-600">
                                                <MdDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Product Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
                        <div className="bg-white rounded-3xl shadow-lg w-full max-w-2xl max-h-screen overflow-y-auto p-6 sm:p-10 relative">
                            <button
                                onClick={resetForm}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
                            >
                                ×
                            </button>

                            <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-600 animate-pulse">
                                {editingProductId ? 'Update Product' : 'Add New Product'}
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Product Name"
                                    required
                                    className="w-full px-4 py-3 border border-purple-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 transition"
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        name="price"
                                        type="number"
                                        value={formData.price}
                                        onChange={handleChange}
                                        placeholder="Price"
                                        required
                                        className="w-full px-4 py-3 border border-purple-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 transition"
                                    />
                                    <input
                                        name="offerPrice"
                                        type="number"
                                        value={formData.offerPrice}
                                        onChange={handleChange}
                                        placeholder="Offer Price"
                                        className="w-full px-4 py-3 border border-purple-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 transition"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        name="stock"
                                        type="number"
                                        min="0"
                                        value={formData.stock}
                                        onChange={handleChange}
                                        placeholder="Stock"
                                        className="w-full px-4 py-3 border border-purple-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 transition"
                                    />
                                    <input
                                        name="brand"
                                        type="text"
                                        value={formData.brand}
                                        onChange={handleChange}
                                        placeholder="Brand"
                                        className="w-full px-4 py-3 border border-purple-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 transition"
                                    />
                                </div>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-purple-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 transition"
                                >
                                    <option>Electronics</option>
                                    <option>Clothing</option>
                                    <option>Accessories</option>
                                </select>

                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Description"
                                    className="w-full px-4 py-3 border border-purple-300 rounded-xl shadow-sm focus:ring-2 focus:ring-purple-400 transition"
                                />

                                <div className="flex items-center gap-3">
                                    <input
                                        type="checkbox"
                                        name="featured"
                                        checked={formData.featured}
                                        onChange={handleChange}
                                        className="w-4 h-4 text-purple-600"
                                    />
                                    <label className="text-sm text-gray-700">Show on Home Page</label>
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="flex items-center justify-center w-32 h-32 bg-purple-50 hover:bg-purple-100 text-purple-600 border border-dashed border-purple-300 rounded-2xl cursor-pointer transition">
                                        <MdAddPhotoAlternate size={34} />
                                        <input
                                            type="file"
                                            name="image"
                                            accept="image/*"
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                    </label>
                                    {preview && (
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="w-32 h-32 object-cover rounded-2xl border border-purple-300 shadow"
                                        />
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-3 rounded-2xl font-bold shadow-md hover:scale-[1.03] transition-transform"
                                >
                                    {editingProductId ? 'Update Product' : 'Add Product'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}


                {/* Delete Confirmation Modal */}
                {productToDelete && (
                    <div className="fixed inset-0 bg-opacity-40 backdrop-blur-sm flex justify-center items-center z-50">
                        <div className="bg-white rounded-3xl p-8 shadow-lg w-full max-w-md text-center relative">
                            <h3 className="text-xl font-semibold text-gray-800 mb-6">Are you sure you want to delete this product?</h3>
                            <div className="flex justify-center gap-6">
                                <button onClick={confirmDelete} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-xl transition">
                                    Yes, Delete
                                </button>
                                <button onClick={() => setProductToDelete(null)} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-6 rounded-xl transition">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Admin;