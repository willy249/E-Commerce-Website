import React from "react";

// icons
import { FaYoutube, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className=" pt-6 bg-primary">
      <div className=" container mx-auto">
        <div className=" text-center">
          <h2 className="h2 uppercase mb-6 font-semibold">訂閱我們的電子報</h2>
          <p className=" text-white/70">
            成為第一個獲取有關趨勢、促銷等最新消息的人!
          </p>
        </div>
        {/* 表單 */}
        <form className=" w-full max-w-3xl mx-auto flex flex-col md:flex-row gap-5 my-14">
          <input
            type="text"
            placeholder="Your email address"
            className="input"
          />
          <button className="btn btn-accent min-w-[150px]">Join</button>
        </form>
        {/* links */}
        <div className=" text-base text-white/60 flex gap-x-6 capitalize max-w-max mx-auto mb-9">
          <a href="#" className=" hover:text-white transition-all">
            退貨政策
          </a>
          <a href="#" className=" hover:text-white transition-all">
            追蹤您的訂單
          </a>
          <a href="#" className=" hover:text-white transition-all">
            送貨方式
          </a>
        </div>
        {/* 社群 */}
        <div className=" flex gap-x-6 max-w-max mx-auto text-lg mb-16">
          <a href="#" className=" hover:text-white transition-all">
            <FaYoutube />
          </a>
          <a href="#" className=" hover:text-white transition-all">
            <FaInstagram />
          </a>
          <a href="#" className=" hover:text-white transition-all">
            <FaTwitter />
          </a>
          <a href="#" className=" hover:text-white transition-all">
            <FaFacebook />
          </a>
        </div>
      </div>
      {/* 版權 */}
      <div className=" py-10 border-t border-t-white/10">
        <div className=" container mx-auto">
          <div className=" text-center text-sm text-white/60">
            Copytight &copy; xxxx 2023,All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
