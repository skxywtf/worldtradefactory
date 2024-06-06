import React from "react";
import { FiSend } from "react-icons/fi";
const Contact = () => {
  return (
    <div className="h-screen bg-gray-900 w-full">
      <div className=" h-full  flex justify-center items-center">
        <div className=" w-1/2 md:w-1/3">
          <div className="my-10 text-center font-bold text-2xl tracking-widest">
            Contact Us
          </div>
          <div className=" flex flex-col ">
            <form className=" flex flex-col gap-3 ">
              <div className="flex flex-col gap-2">
                <label className=" tracking-wider">Subject </label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="text"
                  placeholder="Subject"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className=" tracking-wider">description</label>
                <input
                  className=" p-2 border bg-gray-900 rounded h-20 whitespace-pre-wrap "
                  type="text"
                  placeholder="text here"
                />
              </div>

              <button
                className="border h-full flex justify-end gap-20 md:gap-40 px-5 p-2 hover:bg-gray-700 rounded"
                type="submit"
              >
                <span>Send</span>
                <div className="h-full p-1 ">
                  <span className="  items-center">
                    <FiSend />
                  </span>
                </div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
