import React, { useState } from 'react';

import Categories from '../components/Categories';
import PostList from '../components/PostList';
import SideMenu from '../components/SideMenu';

const PostListPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Categories />
      <button
        onClick={() => setOpen(prev => !prev)}
        className="md:hidden bg-indigo-800 text-sm text-white px-4 py-2 rounded-2xl mb-2"
      >
        {open ? 'Close' : 'Filter or Search'}
      </button>
      <div className="flex flex-col-reverse gap-8 md:flex-row">
        <div className="">
          <PostList />
        </div>
        <div className={`${open ? 'block' : 'hidden'} md:block`}>
          <SideMenu />
        </div>
      </div>
    </>
  );
};

export default PostListPage;
