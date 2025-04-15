import React from 'react';
import { Link } from 'react-router-dom';

import MainCategories from '../components/MainCategories';
import FeaturedPost from '../components/FeaturedPost';
import PostList from '../components/PostList';

const HomePage = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* Breadcrumbs */}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <span>|</span>
        <span className="text-indigo-800">Pictures and Memories</span>
      </div>
      {/* Introduction */}
      <div className="flex items-center justify-between">
        {/* titles */}
        <div className="mx-2">
          <h1 className="text-gray-800 text-2xl md:text-4xl lg:text-5xl font-bold">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h1>
          <p className="mt-8 text-md md:text-xl">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt
            repellat repellendus accusamus tenetur similique dicta possimus
            tempore assumenda.
          </p>
        </div>
        {/* animated button */}
        <Link to="/write">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            fill="none"
            viewBox="0 0 24 24"
            aria-label="Write"
          >
            <path
              fill="currentColor"
              d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"
            ></path>
            <path
              stroke="currentColor"
              d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"
            ></path>
          </svg>
          <div className="mr-5 md:mr-0">Write</div>
        </Link>
      </div>
      {/* Categories */}
      <MainCategories />
      {/* Featured Posts */}
      <FeaturedPost />
      {/* Postlist */}
      <div className="">
        <h1 className="my-8 text-2xl text-gray-600">Recent Posts</h1>
        <PostList />
      </div>
    </div>
  );
};

export default HomePage;
