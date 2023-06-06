import React, { useContext,useState } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import {
  CartStateContext,
  CartDispatchContext,
  removeFromCart,
  toggleCartPopup
} from "contexts/cart";

const headlineStyle = {
  backgroundColor: "#fff",
  lineHeight: "1.5",
  border: "none",
  color: "black",
  display: "block",
  position: "absolute",
  top: "48px",
  right: "0",
  width: "360px",
  height: "388px",

}

const myStyle = {
  width: "100%",
  padding: "25px",
  backgroundColor: "coral",
  color: "white",
 
}

const myDIV = {
  width: "100%",
  padding: "25px",
  backgroundColor: "red",
  color: "white",
 
}

const active = {
  
  backgroundColor: 'green',
  lineHeight: "1.5",
  border: "none",
  color: "black",
  display: "block",
  position: "absolute",
  top: "48px",
  right: "0",
  width: "360px",
  height: "388px",

}
const inactive = {

  backgroundColor: 'black',
}



const CartPreview1 = () => {
  const { items, isCartOpen } = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);
  const history = useHistory();

  const handleRemove = (productId) => {
  //  return removeFromCart(dispatch, productId);

  window.location.replace('http://localhost:3000/auth');

  };

  const handleProceedCheckout = () => {
  //  toggleCartPopup(dispatch);
  //  history.push("/checkout");
    window.location.replace('http://localhost:3000/auth');
  };

//   function myFunction() {
  
//  }

 const myFunction = () => {
  //  return removeFromCart(dispatch, productId);
  var element = document.getElementById("myDIV");
    element.classList.add("myStyle");
    console.log("test");
 // window.location.replace('http://localhost:3000/auth');

  };

  const [selected, setSelected] = useState(0);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };

  return (


  

    <div >



<button style={selected == 1 ? active : inactive} onClick={handleClick(1)}>
    Btn
  
      </button>
      <button>TEst</button>
      <br />
      <div style={selected == 2 ? active : inactive} onClick={handleClick(2)}>
        click here 2
      </div>
      <br />
      <div style={selected == 3 ? active : inactive} onClick={handleClick(3)}>
        click here 3
      </div>
      <br />
      <div style={selected == 4 ? active : inactive} onClick={handleClick(4)}>
        click here 4
      </div>
     
    
    </div>
  );
};

export default CartPreview1;
