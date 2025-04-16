import React, { useState, useEffect } from 'react';

import Image from './Image';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(prev => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(true); // Always show menu on large screen.
      } else {
        setOpen(false); // Hide menu by default on small screens.
      }
    };
    // Set initial state based on screen size
    handleResize();

    // Listen to resize events
    window.addEventListener('resize', handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="w-full h-16 md:h-20 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center text-2xl font-bold">
        <Image src="/logo.png" className="w-10 h-6" alt="Logo" />
        <span>Team Assemble</span>
      </Link>

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
          className={`w-full h-screen flex flex-col items-center justify-center absolute top-16 transition-all ease-in-out backdrop-blur-[10px] gap-8 z-10 font-medium text-lg ${
            open ? '-right-0' : '-right-[100%]'
          }`}
        >
          <Link to="/" className="menu-item">
            Home
          </Link>
          <Link to="/" className="menu-item">
            Trending
          </Link>
          <Link to="/" className="menu-item">
            Most Popular
          </Link>
          <Link to="/" className="menu-item">
            About
          </Link>
          <Link to="/" className="menu-item">
            <button className="py-2 px-4 rounded-3xl bg-violet-600">
              Login👋
            </button>
          </Link>
        </div>
      </div>
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/" className="menu-item">
          Home
        </Link>
        <Link to="/" className="menu-item">
          Trending
        </Link>
        <Link to="/" className="menu-item">
          Most Popular
        </Link>
        <Link to="/" className="menu-item">
          About
        </Link>
        <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-violet-600">
              Login👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
