import React from 'react';
import { Link } from 'react-router-dom';

import Image from './Image';

const PostListItem = () => {
  return (
    <div className="flex flex-col xl:flex-row gap-8">
      {/* image */}
      <div className="md:hidden xl:block xl:w-1/3">
        <Image
          src="postImg.jpeg"
          className="rounded-2xl object-cover mr-3"
          w="735"
        />
      </div>
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to="/test" className="text-4xl font-semibold">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link className="text-indigo-600">John Doe</Link>
          <span>on</span>
          <Link className="text-indigo-600">Adro PitchSmashers</Link>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis,
          possimus quam? Consequatur voluptate tenetur animi aliquam corrupti
          autem quasi sequi fugiat odit? Voluptate nobis perspiciatis voluptates
          sapiente eveniet tenetur quis!
        </p>
        <Link to="/test" className="underline text-indigo-600 text-sm">
          Read More 🙌
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
