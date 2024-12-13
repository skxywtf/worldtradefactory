"use client";
import { useState } from "react";

export default function SubscriptionPage() {
  const [billingCycle, setBillingCycle] = useState(true)

  return (
    <div className="text-center py-8 h-screen">
      <header>
        <p className="text-[3rem] font-bold" >Pricing Plans</p>
        <p className='text-2xl m-4' > Explore the site for free, add a plan to unlock additional features and enhance your trading experience. </p>
      </header>

      <div className="flex wrap justify-center items-center mt-8">
       <div className='border-2 border-gray-600 p-2 w-fit rounded-2xl'>
        <button onClick={() => setBillingCycle(true)} className={`${billingCycle ? 'border-2 border-blue-400' : ''} mx-2 p-2 rounded-xl w-[8rem]`}>Monthly Billing</button>
        <button onClick={() => setBillingCycle(false)} className={`${billingCycle ? '' : 'border-2 border-blue-400'} mx-2 p-2 rounded-xl w-[8rem]`} >Yearly Billing</button>
       </div>
      </div>

      <main className='flex gap-6 my-12 justify-center items-center'>
        <div className='text-left border-2 border-gray-500 w-[18.5rem] py-10 px-4 cursor-pointer hover:border-blue-500'>
          <p className='text-3xl'>Economy Plan</p>
          <p className='text-xl my-2'>Get access to detailed charts and widgets.</p>
          <p className='text-[3rem] font-semibold'>${billingCycle ? '12' : '140'}<span className='text-xl'>/{billingCycle ? 'month' : 'year'}</span> </p>
          <button className='bg-white text-black font-semibold text-xl p-2 mt-2 w-full hover:bg-blue-100' >Subscribe</button>
        </div>
        <div className='text-left border-2 border-gray-500 w-[18.5rem] py-10 px-4 cursor-pointer hover:border-blue-500'>
          <p className='text-3xl'>Premium Plan</p>
          <p className='text-xl my-2'>Get access to chatbot for your stock related quesries.</p>
          <p className='text-[3rem] font-semibold'>${billingCycle ? '20' : '220'}<span className='text-xl'>/{billingCycle ? 'month' : 'year'}</span> </p>
          <button className='bg-white text-black font-semibold text-xl mt-2 p-2 w-full hover:bg-blue-100' >Subscribe</button>
        </div>
        <div className='text-left border-2 border-gray-500 w-[18.5rem] py-10 px-4 cursor-pointer hover:border-blue-500'>
          <p className='text-3xl'>Premium Pro Plan</p>
          <p className='text-xl my-2'>Get access to StockBot and elevate your experience.</p>
          <p className='text-[3rem] font-semibold'>${billingCycle ? '30' : '300'}<span className='text-xl'>/{billingCycle ? 'month' : 'year'}</span> </p>
          <button className='bg-white text-black font-semibold text-xl mt-2 p-2 w-full hover:bg-blue-100' >Subscribe</button>
        </div>
      </main>

    </div>
  );
}
