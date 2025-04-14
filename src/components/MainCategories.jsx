import React from 'react';
import { Link } from 'react-router-dom';

const MainCategories = () => {
  return (
    <div className="md:flex p-4 items-center justify-items-start gap-8 shadow-[0_4px_6px_-4px_rgba(0,0,0,0.1)]">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="19"
        height="19"
        class="hl hm hn"
      >
        <path fill-rule="evenodd" d="M9 9H3v1h6v6h1v-6h6V9h-6V3H9z"></path>
      </svg>
      {/* links */}
      <div className="flex-1 flex items-center justify-between flex-wrap">
        <Link
          to="/posts?cat=web-design"
          className="bg-violet-700 rounded-full text-white px-4 py-2"
        >
          All Posts
        </Link>
        <Link
          to="/posts?cat=adro-pitchsmashers"
          className="hover:bg-violet-50 rounded-full px-4 py-2"
        >
          Adro Pitch-Smashers
        </Link>
        <Link
          to="/posts?cat=festivals"
          className="hover:bg-violet-50 rounded-full px-4 py-2"
        >
          Festivals
        </Link>
        <Link
          to="/posts?cat=outsite"
          className="hover:bg-violet-50 rounded-full px-4 py-2"
        >
          Outsites
        </Link>
        <span className="text-xl font-medium">|</span>
        {/* Search */}
        <div className="bg-gray-100 p-2 rounded-full flex items-center gap-2">
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
