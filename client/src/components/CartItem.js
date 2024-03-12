import React, { useContext } from "react";
import { Link } from "react-router-dom";

// icons
import { IoClose } from "react-icons/io5";
// components
import Qty from "../components/Qty";
// context
import { CartContext } from "../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className=" flex gap-x-8">
      {/* 1_圖片 */}
      <Link to={`product/${item.id}`} className=" w-[70px] h-[70px]">
        <img
          src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
          alt=""
        />
      </Link>
      {/* 2_內容 */}
      <div className=" flex-1">
        {/* 2-1_title & 移除購物車-按鈕 */}
        <div className=" flex gap-x-4 mb-3">
          <Link to={`product/${item.id}`}>{item.attributes.title}</Link>
          <div
            onClick={() => removeFromCart(item.id)}
            className=" cursor-pointer text-[24px] hover:text-accent transition-all"
          >
            <IoClose />
          </div>
        </div>
        {/* 2-2_總價 */}
        <div className=" flex items-center gap-x-12">
          <div className=" flex gap-x-4 mb-4">
            <Qty item={item} />
          </div>
          <div className=" text-accent text-xl">
            $ {item.attributes.price * item.amount}
          </div>
        </div>
        {/* 2-3_單價 */}
        <div>
          <span className=" text-accent">$ {item.attributes.price} 單價</span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
