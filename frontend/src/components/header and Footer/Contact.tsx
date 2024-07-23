"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { FiSend } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import Footer from "./Footer";
import axios from "axios";
import Link from "next/link";

// Define a type for the form input values
interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  number: string;
  description: string;
}

const Contact: React.FC = () => {
  // Initialize state with default values
  const [formValues, setFormValues] = useState<FormValues>({
    firstName: "",
    lastName: "",
    email: "",
    number: "",
    description: "",
  });

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/contact/", formValues)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-gray-900 w-full flex flex-col justify-between">
      <div className="w-full dark:bg-gray-200 bg-gray-950">
        <div className="w-full flex justify-between px-5 py-4 md:py-5 md:px-10">
          <div>
            <Link className="text-2xl" href="/main">
              SKXYWTF
            </Link>
          </div>
          <div className="rounded hover:bg-opacity-45 hover:bg-gray-700">
            <Link href="/main">
              <div>
                <IoClose size={30} />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex-grow flex justify-center items-center">
        <div className="w-1/2 md:w-1/3">
          <div className="my-10 text-center font-bold text-2xl tracking-widest">
            Contact Us
          </div>
          <div className="flex flex-col pb-32">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="tracking-wider">First Name</label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formValues.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="tracking-wider">Last Name</label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formValues.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="tracking-wider">Email</label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formValues.email}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="tracking-wider">Number</label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="number"
                  name="number"
                  placeholder="Number"
                  value={formValues.number}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="tracking-wider">Description</label>
                <input
                  className="p-2 border bg-gray-900 rounded h-20 whitespace-pre-wrap"
                  type="text"
                  name="description"
                  placeholder="Text here"
                  value={formValues.description}
                  onChange={handleChange}
                />
              </div>
              <button
                className="border h-full flex justify-end gap-20 md:gap-40 px-5 p-2 hover:bg-gray-700 rounded"
                type="submit"
              >
                <span>Send</span>
                <div className="h-full p-1">
                  <span className="items-center">
                    <FiSend />
                  </span>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
