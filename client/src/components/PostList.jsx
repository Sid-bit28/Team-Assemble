import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import PostListItem from './PostListItem';

const fetchPosts = async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URI}/posts`);
  return res.data;
};

const PostList = () => {
  const { isPending, error, data } = useQuery({
    queryKey: [],
    queryFn: () => fetchPosts(),
  });

  if (isPending) return 'Loading...';
  if (error) {
    return 'An error has occured: ' + error.message;
  }

  console.log(data);
  return (
    <div className="flex flex-col gap-12 mb-8">
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
      <PostListItem />
    </div>
  );
};

export default PostList;
