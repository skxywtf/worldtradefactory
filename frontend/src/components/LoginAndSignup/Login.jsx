"use client";
import React, { useState } from "react";
import GoogleButton from "react-google-button";
import { IoClose } from "react-icons/io5";
import { auth, googleAuthProvider } from "../../firebase.js";
import { signInWithPopup } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link.js";
import { useRouter } from "next/navigation";
const Login = () => {
  const navigate = useRouter();

  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log(result);
      localStorage.setItem("token", result.user.accessToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error("Please fill all fields");
      return;
    }
    axios
      .post("http://127.0.0.1:8000/api/login/", { username, password })
      .then(
        (res) => {
          console.log(res);
          // localStorage.setItem("token", res.data.token);
          // localStorage.setItem("user", JSON.stringify(res.data.user));
          localStorage.setItem("clientUsername",username)
          navigate.push("/main/account");
        },
        (err) => {
          console.log(err);
          toast.error("no user found");
        }
      )
      .catch((err) => {
        console.log(err);
        toast.error("no user found");
      });
  };
  return (
    <div className="h-full w-full">
      <div className=" w-full dark:bg-gray-200 bg-gray-950">
        <div className="w-full flex justify-between px-5 py-4  md:py-5 md:px-10 ">
          <div>
            <Link className=" text-2xl" href="/main">
              SKXYWTF
            </Link>
          </div>
          <div className=" rounded  hover:bg-opacity-45 hover:bg-gray-700">
            <Link href="/main">
              <div>
                <IoClose size={30} />
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className=" h-full  flex justify-center items-center">
        <div className=" w-[65%] md:w-1/2 lg:w-1/4">
          <div className="my-10 text-center font-bold text-2xl tracking-widest">
            Login
          </div>
          <div className=" flex flex-col ">
            <form onSubmit={handleSubmit} className=" flex flex-col gap-3 ">
              <div className="flex flex-col gap-2">
                <label className=" tracking-wider">username</label>
                <input
                  className="p-2 border dark:bg-gray-200 bg-gray-900 rounded"
                  type="text"
                  placeholder="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className=" tracking-wider">password</label>
                <input
                  className="p-2 border dark:bg-gray-200 bg-gray-900 rounded"
                  type="password"
                  placeholder="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              <Link href="/main/signup">
                <button className=" text-sm hover:text-blue-600">
                  Don't have an account?
                </button>
              </Link>
              <div
                className=" p-2 flex justify-center dark:bg-green-400 dark:hover:bg-green-500 bg-blue-700 hover:bg-blue-800 rounded"
                type="submit"
              >
                <button className=" h-full w-full">Login</button>
                <Toaster />
              </div>
            </form>
            <div className="text-center my-5 text-xl">OR</div>
            <div className=" w-full flex justify-center mb-32">
              <GoogleButton onClick={handleSignInWithGoogle} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
