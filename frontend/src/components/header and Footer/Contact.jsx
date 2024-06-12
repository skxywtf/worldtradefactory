import React, { useState } from "react";
import { FiSend } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";
import Footer from "../header and Footer/Footer";
import axios from "axios";

const Contact = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/contact/", {
        firstName,
        lastName,
        email,
        number,
        description,
      })
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
            <Link className="text-2xl" to="/">
              SKXYWTF
            </Link>
          </div>
          <div className="rounded hover:bg-opacity-45 hover:bg-gray-700">
            <Link to="/">
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
            <form onClick={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="tracking-wider">firstName</label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="text"
                  placeholder="firstName"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="tracking-wider">lastName</label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="text"
                  placeholder="lastName"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="tracking-wider">Email</label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="tracking-wider">Number</label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="number"
                  placeholder="Number"
                  onChange={(e) => {
                    setNumber(e.target.value);
                  }}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="tracking-wider">Description</label>
                <input
                  className="p-2 border bg-gray-900 rounded h-20 whitespace-pre-wrap"
                  type="text"
                  placeholder="Text here"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
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
