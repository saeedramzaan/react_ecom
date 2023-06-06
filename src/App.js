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

import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthProvider from "contexts/auth";
import CommonProvider from "contexts/common";
import ProductsProvider from "contexts/products";
import CartProvider from "contexts/cart";
import CheckoutProvider from "contexts/checkout";
import RouteWrapper from "layouts/RouteWrapper";
import AuthLayout from "layouts/AuthLayout";
import CommonLayout from "layouts/CommonLayout";
import RegisterPage from "pages/register";
import addProduct from "pages/addProduct";
import AuthPage from "pages/auth";
import HomePage from "pages/home";
import Category from "pages/category"
import CheckoutPage from "pages/checkout";
import CheckoutUser from "pages/user_checkout";
import LoginPage from "pages/login";
import "assets/scss/style.scss";
import Radium, { StyleRoot } from 'radium';

<html>

<head>



</head>

</html>

const App = () => {
  return (
    <AuthProvider>
      <CommonProvider>
        <ProductsProvider>
          <CartProvider>
            <CheckoutProvider>
              <Router>
                <Switch>
                  <RouteWrapper
                    path="/"
                    exact
                    component={HomePage}
                    layout={CommonLayout}
                  />
                  <RouteWrapper
                    path="/checkout"
                    component={CheckoutPage}
                    layout={CommonLayout}
                  />
                  <RouteWrapper
                    path="/user_checkout"
                    component={CheckoutUser}
                    layout={CommonLayout}
                    ></RouteWrapper>
                  <RouteWrapper
                    path="/auth"
                    component={AuthPage}
                    layout={AuthLayout}
                  />
                  <RouteWrapper
                    path="/login"
                    component={LoginPage}
                    layout={CommonLayout}
                  />
                  <RouteWrapper
                    path="/register"
                    component={RegisterPage}
                    layout={AuthLayout}
                   />
                   <RouteWrapper
                      path="/addProduct"
                      component={addProduct}
                      layout={AuthLayout}
                      />
                      <RouteWrapper
                      path="/category"
                      component={Category}
                      layout={CommonLayout}
                      />
                </Switch>
              </Router>
            </CheckoutProvider>
          </CartProvider>
        </ProductsProvider>
      </CommonProvider>
    </AuthProvider>
  );
};

export default Radium(App);
