import React, { useEffect } from "react";
import useCustomLogin from "../../hooks/useCustomLogin";
import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";

/* eslint-disable multiline-ternary */
function CartComponent(props) {
  const { isLogin, loginState } = useCustomLogin();

  const { refreshCart, cartItems, changeCart } = useCustomCart();
  // const { cartItems, changeCart } = useCustomCart();

  // useEffect(() => {
  //   if (isLogin) {
  //     refreshCart();
  //   }
  // }, [isLogin]);

  return (
    <div className="w-full">
      {isLogin ? (
        <div className="flex flex-col">
          <div className="w-full flex">
            <div className="font-extrabold text-2xl w-4/5">
              {loginState.nickname}'s cart
            </div>
            <div className="bg-orange-600 w-1/5 text-center text-white font-bold rounded-full m-1">
              {cartItems.length}
            </div>
          </div>

          <div>
            <ul>
              {cartItems.map((item) => (
                <CartItemComponent
                  {...item}
                  key={item.cino}
                  changeCart={changeCart}
                  email={loginState.email}
                />
              ))}
            </ul>
          </div>
          {/* <div> */}
          {/*   <div className="text-2xl text-right font-extrabold"> */}
          {/*     TOTAL : {totalValue} */}
          {/*   </div> */}
          {/* </div> */}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default CartComponent;
