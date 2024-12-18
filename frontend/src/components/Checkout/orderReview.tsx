import { CheckoutContext } from '@/app/main/checkout/checkoutContext';
import React, { useContext } from 'react';

export const OrderReview: React.FC = () => {

  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("CheckoutPage must be used within a CheckoutProvider");
  }

  const { activeStep, setActiveStep } = context;

  const handleNext = () => {
    // setActiveStep(activeStep)
  }

  return (
    <div className="px-16 py-20 w-3/5">

      <main className="flex justify-between px-10">
        <div>
          <ul className="py-4">
            <p className="text-xl font-semibold">Product</p>
            <p className="text-sm text-slate-600 dark:text-white">*Plan Name*</p>
          </ul>

          <ul className="py-4">
            <p className="text-xl font-semibold">Shipping</p>
            <p className="text-xs text-slate-600 dark:text-white">Plus taxes</p>
          </ul>

          <ul className="py-4">
            <p className="text-xl font-semibold">Total</p>
            <p className="text-xs text-slate-600 dark:text-white">All taxes included</p>
          </ul>
        </div>

        <div>
          <p className="text-xl font-semibold py-5">$ 120</p>
          <p className="text-xl font-semibold py-8">$ 9.99</p>
          <p className="text-xl font-semibold py-4">$ 130</p>
        </div>
      </main>

      <p className="border border-gray-300"></p>

      <p className="text-xl font-medium p-4">Shipment Details</p>

      <p className="border border-gray-300"></p>

      <main className="leading-8 p-2 text-slate-600 dark:text-white">
        <p className="text-lg py-1 text-black">Payment Details</p>
        <p>Card type: </p>
        <p>Card holder: </p>
        <p>Card number: </p>
        <p>Expiry date: </p>
      </main>

      <div className="flex justify-between py-6">
        <button className="px-5 py-1 my-6 text-lg font-medium text-slate-600 rounded-lg dark:text-white" onClick={() => setActiveStep(activeStep - 1)}>
          {'<'} Previous
        </button>
        <button
          type="submit" onClick={handleNext}
          className="px-3 py-1 my-6 text-lg font-medium text-white rounded-lg bg-gradient-to-b from-gray-600 to-black"
        >
          Place order {'>'}
        </button>
      </div>
    </div>
  );
};
