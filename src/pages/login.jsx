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

import axios from "axios"
import { useState } from "react"
// import React, { useContext,useState } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import { AuthDispatchContext, signIn } from "contexts/auth";
import Input from "components/core/form-controls/Input";





 const Login = () => {

  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

    // Handle validations
    axios
      .post("http://localhost:8000/api/login", { email, password })
      .then(response => {
        console.log(response.data)
        // Handle response
      })
  }

  const [email, setEmail] = useState()
  const [password, setPassword] = useState()



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
          name="email"
          type="text"
          placeholder="Mobile Number or Email Address"
          component={Input}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <div style={{display:"block",position:'relative',bottom: '12px' }} className="invalid-feedback">{ }</div>
        <Field
          name="password"
          type="password"
          placeholder="Password"
          component={Input}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
<div style={{display:"block",position:'relative',bottom: '12px' }} className="invalid-feedback">{ }</div>
        <p>
          <a href="/#" >
            Forgot Password?
          </a>
        </p>
        <button className="auth-button block" onClick={handleSubmit}>
          Login
        </button>

        <p>
          New here?{" "}
          <a href="/#" >
            Sign Up Now!
          </a>
        </p>
      </Form>
    )}
  </Formik>
  )
}

export default Login;