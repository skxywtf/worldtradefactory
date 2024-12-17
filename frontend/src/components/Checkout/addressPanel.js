import { useState } from "react";

export const AddressPanel = () => {

  const [addressDetail, setAddressDetail] = useState({
    firstName: '',
    lastName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
  });

  const [newAddress, setNewAddress] = useState([]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setAddressDetail({ ...addressDetail, [name]: value });
  };

  const handleAddress = () => {
    const newRegistration = {
      ...addressDetail,
      id: new Date().getTime().toString(),
    };
    setNewAddress(newRegistration);
  };

  // console.log(newAddress);

  return (
    <div className='px-28 py-16 w-3/5 text-slate-600'>

    <div className='flex flex-wrap justify-between my-4'>
    <ul>
     <p>First Name*</p>
     <input type="text" name="firstName" onChange={handleInput} value={addressDetail.firstName} className='py-1 px-1 my-1 w-64 rounded-lg border' />
    </ul>
    
    <ul>
     <p>Last Name*</p>
     <input type="text" name="lastName" onChange={handleInput} value={addressDetail.lastName} className='py-1 px-1 my-1 w-64 rounded-lg border' />
    </ul>
    </div>

    <ul className='py-0'>
     <p>Address line 1*</p>
     <input type="text" name="addressLine1" onChange={handleInput} value={addressDetail.addressLine1} className='py-1 px-1 my-1 rounded-lg border w-full' />
    </ul>

    <ul className='py-4'>
     <p>Address line 2</p>
     <input type="text" name="addressLine2" onChange={handleInput} value={addressDetail.addressLine2} className='py-1 px-1 my-1 rounded-lg border w-full'  />
    </ul>

    <div className='flex flex-wrap justify-between'>
    <ul>
     <p>City*</p>
     <input type="text" name="city" onChange={handleInput} value={addressDetail.city} className='py-1 px-1 my-1 w-64 rounded-lg border' />
    </ul>
    
    <ul>
     <p>State*</p>
     <input type="text" name="state" onChange={handleInput} value={addressDetail.state} className='py-1 px-1 my-1 w-64 rounded-lg border' />
    </ul>
    </div>

    <div className='flex flex-wrap justify-between py-4'>
    <ul>
     <p>Zip / Postal Code*</p>
     <input type="text" name="zipCode" onChange={handleInput} value={addressDetail.zipCode} className='py-1 px-1 my-1 w-64 rounded-lg border' />
    </ul>
    
    <ul>
     <p>Country*</p>
     <input type="text" name="country" onChange={handleInput} value={addressDetail.country} className='py-1 px-1 my-1 w-64 rounded-lg border' />
    </ul>
    </div>

    <button type="submit" onClick={handleAddress} className='px-5 py-1 my-6 text-lg font-semibold text-white rounded-lg bg-gradient-to-b from-gray-600 to-black' >Next {'>'} </button>

    </div>
  )
}