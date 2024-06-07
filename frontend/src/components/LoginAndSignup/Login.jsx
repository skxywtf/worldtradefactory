import React from "react";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { IoClose } from "react-icons/io5";
import { auth, googleAuthProvider } from "../../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      console.log(result);
      localStorage.setItem("token", result.user.accessToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-full w-full">
      <div className=" w-full dark:bg-gray-200 bg-gray-950">
        <div className="w-full flex justify-between px-5 py-4  md:py-5 md:px-10 ">
          <div>
            <Link className=" text-2xl" to="/">
              SKXYWTF
            </Link>
          </div>
          <div className=" rounded  hover:bg-opacity-45 hover:bg-gray-700">
            <Link to="/">
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
            <form className=" flex flex-col gap-3 ">
              <div className="flex flex-col gap-2">
                <label className=" tracking-wider">username</label>
                <input
                  className="p-2 border dark:bg-gray-200 bg-gray-900 rounded"
                  type="text"
                  placeholder="username"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className=" tracking-wider">password</label>
                <input
                  className="p-2 border dark:bg-gray-200 bg-gray-900 rounded"
                  type="password"
                  placeholder="password"
                />
              </div>
              <Link to="/signup">
                <button className=" text-sm hover:text-blue-600">
                  Don't have an account?
                </button>
              </Link>

              <button
                className=" p-2  dark:bg-cyan-400 dark:hover:bg-cyan-500 bg-blue-700 hover:bg-blue-800 rounded"
                type="submit"
              >
                Login
              </button>
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
