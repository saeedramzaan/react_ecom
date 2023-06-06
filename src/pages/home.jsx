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

import React, { useEffect, useContext } from "react";
import ProductCard from "components/Product";
import axios from 'axios';
import Radium, {StyleRoot} from 'radium';

import {
  ProductsStateContext,
  ProductsDispatchContext,
  getProducts
} from "contexts/products";
import { CommonStateContext } from "contexts/common";

const Home = () => {
  const { products, isLoading, isLoaded } = useContext(ProductsStateContext);
  const { searchKeyword } = useContext(CommonStateContext);
  const dispatch = useContext(ProductsDispatchContext);

  const productsList = products && products.filter((product) => {
      return (
        product.pname.toLowerCase().includes(searchKeyword.toLowerCase()) || !searchKeyword
      );
    });

  useEffect(() => {
    getProducts(dispatch);
  }, []);

  


  const saveCart = () => {



  //  const setCat = localStorage.setItem('category','health_care');

  //  const getCat = localStorage.getItem('category');
  //  var indexToRemove = 1;
  //  getCat.slice(indexToRemove, 1);
   //   useEffect(() => {

    localStorage.removeItem('category')

    const setCat = localStorage.setItem('category','health_care');

    window.location.replace('http://localhost:3000');
  //   axios.post("http://localhost:8000/api/displayPro",{ getCat }).then((data) => {
      
  //   console.log(data.data);

  // // localStorage.removeItem('category'); 
  //       // setPost(data?.data);
  //    //   alert('test');
  //      });
     
    // }, []);
 };

 const clickBeverage = () => {

  localStorage.removeItem('category')

  const setCat = localStorage.setItem('category','beverage');

  window.location.replace('http://localhost:3000');

 };

 const clickCook = () => {

  localStorage.removeItem('category')

  const setCat = localStorage.setItem('category','cook');

  window.location.replace('http://localhost:3000');

 };

 


 const btn = {
  '@media (max-width: 580px)':{
    display: 'none',
  },
};



  if (isLoading) {
    return (
      <div className="products-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (

   
    
    <div className="products-wrapper">

<div className="row" style={{marginTop:'45px'}}>



<div className="col-4 col-lg-2  padding-col">
<button className="outline btnSize" onClick={() => clickBeverage()}>
  <i className="" /> Beverage,Tea & Coffee
</button>
</div>

<div className="col-4 col-lg-2 padding-col">
<button className="outline btnSize" onClick={() => clickBeverage()}>
  <i className="" /> Cooking Incredients
</button>
</div>

<div className="col-4 col-lg-2 padding-col">
<button className="outline btnSize"  onClick={() => clickBeverage()}>
  <i className="fas fa‑angle‑double‑left" /> Rice & Grains
</button>
</div>

<div className="col-4 col-lg-2 padding-col">
<button className="outline btnSize" onClick={() => clickBeverage()}>
  <i className="fas fa‑angle‑double‑left" /> Noodles & Soya
</button>
</div>

<div className="col-4 col-lg-2 padding-col">
<button className="outline btnSize" onClick={() => clickBeverage()}>
  <i className="fas fa‑angle‑double‑left" /> Health & Beauty
</button>
</div>

<div className="col-4 col-lg-2 padding-col">
<button className="outline btnSize" onClick={() => clickBeverage()}>
  <i className="fas fa‑angle‑double‑left" /> Laundary Cleaning
</button>
</div>

</div>

<div className="row" style={{marginTop:'5px'}}>



<div className="col-4 col-lg-2  padding-col">
<button className="outline btnSize" onClick={() => clickBeverage()}>
  <i className="" /> Baby Care
</button>
</div>

<div className="col-4 col-lg-2 padding-col">
<button className="outline btnSize" onClick={() => clickBeverage()}>
  <i className="" /> Biscuits,Nuts & Cake 
</button>
</div>

<div className="col-4 col-lg-2 padding-col">
<button className="outline btnSize"  onClick={() => clickBeverage()}>
  <i className="fas fa‑angle‑double‑left" /> Oil and Sauce
</button>
</div>

<div className="col-4 col-lg-2 padding-col">
<button className="outline btnSize" onClick={() => clickBeverage()}>
  <i className="fas fa‑angle‑double‑left" /> Dairy Products & Milk
</button>
</div>

<div className="col-4 col-lg-2 padding-col">
<button className="outline btnSize" onClick={() => clickBeverage()}>
  <i className="fas fa‑angle‑double‑left" /> Stationary Items
</button>
</div>

<div className="col-4 col-lg-2 padding-col">
<button className="outline btnSize" onClick={() => clickBeverage()}>
  <i className="fas fa‑angle‑double‑left" /> Cosmetic & Body Lotion
</button>
</div>




<div class="footer_popup">
  <p>Footer</p>
</div>

</div>

<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
  Launch demo modal
</button>



      <div className="products">

        {isLoaded && productsList.map((data) => {
            return <ProductCard key={data.id} data={data} />;
          })}

      </div>
    </div> 



  );
};

export default Home;
