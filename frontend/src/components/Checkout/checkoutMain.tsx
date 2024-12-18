"use client";

import {Sidepanel} from './sidepanel'
import {AddressPanel} from './addressPanel'
import {PaymentDetails} from './paymentDetails'
import {OrderReview} from './orderReview'
import { CheckoutContext } from '@/app/main/checkout/checkoutContext';
import { useContext } from 'react';

const getStepContent = (step : number) => {
    switch (step){
      case 1:
        return <AddressPanel />;
      case 2:
        return <PaymentDetails />;
      case 3:
        return <OrderReview />;
      default:
        throw Error('unknown step')
    }
  }

export const CheckoutMain = () => {
  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("CheckoutPage must be used within a CheckoutProvider");
  }

  const { activeStep } = context;
  
  return (
    <div className='flex'>
          <Sidepanel />
          {getStepContent(activeStep)}
    </div>
  )
}