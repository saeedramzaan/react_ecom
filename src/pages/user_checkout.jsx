/* MIT License

Copyright (c) 2018 Sivadass Navaneethan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE. */



import React, { useContext, useEffect } from "react";
import axios from 'axios'; 
import { useHistory } from "react-router-dom";
import classNames from "classnames";


import {
  CheckoutStateContext,
  CheckoutDispatchContext,
  CHECKOUT_STEPS,
  setCheckoutStep,
  saveShippingAddress
} from "contexts/checkout";
import { CartStateContext } from "contexts/cart";
import { AuthStateContext, AuthDispatchContext, signOut } from "contexts/auth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import _get from "lodash.get";
import Input from "components/core/form-controls/Input";
import { phoneRegExp } from "constants/common";


const AddressSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(phoneRegExp, "Phone Number is not a valid 10 digit number")
    .min(10, "Phone Number is too short")
    .max(10, "Phone Number is too long"),
  addressLine: Yup.string().required("Door No. & Street is required!"),
  city: Yup.string().required("City is required!"),
  state: Yup.string().required("State is required!"),
  code: Yup.string().required("ZIP/Postal code is required!"),
  country: Yup.string().required("Country is required!")
});

const LoginStep = () => {
  const history = useHistory();
  const { user, isLoggedIn } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const handleContinueShopping = () => {
    history.push("/");
  };

  const { items = [] } = useContext(CartStateContext);
  const username = localStorage.getItem('username')
  const saveCart = () => {

    
   
     const cartTotal = items.map((item) => item.price * item.quantity)
     .reduce((prev, current) => prev + current, 0);

     const userid = localStorage.getItem('userid');

    //   useEffect(() => {
        axios.post("http://localhost:8000/api/test",{ items, userid, username, cartTotal }).then((data) => {
       
        console.log(data.data);
         // setPost(data?.data);
      //   alert('test');
        });
      
     // }, []);
  };



  const handleLoginAsDiffUser = () => {
    signOut(authDispatch);
    history.push("/auth");
  };
  const handleGotoLogin = () => {
    history.push("/auth");
  };
  const handleProceed = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);

  //  alert('test');
  };
  const username1 = localStorage.getItem('username');

  // if(username1==null){
  //     console.log('username null')
  // }else{

  return (
    <div className="detail-container">
      <h2>Check Out Now! </h2>
      <div className="auth-message">
        {isLoggedIn ? (
          <>
            <p>
              {/* Logged in as <span>{user.username}</span> */}
            </p>
            {/* <button onClick={() => handleLoginAsDiffUser()}>
              Login as Different User
            </button> */}
          </>
        ) : (
          <>
            {/* <p>Please login to continue.</p>
            <button onClick={() => handleGotoLogin()}>Login</button> */}
          </>
        )}
      </div>
      <div className="actions">
        <button className="outline" onClick={() => handleContinueShopping()}>
          <i className="rsc-icon-arrow_back" /> Continue Shopping
        </button>

        <button className="outline" onClick={() => saveCart()}>
          <i className="rsc-icon-arrow_back" /> Submit
        </button>

        <button disabled={!isLoggedIn} onClick={() => handleProceed()}>
          Proceed
          <i className="rsc-icon-arrow_forward" />
        </button>
      </div>
    </div>
  );

        // }
};

// const AddressStep = () => {
//   const checkoutDispatch = useContext(CheckoutDispatchContext);

//   const handleBackToLogin = () => {
//     setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.AUTH);
//   };
//   const handleSaveAddress = (addressData) => {
//     saveShippingAddress(checkoutDispatch, addressData);
//   };
//   return (
//     <div className="detail-container">
//       <h2>Shipping Address</h2>
//       <Formik
//         initialValues={{
//           fullName: "John Doe",
//           phoneNumber: "5552229876",
//           addressLine: "L1, Palm Residency",
//           city: "Kingston",
//           state: "New York",
//           code: "12401",
//           country: "United States"
//         }}
//         validationSchema={AddressSchema}
//         onSubmit={async (values, { resetForm }) => {
//           try {
//             const addressData = { ...values };
//             resetForm();
//             handleSaveAddress(addressData);
//           } catch (err) {
//             console.error(err);
//           }
//         }}
//       >
//         {() => (
//           <Form>
//             <div className="field-group">
//               <Field
//                 name="fullName"
//                 type="text"
//                 placeholder="Full Name"
//                 component={Input}
//               />
//               <Field
//                 name="phoneNumber"
//                 type="text"
//                 placeholder="Phone Number"
//                 component={Input}
//               />
//             </div>
//             <Field
//               name="addressLine"
//               type="text"
//               placeholder="Door No. & Street"
//               component={Input}
//             />
//             <div className="field-group">
//               <Field
//                 name="city"
//                 type="text"
//                 placeholder="City"
//                 component={Input}
//               />
//               <Field
//                 name="state"
//                 type="text"
//                 placeholder="State"
//                 component={Input}
//               />
//             </div>
//             <div className="field-group">
//               <Field
//                 name="code"
//                 type="text"
//                 placeholder="ZIP/Postal Code"
//                 component={Input}
//               />
//               <Field
//                 name="country"
//                 type="text"
//                 placeholder="Country"
//                 component={Input}
//               />
//             </div>
//             <div className="actions">
//               <button
//                 type="button"
//                 className="outline"
//                 onClick={() => handleBackToLogin()}
//               >
//                 <i className="rsc-icon-arrow_back" /> Login in as Different User
//               </button>
//               <button type="submit">
//                 Save Address
//                 <i className="rsc-icon-arrow_forward" />
//               </button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };



const Checkout = () => {
  const { items = [] } = useContext(CartStateContext);
  const { isLoggedIn } = useContext(AuthStateContext);
  const { step, shippingAddress } = useContext(CheckoutStateContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);

  const totalItems = items.length;

  const cartTotal = items.map((item) => item.price * item.quantity)
                            .reduce((prev, current) => prev + current, 0);

  console.log("Total"+cartTotal);

  const handleClickTimeline = (nextStep) => {
    setCheckoutStep(checkoutDispatch, nextStep);
  };



 

  return (

    <div className="checkout-page">
      <div className="container">

        <div className="order-details">
        
          {step === CHECKOUT_STEPS.AUTH && <LoginStep />}
        
        </div>
        
        <div className="order-summary">
          <h2>
            Summary
            <span>{` (${totalItems}) Items`}</span>
          </h2>
         

          <ul className="total-breakup">

          
            <li>
              <p>Subtotal</p>
              <p>{cartTotal}</p>
            </li>
            <li>
              <p>Tax</p>
              <p>5000</p>
            </li>
            <li>
              <p>Shipping</p>
              <p>5000</p>
            </li>
            <li>
              <h2>Total</h2>
              <h2>5000</h2>
            </li>
          </ul>
        </div>
      </div>
    </div>



  );
};

export default Checkout;
