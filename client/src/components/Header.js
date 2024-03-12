import React, { useState, useContext } from "react";
// link
import { Link } from "react-router-dom";

// images
import Logo from "../img/logo.png";

// npm package icons
import { SlBag } from "react-icons/sl";
import { FiMenu } from "react-icons/fi";

// components
import SearchForm from "../components/SearchForm";
import CategoryNavMobile from "../components/CategoryNavMobile";
import Cart from "../components/Cart";

// cart context
import { CartContext } from "../context/CartContext";

const Header = () => {
  const { isOpen, setIsOpen, itemsAmount } = useContext(CartContext);
  const [catNavMobile, setCatNavMobile] = useState(false);

  return (
    <header className=" bg-primary py-6 fixed w-full top-0 z-40 lg:relative xl:mb-[30px]">
      <div className=" container mx-auto">
        <div className=" flex flex-row gap-4 lg:items-center justify-between mb-4 xl:mb-0">
          {/* 1_menu icons */}
          <div
            onClick={() => setCatNavMobile(true)}
            className=" text-3xl xl:hidden cursor-pointer"
          >
            <FiMenu />
          </div>
          {/* 1-0_mobile(移動裝置) menu選單 */}
          <div
            className={`${
              catNavMobile ? "left-0" : "-left-full"
            } fixed top-0 botoon-0 z-30 w-full h-screen transition-all`}
          >
            <CategoryNavMobile setCatNavMobile={setCatNavMobile} />
          </div>
          {/* 2_logo */}
          <Link to={"/"}>
            <img src={Logo} alt="" />
          </Link>
          {/* 3_此搜索框: 僅在 xl(電腦裝置) 的寬度顯示  */}
          <div className=" hidden w-full xl:flex xl:max-w-[734px]">
            <SearchForm />
          </div>
          {/* 4_聯繫電話 & 購物車cart */}
          <div className=" flex items-center gap-x-[10px]">
            {/* 聯繫電話 */}
            <div className=" hidden xl:flex uppercase">
              Need help? 123 456 789
            </div>
            {/* 購物車cart icon  */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className=" relative cursor-pointer"
            >
              <SlBag className=" text-2xl" />
              {/* 數量 */}
              <div className=" bg-accent text-primary absolute w-[18px] h-[18px] rounded-full top-3 -right-1 text-[13px] flex justify-center items-center font-bold tracking-[-0.1em]">
                {itemsAmount}
              </div>
            </div>
            {/* 購物車cart */}
            <div
              className={`${
                isOpen ? "right-0" : "-right-full"
              } bg-[#0e0f10] shadow-xl fixed top-0 bottom-0 w-full z-10 md:max-w-[500px] transition-all duration-300 overflow-auto`}
            >
              <Cart />
            </div>
          </div>
        </div>

        {/* 此搜索框: 僅在 mobile(移動裝置) 的寬度顯示 */}
        <div className=" xl:hidden">
          <SearchForm />
        </div>
      </div>
    </header>
  );
};

export default Header;
