import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaUserCircle,
  FaBoxOpen,
  FaMapMarkerAlt,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: "", number: "", email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", number: "", email: "" });

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        withCredentials: true,
      });
      setProfile(res.data);
      setFormData(res.data);
    } catch (err) {
      console.error(err);
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, {
        withCredentials: true,
      });
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put("http://localhost:5000/api/auth/profile", formData, {
        withCredentials: true,
      });
      setProfile(res.data);
      setIsModalOpen(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Profile update failed", err);
      toast.error("Profile update failed!");
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 py-10 px-4 mt-15">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">
            My Profile
          </h1>
          <div className="text-right mb-6">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Account Info */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex items-center mb-4">
                <FaUserCircle className="text-4xl text-purple-600 mr-3" />
                <h2 className="text-xl font-semibold">Account Info</h2>
              </div>
              <p className="text-gray-700">
                Name: <strong>{profile.name}</strong>
              </p>
              <p className="text-gray-700">
                Phone Number: <strong>{profile.number}</strong>
              </p>
              <p className="text-gray-700">
                Email: <strong>{profile.email}</strong>
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <FaEdit /> Edit Profile
              </button>
            </div>

            {/* My Orders */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex items-center mb-4">
                <FaBoxOpen className="text-3xl text-purple-600 mr-3" />
                <h2 className="text-xl font-semibold">My Orders</h2>
              </div>
              <p className="text-gray-700">
                Total Orders: <strong>15</strong>
              </p>
              <p className="text-gray-700">
                Last Order: <strong>July 15, 2025</strong>
              </p>
              <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                View Orders
              </button>
            </div>

            {/* Address */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex items-center mb-4">
                <FaMapMarkerAlt className="text-3xl text-purple-600 mr-3" />
                <h2 className="text-xl font-semibold">Address</h2>
              </div>
              <p className="text-gray-700">
                No. 10, East Street, Kandiramanickkam
              </p>
              <p className="text-gray-700">
                Thiruvarur, Tamil Nadu - 610101
              </p>
              <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                Manage Address
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              <FaTimes />
            </button>
            <h2 className="text-xl font-bold mb-4 text-purple-700">Edit Profile</h2>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 mb-3 rounded"
              placeholder="Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 mb-3 rounded"
              placeholder="Email"
            />
            <input
              type="number"
              name="number"
              value={formData.number}
              onChange={handleInputChange}
              className="w-full border px-3 py-2 mb-3 rounded"
              placeholder="Phone Number"
            />
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaSave /> Save Changes
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;