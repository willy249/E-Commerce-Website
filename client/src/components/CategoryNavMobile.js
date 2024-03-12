import React from "react";
// link
import { Link } from "react-router-dom";

// icons
import { FiX } from "react-icons/fi";

// useFetch hook (自定義)
import useFetch from "../hooks/useFetch";

const CategoryNavMobile = ({ setCatNavMobile }) => {
  // 請求資料
  const { data } = useFetch("./categories");

  return (
    <div className=" w-full h-full bg-primary p-8">
      {/* 關閉圖標 */}
      <div
        onClick={() => setCatNavMobile(false)}
        className=" flex justify-end mb-8 cursor-pointer"
      >
        <FiX className=" text-3xl " />
      </div>
      <div className=" flex flex-col gap-y-8">
        {data?.map((category) => {
          return (
            <Link
              to={`products/${category.id}`}
              className=" uppercase font-medium"
              key={category.id}
              onClick={() => setCatNavMobile(false)}
            >
              {category.attributes.title} Cameras
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryNavMobile;
