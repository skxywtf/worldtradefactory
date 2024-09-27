"use client";
import React, { useState } from "react";
// import { IoClose, IoThumbsUp, IoBulb,  } from "react-icons/io5";
// import { FcGoogle } from "react-icons/fc";
// import axios from "axios";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import toast, { Toaster } from "react-hot-toast";
import SignInSide from "./components/SignInSide";

 const Login = () => {
  // const navigate = useRouter();
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const handleSignInWithGoogle = async () => {
  //   try {
  //     const result = await signInWithPopup(auth, googleAuthProvider);
  //     localStorage.setItem("token", result.user.accessToken);
  //     localStorage.setItem("user", JSON.stringify(result.user));
  //     navigate.push("/main");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!username || !password) {
  //     toast.error("Please fill all fields");
  //     return;
  //   }

  //   try {
  //     const res = await axios.post("http://127.0.0.1:8000/api/login/", {
  //       username,
  //       password,
  //     });
  //     console.log(res.data);

  //     // If login is successful
  //     localStorage.setItem("clientUsername", username);
  //     navigate.push("/main/account");
  //   } catch (err) {
  //     if (err.response) {
  //       const errorMessage =
  //         err.response.data.detail || "Error logging in. Please try again.";
  //       toast.error(errorMessage);
  //     } else if (err.request) {
  //       toast.error("No response from server. Please try again.");
  //     } else {
  //       toast.error("An unexpected error occurred.");
  //     }
  //     console.log(err);
  //   }
  // };

  return (
    <SignInSide/>
  )
}

export default Login
