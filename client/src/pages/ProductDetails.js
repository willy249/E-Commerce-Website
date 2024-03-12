import React, { useContext } from "react";
// useParams hook
import { useParams } from "react-router-dom";
// useFetch hook(自定義)
import useFetch from "../hooks/useFetch";

// components
import RelatedProducts from "../components/RelatedProducts";
// context
import { CartContext } from "../context/CartContext";

const ProductDetails = () => {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  // 請求資料 (尋找&filters id[id] 符合[$eq] id的資料)
  const { data } = useFetch(`/products?populate=*&filters[id][$eq]=${id}`);
  if (!data) {
    return <div>loading...</div>;
  }
  // 標籤
  const categoryTitle = data[0].attributes.categories.data[0].attributes.title;

  return (
    <div className=" mb-16 pt-44 lg:pt-[30px] xl:pt-0">
      <div className=" container mx-auto">
        {/* 1_text*/}
        <div className=" flex flex-col lg:flex-row gap-[30px] mb-[30px]">
          {/* 1_1圖片 */}
          <div className=" flex-1 lg:max-w-[40%] lg:h-[540px] grad rounded-lg flex justify-center items-center">
            <img
              src={`http://localhost:1337${data[0].attributes.image.data.attributes.url}`}
              alt=""
              className=" w-full max-w-[65%]"
            />
          </div>
          {/* 1_2內容 */}
          <div className=" flex-1 bg-primary p-12 xl:p-20 rounded-lg flex flex-col justify-center">
            {/* 標籤 */}
            <div className=" uppercase text-accent text-lg font-medium mb-2">
              {data[0].attributes.categories.data[0].attributes.title} cameras
            </div>
            {/* 品名 */}
            <h2 className="h2 mb-4">{data[0].attributes.title}</h2>
            {/* 描述 */}
            <p className=" mb-12">{data[0].attributes.description}</p>
            {/* 價格 & 按鈕*/}
            <div className=" flex items-center gap-x-8">
              {/* 價格 */}
              <div className=" text-3xl text-accent font-semibold">
                ${data[0].attributes.price}
              </div>
              {/* 加入購物車-按鈕 */}
              <button
                onClick={() => addToCart(data, id)}
                className="btn btn-accent"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
        {/* 2_相關產品 */}
        <div>
          <RelatedProducts categoryTitle={categoryTitle} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
