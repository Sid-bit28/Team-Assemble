import React from 'react';

import Image from './Image';

const Comment = () => {
  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        <Image
          src="userImg.jpeg"
          className="w-10 h-10 rounded-full object-cover"
          width="40"
        />
        <span className="font-medium">John Doe</span>
        <span className="text-sm text-gray-500">2 days ago</span>
      </div>
      <div>
        <p className="mt-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur
          rerum iste sed ratione in debitis, impedit architecto doloribus iure
          excepturi, earum vero accusantium iusto a eum, quo magnam assumenda
          ut?
        </p>
      </div>
      <hr className="w-full my-5 mx-auto border border-gray-200" />
    </div>
  );
};

export default Comment;
