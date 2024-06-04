import React from "react";

const Contact = () => {
  return (
    <div className="h-screen bg-gray-900 w-full">
      <div className=" h-full  flex justify-center items-center">
        <div className="">
          <div className="my-10 text-center font-bold text-2xl tracking-widest">
            Sign up
          </div>
          <div className=" flex flex-col ">
            <form className=" flex flex-col gap-3 ">
              <div className="flex flex-col gap-2">
                <label className=" tracking-wider">Subject</label>
                <input
                  className="p-2 border bg-gray-900 rounded"
                  type="text"
                  placeholder="Subject"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className=" tracking-wider">description</label>
                <input
                  className="p-2 border bg-gray-900 rounded h-[40%] "
                  type="text"
                  placeholder="text here"
                />
              </div>

              <button
                className="border p-2 hover:bg-gray-700 rounded"
                type="submit"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
