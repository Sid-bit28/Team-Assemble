import React from 'react';

import Search from './Search';

const SideMenu = () => {
  return (
    <div className="px-2 h-max sticky top-8">
      <h1 className="mb-4 text-sm font-medium">Search</h1>
      <Search />
      <h1 className="mt-8 mb-4 text-sm font-medium">Filter</h1>
      <div className="flex flex-col text-sm gap-2">
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            className="appearance-none w-4 h-4 border-[1.5px] border-black cursor-pointer rounded-sm checked:bg-indigo-500"
            type="radio"
            name="sort"
            value="newest"
          />
          Newest
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            className="appearance-none w-4 h-4 border-[1.5px] border-black cursor-pointer rounded-sm checked:bg-indigo-500"
            type="radio"
            name="sort"
            value="popular"
          />
          Most Popular
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            className="appearance-none w-4 h-4 border-[1.5px] border-black cursor-pointer rounded-sm checked:bg-indigo-500"
            type="radio"
            name="sort"
            value="trending"
          />
          Trending
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            className="appearance-none w-4 h-4 border-[1.5px] border-black cursor-pointer rounded-sm checked:bg-indigo-500"
            type="radio"
            name="sort"
            value="oldest"
          />
          Oldest
        </label>
      </div>
    </div>
  );
};

export default SideMenu;
