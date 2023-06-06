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
//import { Toast } from 'primereact/toast';



const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
  email: Yup.string().required("Enter Email"), 
  username: Yup.string().required("Mobile Number or Email Address is required!")
});

//const nameError = "";



const AuthPage = () => {
  
  const authDispatch = useContext(AuthDispatchContext);
  // const history = useHistory();
  // const location = useLocation();
  // const fromUrl = _get(location, "state.from.checkout");
  // console.log("location => ", location);
  // console.log(history);



  const goToForgotPassword = (e) => {
    e.preventDefault();
  };

  const goToRegister = (e) => {
    e.preventDefault();
  };

  const signInSuccess = (userData) => {
    // signIn(authDispatch, userData);
    // if (fromUrl) {
    //   history.push(fromUrl);
    // } else {
    //   history.push("/");
    // }
  };
     const [nameError, setnameError] = useState("")
     const [emailError, setemailError] = useState("")
     const [passwordError,setpasswordError] = useState("")

   var test = "";

   var myData = function(data) {
   
    return data;
  }

  // const headers = {
  //   Accept: "application/json", "Content-Type": "multipart/form-data",
  // }

//   const config ={
//     headers:{
//      'Accept': "application/json",
//       "Content-Type": "multipart/form-data",
//         // 'Authorization':`Bearer ${token}`,
        
//     }, 
// }

  const handleSubmit = e => {
    // Prevent the default submit and page reload
    e.preventDefault()

        const formData = new FormData();
        formData.append("selectedFile", selectedFile);
        formData.append("ProName",ProName);
        formData.append("ProPrice",ProPrice);
        formData.append("ProQty",ProQty);

    // Handle validations
    axios.post("http://localhost:8000/api/addPro", formData,
    {  headers: {"Content-Type": "multipart/form-data"} })
    .then(response => {

        console.log(response.data)
    
      // return response.data;

      //  if (response.data == "success") {
      // //    // history.push(fromUrl);
      //       window.location.replace('http://localhost:3000/checkout');
      //      // localStorage.setItem('dataKey', JSON.stringify(response.data));
      //       localStorage.setItem('username',username)
            
      //   } else {
      // //   history.push("/");
      //   }
        // Handle response
      })
      .catch(function (error) {
      
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
    
          // setnameError(error.response.data.errors.username);
          // setemailError(error.response.data.errors.email);
          // setpasswordError(error.response.data.errors.password);

          console.log(error.response.data);
          // console.log(error.response.status);

       
          //  console.log(error.response.data.message);

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
  const [selectedFile, setSelectedFile] = useState(null);

   
  const [ProName, setProName] = useState("")
  const [ProPrice, setProPrice] = useState("");
  const [ProQty, setProQty] = useState("")
  const [ProImage, setProImage] = useState("")

      const handleFileSelect = (event) => {
        // we only get the selected file from input element's event
        setSelectedFile(event.target.files[0])
    }


 const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      resolve(fileReader.result);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

const handleIcon = async (e, setFieldValue) => {
  const file = e.target.files[0];
     //check the size of image 
  if (file?.size/1024/1024 < 2) {
    const base64 = await convertToBase64(file);
    setFieldValue('profile_image', base64);
  }
  else {
   // toast.error('Image size must be of 2MB or less');
   console.log("Image size must be of 2mb or less");
  };
};


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
            name="txtProName"
            type="text"
            placeholder="Product Name"
            component={Input}
            value={ProName}
            onChange={e => setProName(e.target.value)}
          />
            <div style={{display:"block",position:'relative',bottom: '12px' }} className="invalid-feedback">{  }</div>
          <Field
            name="ProPrice"
            type="text"
            placeholder="Product Price"
            component={Input}
            value={ProPrice}
            onChange={e => setProPrice(e.target.value)}
          />
          <div style={{display:"block",position:'relative',bottom: '12px' }} className="invalid-feedback">{ }</div>
          <Field
            name="txtProQty"
            type="text"
            placeholder="Password"
            component={Input}
            value={ProQty}
            onChange={e => setProQty(e.target.value)}
          />

          <Field
            type="file"
            placeholder="Select the image"
            onChange={handleFileSelect}
          />

        <div style={{display:"block",position:'relative',bottom: '12px' }} className="invalid-feedback">{ }</div>
     
      
         
         
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


// import React, {useState} from 'react';
// import axios from 'axios';

// const Form = () => {
//     // state to store the selected file.
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [username, setUsername] = useState("")

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         // Create a FormData object
//         const formData = new FormData();

//         // Append file to the formData object here
//         formData.append("selectedFile", selectedFile);
//         formData.append("username",username);
       
//         try {
//             // We will send formData object as a data to the API URL here.
//             const response = await axios.post("http://localhost:8000/api/addPro", formData, {
//                 headers: {"Content-Type": "multipart/form-data"}
//             }).then((res) => {
//                 alert("File Uploaded Successfully");
//             }).catch((error) => {
//                 alert("Error")
//             });
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const handleFileSelect = (event) => {
//         // we only get the selected file from input element's event
//         setSelectedFile(event.target.files[0])
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <input type="file" onChange={handleFileSelect}/>
//             <input type="text" onChange={e => setUsername(e.target.value)}/>
//             <input type="submit" value="Upload File"/>
//         </form>
//     )
// };

// export default Form;