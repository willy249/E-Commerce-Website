import React, { useContext } from "react";

// icons
import { IoArrowForward, IoCartOutline, IoClose } from "react-icons/io5";
// context
import { CartContext } from "../context/CartContext";

// components
import CartItem from "./CartItem";
// stripe
import { loadStripe } from "@stripe/stripe-js";
import { request } from "../request";

const Cart = () => {
  const { setIsOpen, cart, total, clearCart } = useContext(CartContext);

  // stripe公開密鑰
  const stripePromise = loadStripe(
    "pk_test_51OtRp7EdHMHu64phXy973IEww5fc3jIda0qK6cpiC2zDTC0QeuXE6ZfW3Hth0eSrdfZCENizmnNbHXCszsJpfxTo008JuB3v2m"
  );
  // 結帳
  const handlePayment = async () => {
    try {
      // 等待 Stripe.js 初始化完成
      const stripe = await stripePromise;

      // 向服務器端發送訂單信息
      const res = await request.post("/orders", {
        cart,
      });

      // 重定向用戶到 Stripe 支付頁面
      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" w-full h-full px-4 text-white">
      {/* 1_關閉圖標 & 商品細項 */}
      <div className=" overflow-y-auto overflow-x-hidden h-[75vh]">
        {/* 關閉圖標 */}
        <div className=" text-4xl w-20 h-[98px] flex justify-start items-center cursor-pointer">
          <IoClose onClick={() => setIsOpen(false)} />
        </div>
        {/* 購物車細項 */}
        <div className=" flex flex-col gap-y-10 px-2">
          {cart.map((item) => {
            return <CartItem item={item} key={item.id} />;
          })}
        </div>
      </div>

      {/* 2_全商品之總價 */}
      {cart.length >= 1 && (
        <div className=" px-6 py-5 flex flex-col">
          {/* 小計 */}
          <div className=" flex justify-between text-lg">
            <div>Subtotal</div>
            <div>$ {total}</div>
          </div>
          {/* 總價 */}
          <div className=" flex justify-between text-2xl">
            <div>total</div>
            <div>$ {total}</div>
          </div>
        </div>
      )}

      {/* 3_刪除/結帳按鈕 & 若無購物車，顯示的畫面*/}
      <div className=" px-6">
        {/* 按鈕 */}
        {cart.length >= 1 ? (
          <div className=" flex justify-between gap-x-4">
            {/* 刪除購物車 */}
            <button
              onClick={clearCart}
              className="btn btn-accent hover:bg-accent-hover text-primary"
            >
              clear caet
            </button>
            {/* 結帳 */}
            <button
              onClick={handlePayment}
              className="btn btn-accent hover:bg-accent-hover text-primary flex-1 px-2 gap-x-2"
            >
              Checkout
              <IoArrowForward className=" text-lg" />
            </button>
          </div>
        ) : (
          <div className=" h-full absolute top-0 right-0 left-0 flex justify-center items-center -z-10 flex-col text-white/30">
            <div className=" text-2xl">Your cart is empty</div>
            <div className=" text-6xl">
              <IoCartOutline />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
