import React, { useContext } from "react";
import { CheckoutContext } from "@/app/main/checkout/checkoutContext";

export const Sidepanel: React.FC = () => {

  const context = useContext(CheckoutContext);
  
    if (!context) {
      throw new Error("CheckoutPage must be used within a CheckoutProvider");
    }

  return (
    <div className="w-2/6 px-10 py-20 border-r bg-slate-100 dark:text-white dark:bg-gradient-to-br from-gray-600 to-black">
    
      <p className="text-sm text-slate-500">Total</p>
      <p className="text-2xl">$134.98</p>

    <div className="flex justify-around">
      <div>
      <p className="text-lg mt-6">Premium Pro Plan</p>
      <p className="text-sm">Monthly subscription</p>

      <p className="text-lg mt-6">Dedicated support</p>
      <p className="text-sm">Included in the professional plan</p>

      <p className="text-lg mt-6">Landing page template</p>
      <p className="text-sm">License</p>
      </div>

      <div className="py-8">
        <p >$15.00</p>
        <p className="py-12">Free</p>
        <p>$49.99</p>
      </div>
    </div>

    </div>
  );
};