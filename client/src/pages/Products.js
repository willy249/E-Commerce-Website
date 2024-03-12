import React, { useState, useEffect } from "react";
// useParams hook
import { useParams } from "react-router-dom";
// useFetch hook (自定義)
import useFetch from "../hooks/useFetch";

// components
import CategoryNav from "../components/CategoryNav";
import Product from "../components/Product";

const Products = () => {
  const { id } = useParams();
  // 請求資料 (尋找&filters 類別[categories] id[id] 符合[$eq] id的資料)
  const { data } = useFetch(
    `/products?populate=*&filters[categories][id][$eq]=${id}`
  );
  const [title, setTitle] = useState(null);

  useEffect(() => {
    if (data) {
      setTitle(data[0].attributes.categories.data[0].attributes.title);
    }
  }, [data]);

  return (
    <div className=" mb-16 pt-40 lg:pt-0">
      <div className=" container mx-auto">
        <div className=" flex gap-x-[30px]">
          {/* 導覽列(左) */}
          <CategoryNav />
          <main>
            {/* title */}
            <div className=" py-3 text-xl uppercase text-center lg:text-left">
              {title} cameras
            </div>
            {/* 商品內容 */}
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-[15px] md:gap-[30px]">
              {data?.map((product) => {
                return <Product product={product} key={product.id} />;
              })}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
