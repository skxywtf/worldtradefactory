import React from "react";
import { Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import { IoClose } from "react-icons/io5";
import { auth, googleAuthProvider } from "../../firebase.js";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Signup = () => {
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
    <div className="h-full bg-gray-900 w-full pb-20">
      <Link to="/">
        <div className=" fixed top-0 right-0 m-10">
          <IoClose size={30} />
        </div>
      </Link>
      <div className=" h-full flex justify-center items-center">
        <div className="">
          <div className="my-10 text-center font-bold text-2xl tracking-widest">
            Sign up
          </div>
          <div className=" flex flex-col ">
            <form className=" flex flex-col gap-3 ">
              <div className="flex flex-col gap-2">
                <label className=" tracking-wider">username</label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="text"
                  placeholder="username"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className=" tracking-wider">email</label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="text"
                  placeholder="email"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className=" tracking-wider">password</label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="text"
                  placeholder="password"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className=" tracking-wider">confirm password</label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="text"
                  placeholder="confirm password"
                />
              </div>
              <Link to="/login">
                <button className=" text-sm hover:text-blue-600">
                  Already have an account?
                </button>
              </Link>

              <button
                className="border p-2 hover:bg-gray-700 rounded"
                type="submit"
              >
                Create Account
              </button>
            </form>
            <div className="text-center my-5 text-xl">OR</div>
            <div>
              <GoogleButton onClick={handleSignInWithGoogle} />
              <div className="flex">
                <div className="p-1"></div>
                <div className="p-1"></div>
                <div className="p-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
