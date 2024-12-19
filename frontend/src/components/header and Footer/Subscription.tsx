import { CheckoutContext } from "@/app/main/checkout/checkoutContext";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";

const Subscription = () => {
  const router = useRouter()

  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("CheckoutPage must be used within a CheckoutProvider");
  }

  const { billingCycle, setBillingCycle, selectPlan, setSelectPlan } = context;

  const subscriptionData = [
    {
    name: 'Economy Plan',
    description: 'Get access to detailed charts and widgets with this plan.',
    monthlyPrice: '12',
    yearlyPrice: '140'
   },
   {
    name: 'Premium Plan',
    description: 'Get access to chatbot for your stocks related queries.',
    monthlyPrice: '20',
    yearlyPrice: '220'
   },
   {
    name: 'Premium Pro Plan',
    description: 'Get access to StockBot and elevate your exeperience.',
    monthlyPrice: '30',
    yearlyPrice: '300'
   }
  ]

  const handleSubscription = () => {
    router.push("/main/checkout");
  }

  return (
    <div className="text-center py-8">
      <header>
        <p className="text-[3rem] font-bold" >Pricing Plans</p>
        <p className='text-2xl m-4' > Explore the site for free, add a plan to unlock additional features and enhance your trading experience. </p>
      </header>

      <div className="flex flex-wrap justify-center items-center mt-8">
       <div className='border-2 border-gray-600 p-2 w-fit rounded-2xl'>
        <button onClick={() => setBillingCycle(true)} className={`${billingCycle ? 'border-2 border-blue-400 bg-gray-500' : ''} mx-2 p-2 rounded-xl`}>Monthly Billing</button>
        <button onClick={() => setBillingCycle(false)} className={`${billingCycle ? '' : 'border-2 border-blue-400 bg-gray-500'} mx-2 p-2 rounded-xl`} >Yearly Billing</button>
       </div>
      </div>

      <main className='flex flex-wrap gap-6 my-12 justify-center items-center'>
      {
        subscriptionData.map((plan) => 
        <div key={plan.name} className='text-left rounded-xl border-2 border-gray-500 w-[18.5rem] py-10 px-4 cursor-pointer hover:border-blue-500'>
        <p className='text-3xl'> {plan.name} </p>
        <p className='text-xl my-2'> {plan.description} </p>
        <p className='text-[3rem] font-semibold'>${billingCycle ? plan.monthlyPrice : plan.yearlyPrice}<span className='text-xl'>/{billingCycle ? 'month' : 'year'}</span> </p>
        <button className='bg-white border-2 text-black font-semibold text-xl p-2 mt-2 w-full hover:bg-blue-100' onClick={() => {setSelectPlan(plan); handleSubscription() }} >Subscribe</button>
      </div>
        )
      }
      </main>

    </div>
  )
};

export default Subscription;
