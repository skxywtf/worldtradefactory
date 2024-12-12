"use client";
import React, { useState } from "react";
import HeaderLand from "@/components/landing page/header footer landing/HeaderLand";

const Contact1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); 
  };

  return (
    <div className="bg-white text-black w-full dark:bg-black text-white">
      <HeaderLand />

    <div className="flex justify-center items-center py-16 text-black dark:text-white">
      <div className="max-w-5xl w-full px-5 md:px-10">
        <h1 className="text-4xl font-bold text-center mb-6">Contact us</h1>
        <p className="text-center mb-12 text-lg">
          Being in contact is become very easy. Contact us for any business
          inquiry.
        </p>

        <div className="flex gap-10 flex-col md:flex-row items-start justify-between space-y-10 md:space-y-0">
          {/* Address Section */}
          <div className="w-full md:w-1/3 space-y-4">
            <div className="flex items-center text-[#926F34] space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4M9 6l2 2 4-4"
                />
              </svg>
              <h2 className="text-2xl font-bold">Address</h2>
            </div>
            <p className="text-gray-400">
              Phonix Arozina United State Exponential Yield(XY) © Wealth Fund
              Management using an Artificial Intelligence(AI) enabled World
              Trade Factory(WTF)
            </p>
          </div>

          {/* Form Section */}
          <div className="w-full md:w-2/3">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-3 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <input
                  type="text"
                  name="number"
                  placeholder="Contact number"
                  value={formData.number}
                  onChange={handleChange}
                  className="p-3 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  required
                />
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  className="p-3 border border-gray-700 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-lightBlue md:col-span-2"
                  // rows="4"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-[#926F34] text-gray-900 font-semibold rounded hover:bg-yellow-600 transition duration-300"
              >
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact1;
