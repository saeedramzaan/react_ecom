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
  username: Yup.string().required("Mobile Number or Email Address is required!")
});



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
  
     const [passwordError,setpasswordError] = useState("")

     const [verificationError,setVerificationError] = useState("")

  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    // Handle validations
    axios
      .post("http://localhost:8000/api/login", { username, password })
      .then(response => {
        console.log(response.data)

        if (response.data.status == "success") {
         // history.push(fromUrl);
        window.location.replace('http://localhost:3000/user_checkout');
        // localStorage.setItem('dataKey', JSON.stringify(response.data));\
          localStorage.setItem('username', response.data.name)
          localStorage.setItem('userid', response.data.id)
         // console.log("Success");

        } else {
        //  history.push("/");
        console.log("Error");
        setVerificationError("User Name or Password is Wrong");
        }
        // Handle response
      }).catch(function (error) {
      
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
    
         
          setnameError(error.response.data.errors.username);
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
  const [password, setPassword] = useState("")

  return (
    <Formik
      // initialValues={{
      //   username: "",
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
            placeholder="Mobile Number or Email Address"
            component={Input}
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
           <div style={{display:"block",position:'relative',bottom: '12px' }} className="invalid-feedback">{ nameError }</div>
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
          <div style={{display:"block",position:'relative',bottom: '12px' }} className="invalid-feedback">{ verificationError }</div>
        
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
