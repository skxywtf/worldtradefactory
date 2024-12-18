import { CheckoutContext } from "@/app/main/checkout/checkoutContext";
import React, { useContext, useState } from "react";

interface AddressDetail {
  firstName: string;
  lastName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface Address {
  id: string;
  address: AddressDetail;
}

export const AddressPanel: React.FC = () => {

  const context = useContext(CheckoutContext);

  if (!context) {
    throw new Error("CheckoutPage must be used within a CheckoutProvider");
  }

  const { activeStep, setActiveStep } = context;
  
  const [addressDetail, setAddressDetail] = useState<AddressDetail>({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [newAddress, setNewAddress] = useState<Address[]>([]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddressDetail((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddress = () => {
    const newRegistration: Address = {
      id: new Date().getTime().toString(),
      address: { ...addressDetail },
    };

    setNewAddress((prevAddresses) => [...prevAddresses, newRegistration]);

    setActiveStep(activeStep + 1)

    // setAddressDetail({
    //   firstName: '',
    //   lastName: '',
    //   addressLine1: '',
    //   addressLine2: '',
    //   city: '',
    //   state: '',
    //   zipCode: '',
    //   country: '',
    // });
  };

  return (
    <div className='px-28 py-16 w-3/5 text-slate-600 dark:text-white'>
      <div className='flex flex-wrap justify-between my-4'>
        <ul>
          <p>First Name*</p>
          <input
            type="text"
            name="firstName"
            onChange={handleInput}
            value={addressDetail.firstName}
            className='py-1 px-1 my-1 w-64 rounded-lg border'
          />
        </ul>

        <ul>
          <p>Last Name*</p>
          <input
            type="text"
            name="lastName"
            onChange={handleInput}
            value={addressDetail.lastName}
            className='py-1 px-1 my-1 w-64 rounded-lg border'
          />
        </ul>
      </div>

      <ul className='py-0'>
        <p>Address line 1*</p>
        <input
          type="text"
          name="addressLine1"
          onChange={handleInput}
          value={addressDetail.addressLine1}
          className='py-1 px-1 my-1 rounded-lg border w-full'
        />
      </ul>

      <ul className='py-4'>
        <p>Address line 2</p>
        <input
          type="text"
          name="addressLine2"
          onChange={handleInput}
          value={addressDetail.addressLine2}
          className='py-1 px-1 my-1 rounded-lg border w-full'
        />
      </ul>

      <div className='flex flex-wrap justify-between'>
        <ul>
          <p>City*</p>
          <input
            type="text"
            name="city"
            onChange={handleInput}
            value={addressDetail.city}
            className='py-1 px-1 my-1 w-64 rounded-lg border'
          />
        </ul>

        <ul>
          <p>State*</p>
          <input
            type="text"
            name="state"
            onChange={handleInput}
            value={addressDetail.state}
            className='py-1 px-1 my-1 w-64 rounded-lg border'
          />
        </ul>
      </div>

      <div className='flex flex-wrap justify-between py-4'>
        <ul>
          <p>Zip / Postal Code*</p>
          <input
            type="text"
            name="zipCode"
            onChange={handleInput}
            value={addressDetail.zipCode}
            className='py-1 px-1 my-1 w-64 rounded-lg border'
          />
        </ul>

        <ul>
          <p>Country*</p>
          <input
            type="text"
            name="country"
            onChange={handleInput}
            value={addressDetail.country}
            className='py-1 px-1 my-1 w-64 rounded-lg border'
          />
        </ul>
      </div>

      <div className='flex justify-between p-2'>
        <button></button>
        <button type="button" onClick={handleAddress}
          className='px-5 py-1 my-6 text-lg font-semibold text-white rounded-lg bg-gradient-to-b from-gray-600 to-black' >
          Next {'>'} </button>
      </div>
    </div>
  );
};
