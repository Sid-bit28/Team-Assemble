import React from 'react';

import Categories from './Categories';
import Search from './Search';

const MainCategories = () => {
  return (
    <div className="md:flex md:flex-row items-center justify-between">
      <div className="md:w-2/3">
        <Categories />
      </div>
      <div className="flex p-4 items-center justify-between md:w-1/3">
        {/* links */}
        <span className="text-xl font-medium mx-3">|</span>
        {/* Search */}
        <Search />
      </div>
    </div>
  );
};

export default MainCategories;
