import React from "react";

// useFetch hook (自定義)
import useFetch from "../hooks/useFetch";

// components
import ProductSlider from "../components/ProductSlider";

const LatestProducts = () => {
  // 請求資料
  const { data } = useFetch("./products?populate=*&filters[isNew]=true");

  return (
    <div className=" mb-16">
      <div className=" container mx-auto">
        <h2 className="h2 mb-6 text-center xl:text-left">Latest Products</h2>
      </div>
      <ProductSlider data={data} />
    </div>
  );
};

export default LatestProducts;
