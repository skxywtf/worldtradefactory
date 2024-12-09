import React from "react";

const JoinUs = () => {
  return (
    <div className="text-white py-12 px-6 mt-0 bg-black opacity-95">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-10 mt-0">Want to join us?</h2>
        <p className="mb-6">
          We’re taking complicated stuff and making it super simple. Our teams
          are full of smart and savvy folks working on challenging tasks.
        </p>
        <p className="mb-8">
          And we’re always looking for customer-obsessed people. Think you’re
          customer-focused enough? Write to us at{" "}
          <a href="mailto:future@groww.in" className="text-teal-300 underline">
            SKXYWTF
          </a>
          .
        </p>
        <a
          href="#"
          className="bg-[#36BA98] text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition"
        >
          APPLY NOW
        </a>
      </div>
    </div>
  );
};

export default JoinUs;
