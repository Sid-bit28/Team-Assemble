import React, { useState } from 'react';

import Image from './Image';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(prev => !prev);
  };

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center text-2xl font-bold">
        <Image src="/logo.png" className="w-10 h-6" alt="Logo" />
        <span>Team Assemble</span>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden">
        {/* Mobile Button */}
        <button
          className="block md:hidden text-[#333] mr-6 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            )}
          </svg>
        </button>
        {/* Mobile Link List */}
        <div
          className={`w-full h-screen flex flex-col items-center justify-center absolute top-16 transition-all ease-in-out backdrop-blur-sm gap-8 font-medium text-lg ${
            open ? '-right-0' : '-right-[100%]'
          }`}
        >
          <a href="/">Home</a>
          <a href="/">Trending</a>
          <a href="/">Most Popular</a>
          <a href="/">About</a>
          <a href="/">
            <button className="py-2 px-4 rounded-3xl bg-violet-600">
              Login👋
            </button>
          </a>
        </div>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <a href="/">Home</a>
        <a href="/">Trending</a>
        <a href="/">Most Popular</a>
        <a href="/">About</a>
        <a href="/">
          <button className="py-2 px-4 rounded-3xl bg-violet-600">
            Login👋
          </button>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
