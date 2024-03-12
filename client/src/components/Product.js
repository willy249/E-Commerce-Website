import React from "react";
// link
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`}>
      <div className=" grad w-full h-[362px] rounded-[8px] overflow-hidden relative group">
        {/* 0_徽章(new) */}
        {product.attributes.isNew && (
          <div className=" absolute bg-accent text-primary text-[12px] font-extrabold uppercase top-4 right-4 px-2 rounded-full z-10">
            new
          </div>
        )}
        {/* 1_圖片 */}
        <div className=" w-full h-[200px] flex items-center justify-center relative">
          <img
            className=" w-[160px] h-[160px] group-hover:scale-90 transition-all"
            src={`http://localhost:1337${product.attributes.image.data.attributes.url}`}
            alt=""
          />
        </div>
        {/* 2_商品描述 */}
        <div className=" px-6 pb-8 flex flex-col">
          {/* 標籤 */}
          <div className=" text-sm text-accent capitalize mb-2">
            {product.attributes.categories.data[0].attributes.title}
          </div>
          {/* 品名 */}
          <div className=" text-[15px] mb-4 lg:mb-9">
            {product.attributes.title.substring(0, 35)}...
          </div>
          {/* 價格 */}
          <div className=" text-lg text-accent">
            ${product.attributes.price}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
