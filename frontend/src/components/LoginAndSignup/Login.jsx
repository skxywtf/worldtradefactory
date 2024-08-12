"use client";
import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
      });

      // If login is successful
      localStorage.setItem("clientUsername", username);
      navigate.push("/main/account");
    } catch (err) {
      if (err.response) {
        // Extract and display the specific error message from the backend
        const errorMessage =
          err.response.data.detail || "Error logging in. Please try again.";
        toast.error(errorMessage);
      } else if (err.request) {
        toast.error("No response from server. Please try again.");
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.log(err);
    }
  };

  return (
    <div className="h-full w-full">
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

      <div className="h-full flex justify-center items-center">
        <div className="w-[65%] md:w-1/2 lg:w-1/4">
          <div className="my-10 text-center font-bold text-2xl tracking-widest">
            Login
          </div>
          <div className="flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <label className="tracking-wider">Username</label>
                <input
                  className="p-2 border dark:bg-gray-200 bg-gray-900 rounded"
                  type="text"
                  placeholder="Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="tracking-wider">Password</label>
                <input
                  className="p-2 border dark:bg-gray-200 bg-gray-900 rounded"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <Link href="/main/signup">
                <button className="text-sm hover:text-blue-600">
                  Don't have an account?
                </button>
              </Link>
              <div
                className="p-2 flex justify-center dark:bg-green-400 dark:hover:bg-green-500 bg-blue-700 hover:bg-blue-800 rounded"
                type="submit"
              >
                <button className="h-full w-full">Login</button>
                <Toaster />
              </div>
            </form>
            <div className="w-full flex justify-center mb-32"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
