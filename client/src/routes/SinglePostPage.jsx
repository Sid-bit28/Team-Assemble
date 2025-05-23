import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'timeago.js';

import Image from '../components/Image';
import PostMenuActions from '../components/PostMenuActions';
import Search from '../components/Search';
import Comments from '../components/Comments';

const fetchPost = async slug => {
  const res = await axios.get(`${import.meta.env.VITE_API_URI}/posts/${slug}`);
  console.log(res.data);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ['post', slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) {
    return 'loading...';
  }

  if (error) {
    return 'Something went wrong..' + error.message;
  }
  if (!data) {
    return 'Post not found.';
  }

  return (
    <div className="flex flex-col gap-8 px-15 pb-20">
      {/* detail */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl">
            {data.title}
          </h1>
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>Written by</span>
            <Link className="text-indigo-600">{data.user.username}</Link>
            <span>on</span>
            <Link className="text-indigo-600">{data.category}</Link>
            <span>{format(data.createdAt)}</span>
          </div>
          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>
        <div className="hidden lg:block w-2/5">
          {data.img && <Image src={data.img} w="600" className="rounded-2xl" />}
        </div>
      </div>
      {/* content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* text */}
        <div className="lg:text-lg flex flex-grow gap-6 text-justify">
          {data.content}
        </div>
        {/* menu */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              {data.user.img && (
                <Image
                  src={data.user.img}
                  className="w-12 h-12 rounded-full object-cover"
                  w="48"
                  h="48"
                />
              )}
              <Link>{data.user.username}</Link>
            </div>
            <div className="flex gap-2">
              <Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="cg alw"
                >
                  <path
                    fill="currentColor"
                    d="M22 12.061C22 6.505 17.523 2 12 2S2 6.505 2 12.061c0 5.022 3.657 9.184 8.438 9.939v-7.03h-2.54V12.06h2.54V9.845c0-2.522 1.492-3.915 3.777-3.915 1.094 0 2.238.197 2.238.197v2.476h-1.26c-1.243 0-1.63.775-1.63 1.57v1.888h2.773l-.443 2.908h-2.33V22c4.78-.755 8.437-4.917 8.437-9.939"
                  ></path>
                </svg>
              </Link>
              <Link>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="cg alw"
                >
                  <path
                    fill="currentColor"
                    d="M21 4.324v15.352A1.324 1.324 0 0 1 19.676 21H4.324A1.324 1.324 0 0 1 3 19.676V4.324A1.324 1.324 0 0 1 4.324 3h15.352A1.324 1.324 0 0 1 21 4.324M8.295 9.886H5.648v8.478h2.636V9.886zm.221-2.914a1.52 1.52 0 0 0-1.51-1.533H6.96a1.533 1.533 0 0 0 0 3.066 1.52 1.52 0 0 0 1.556-1.487zm9.825 6.236c0-2.555-1.626-3.542-3.229-3.542a3.02 3.02 0 0 0-2.67 1.37h-.082V9.875H9.875v8.477h2.648v-4.494a1.754 1.754 0 0 1 1.579-1.893h.104c.837 0 1.464.523 1.464 1.858v4.54h2.647l.024-5.144z"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
          <PostMenuActions post={data} />
          <h1 className="mt-8 mb-4 text-sm font-medium">Categories</h1>
          <div className="flex flex-col gap-2 text-sm">
            <Link className="underline" to="/">
              Adro Pitch Smashers
            </Link>
            <Link className="underline" to="/">
              Festivals
            </Link>
            <Link className="underline" to="/">
              Outsites
            </Link>
          </div>
          <h1 className="mt-8 mb-4 text-sm font-medium">Search</h1>
          <Search />
        </div>
      </div>
      <hr className="w-full my-5 mx-auto border border-gray-200" />
      <Comments postId={data._id} />
    </div>
  );
};

export default SinglePostPage;
