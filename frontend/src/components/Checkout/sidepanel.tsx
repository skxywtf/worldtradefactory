import React, { useContext } from "react";
import { CheckoutContext } from "@/app/main/checkout/checkoutContext";

export const Sidepanel: React.FC = () => {

  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("CheckoutPage must be used within a CheckoutProvider");
  }

  const { name, setName } = context;

  console.log(name);

  return (
    <div className="w-2/6 px-16 py-20 border-r text-xl leading-10 bg-slate-100 dark:text-white dark:bg-gradient-to-br from-gray-600 to-black">
      <h2>Total</h2>
      <h1>$134.98</h1>
    
      {/* <button onClick={() => setName('ksdjb')}>Click</button> */}

      <h3>Professional plan - $15.00</h3>
      <p>Monthly subscription</p>

      <h3>Dedicated support - Free</h3>
      <p>Included in the professional plan</p>

      <h3>Hardware - $69.99</h3>
      <p>Devices needed for development</p>

      <h3>Landing page template - $49.99</h3>
      <p>License</p>
    </div>
  );
};