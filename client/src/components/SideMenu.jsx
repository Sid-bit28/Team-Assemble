import React from 'react';

import Search from './Search';
import { useSearchParams } from 'react-router-dom';

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = e => {
    if (searchParams.get('sort') !== e.target.value) {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries(), {
          sort: e.target.value,
        }),
      });
    }
  };

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
            onChange={handleFilterChange}
          />
          Newest
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            className="appearance-none w-4 h-4 border-[1.5px] border-black cursor-pointer rounded-sm checked:bg-indigo-500"
            type="radio"
            name="sort"
            value="popular"
            onChange={handleFilterChange}
          />
          Most Popular
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            className="appearance-none w-4 h-4 border-[1.5px] border-black cursor-pointer rounded-sm checked:bg-indigo-500"
            type="radio"
            name="sort"
            value="trending"
            onChange={handleFilterChange}
          />
          Trending
        </label>
        <label htmlFor="" className="flex items-center gap-2 cursor-pointer">
          <input
            className="appearance-none w-4 h-4 border-[1.5px] border-black cursor-pointer rounded-sm checked:bg-indigo-500"
            type="radio"
            name="sort"
            value="oldest"
            onChange={handleFilterChange}
          />
          Oldest
        </label>
      </div>
    </div>
  );
};

export default SideMenu;
