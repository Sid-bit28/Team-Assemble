import React from 'react';

import Categories from './Categories';

const MainCategories = () => {
  return (
    <div className="md:flex md:flex-row items-center justify-between">
      <div className="w-2/3">
        <Categories />
      </div>
      <div className="md:flex p-4 items-center justify-between w-1/3">
        {/* links */}
        <span className="text-xl font-medium">|</span>
        {/* Search */}
        <div className="bg-gray-100 p-2 rounded-full flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            stroke="gray"
          >
            <circle cx="10.5" cy="10.5" r="7.5" />
            <line x1="16.5" y1="16.5" x2="22" y2="22" />
          </svg>
          <input
            type="text"
            placeholder="Search a post..."
            className="bg-transparent focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default MainCategories;
