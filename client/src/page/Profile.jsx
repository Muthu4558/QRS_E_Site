import React from "react";
import Navbar from "../components/Navbar";
import { FaUserCircle, FaBoxOpen, FaMapMarkerAlt, FaEdit } from "react-icons/fa";

const Profile = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 py-10 px-4 mt-15">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 text-purple-700">My Profile</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Account Info */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex items-center mb-4">
                <FaUserCircle className="text-4xl text-purple-600 mr-3" />
                <h2 className="text-xl font-semibold">Account Info</h2>
              </div>
              <p className="text-gray-700">Name: <strong>Muthu</strong></p>
              <p className="text-gray-700">Email: <strong>muthu@example.com</strong></p>
              <p className="text-gray-700">Phone: <strong>+91 98765 43210</strong></p>
              <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2">
                <FaEdit /> Edit Profile
              </button>
            </div>

            {/* My Orders */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex items-center mb-4">
                <FaBoxOpen className="text-3xl text-purple-600 mr-3" />
                <h2 className="text-xl font-semibold">My Orders</h2>
              </div>
              <p className="text-gray-700">Total Orders: <strong>15</strong></p>
              <p className="text-gray-700">Last Order: <strong>July 15, 2025</strong></p>
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
              <p className="text-gray-700">No. 10, East Street, Kandiramanickkam</p>
              <p className="text-gray-700">Thiruvarur, Tamil Nadu - 610101</p>
              <button className="mt-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md">
                Manage Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;