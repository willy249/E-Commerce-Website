import React from "react";
// link
import { Link } from "react-router-dom";

// useFetch hook (自定義)
import useFetch from "../hooks/useFetch";

const CategoryNav = () => {
  const { data } = useFetch("/categories");

  return (
    // 預設 隱藏，僅在 xl(電腦裝置 1440px) 上顯示
    <aside className=" hidden xl:flex">
      <div className=" bg-primary flex flex-col w-[286px] h-[500px] rounded-[8px] overflow-hidden">
        <div className=" bg-accent py-4 text-primary uppercase font-semibold flex items-center justify-center">
          Browse Categories
        </div>
        <div className=" flex flex-col gap-y-6 p-6">
          {data?.map((category) => {
            return (
              <Link
                to={`/products/${category.id}`}
                className=" cursor-pointer uppercase"
                key={category.id}
              >
                {category.attributes.title}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default CategoryNav;
