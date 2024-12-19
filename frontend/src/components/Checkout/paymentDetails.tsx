import { CheckoutContext } from '@/app/main/checkout/checkoutContext';
import React, { useContext, useState } from 'react';

export const PaymentDetails: React.FC = () => {
  const [selectType, setSelectType] = useState<boolean>(true);
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("CheckoutPage must be used within a CheckoutProvider");
  }

  const { activeStep, setActiveStep } = context;

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  return (
    <div className="px-28 py-16 w-3/5 dark:text-white">
      <div className="flex gap-6 justify-between">
        <button
          className={`border-2 w-full text-left p-3 px-4 rounded-lg font-medium ${
            selectType ? 'border-blue-300' : ''
          } hover:text-blue-600 hover:shadow-md`}
          onClick={() => setSelectType(true)}
        >
          Card
        </button>

        <button
          className={`border-2 w-full text-left p-3 px-4 rounded-lg font-medium hover:text-blue-600 hover:shadow-md hover:border-blue-200 ${
            selectType ? '' : 'border-blue-300'
          }`}
          onClick={() => setSelectType(false)}
        >
          Bank account
        </button>
      </div>

      {selectType ? (
        <div className="border my-12 p-4 rounded-lg">
          <p>*Credit Card Icon*</p>

          <div className="flex flex-wrap justify-between text-slate-600 py-6 dark:text-white">
            <ul className="w-3/6">
              <p>Card Number*</p>
              <input
                type="text"
                name="cardNumber"
                className="py-1 px-2 my-2 w-full rounded-lg border"
              />
            </ul>

            <ul className="w-2/5">
              <p>CVV*</p>
              <input
                type="text"
                name="cvv"
                className="py-1 px-1 my-2 w-full rounded-lg border"
              />
            </ul>
          </div>

          <div className="flex flex-wrap justify-between text-slate-600 py-2 dark:text-white">
            <ul>
              <p>Name*</p>
              <input
                type="text"
                name="cardHolder"
                className="py-1 px-1 my-2 w-64 rounded-lg border"
              />
            </ul>

            <ul>
              <p>Expiration date*</p>
              <input
                type="text"
                name="expiryDate"
                className="py-1 px-1 my-2 w-64 rounded-lg border"
              />
            </ul>
          </div>
        </div>
      ) : (
        <div className="my-12 p-4 rounded-lg leading-10">
          <p className="border border-orange-300 bg-orange-100 text-black rounded-xl px-4 py-1">
            ⚠️ Your order will be processed once we receive the funds.
          </p>
          <p className="text-xl font-medium py-4">Bank account</p>
          <p>Please transfer the payment to the bank account details shown below.</p>
          <p>
            <span className="text-slate-600">Bank:</span> Indian Overseas Bank
          </p>
          <p>
            <span className="text-slate-600">Account number:</span> 123456788012
          </p>
          <p>
            <span className="text-slate-600">Routing number:</span> 1234567
          </p>
        </div>
      )}

      <div className="flex justify-between items-center py-6">
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