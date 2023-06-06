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

import React, { useContext,useState } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import { AuthDispatchContext, signIn } from "contexts/auth";
import Input from "components/core/form-controls/Input";
import axios from "axios";



const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
  email: Yup.string().required("Enter Email"), 
  username: Yup.string().required("Mobile Number or Email Address is required!")
});

//const nameError = "";



const AuthPage = () => {
  const authDispatch = useContext(AuthDispatchContext);
  const history = useHistory();
  const location = useLocation();
  const fromUrl = _get(location, "state.from.checkout");
  console.log("location => ", location);
  console.log(history);



  const goToForgotPassword = (e) => {
    e.preventDefault();
  };

  const goToRegister = (e) => {
    e.preventDefault();
  };

  const signInSuccess = (userData) => {
    signIn(authDispatch, userData);
    if (fromUrl) {
      history.push(fromUrl);
    } else {
      history.push("/");
    }
  };
     const [nameError, setnameError] = useState("")
     const [emailError, setemailError] = useState("")
     const [passwordError,setpasswordError] = useState("")

   var test = "";

   var myData = function(data) {
   
    return data;
  }

  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    // Handle validations
    axios.post("http://localhost:8000/api/regUser", { username, password, email })
      .then(response => {

        console.log(response.data)
    
      // return response.data;

       if (response.data == "success") {
      //    // history.push(fromUrl);
            window.location.replace('http://localhost:3000/checkout');
           // localStorage.setItem('dataKey', JSON.stringify(response.data));
            localStorage.setItem('username',username)
            
        } else {
      //   history.push("/");
        }
        // Handle response
      })
      .catch(function (error) {
      
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
    
         
          setnameError(error.response.data.errors.username);
          setemailError(error.response.data.errors.email);
          setpasswordError(error.response.data.errors.password);

          console.log(error.response.data);
          console.log(error.response.status);

       
           console.log(error.response.data.message);

          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
       // console.log(test);
      });
     
  }
 
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")


  return (

    <Formik
      // initialValues={{
      //   username: "",
      //   email:"",
      //   password: ""
      // }}
      // validationSchema={LoginSchema}
      // onSubmit={async (values, { resetForm }) => {
      //   try {
      //     const userData = { ...values };
      //     resetForm();
      //     signInSuccess(userData);
      //   } catch (err) {
      //     console.error(err);
      //   }
      // }}
    >
      {() => (
        <Form>
            <Field
            name="username"
            type="text"
            placeholder="User Name"
            component={Input}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
            <div style={{display:"block",position:'relative',bottom: '12px' }} className="invalid-feedback">{ nameError }</div>
          <Field
            name="email"
            type="text"
            placeholder="Mobile Number or Email Address"
            component={Input}
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div style={{display:"block",position:'relative',bottom: '12px' }} className="invalid-feedback">{ emailError }</div>
          <Field
            name="password"
            type="password"
            placeholder="Password"
            component={Input}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
<div style={{display:"block",position:'relative',bottom: '12px' }} className="invalid-feedback">{ passwordError }</div>
          <p>
            <a href="/#" onClick={goToForgotPassword}>
              Forgot Password?
            </a>
          </p>
          <button className="auth-button block" onClick={handleSubmit}>
            Login
          </button>

          <p>
            New here?{" "}
            <a href="/#" onClick={goToRegister}>
              Sign Up Now!
            </a>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default AuthPage;
