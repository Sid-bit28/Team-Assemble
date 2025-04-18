import React from 'react';
import { format } from 'timeago.js';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import axios from 'axios';

import Image from './Image';

const Comment = ({ comment, postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async () => {
      const token = await getToken();
      return axios.delete(
        `${import.meta.env.VITE_API_URI}/comments/${comment._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      toast.success('Comment deleted successfully.');
    },
    onError: err => {
      toast.error(err.response.data);
    },
  });

  const role = user?.publicMetadata?.role;

  return (
    <div className="p-4 bg-slate-50 rounded-xl mb-8">
      <div className="flex items-center gap-4">
        {comment.user.img && (
          <Image
            src={comment.user.img}
            className="w-10 h-10 rounded-full object-cover"
            width="40"
          />
        )}
        <span className="font-medium">{comment.user.username}</span>
        <span className="text-sm text-gray-500">
          {format(comment.createdAt)}
        </span>
        {user &&
          (comment.user.username === user.username || role === 'admin') && (
            <span
              className="text-xs text-red-300 hover:text-red-500 cursor-pointer"
              onClick={() => mutation.mutate()}
            >
              Delete 🗑️
              {mutation.isPending && <span>(in progress)</span>}
            </span>
          )}
      </div>
      <div>
        <p className="mt-4">{comment.desc}</p>
      </div>
      <hr className="w-full my-5 mx-auto border border-gray-200" />
    </div>
  );
};

export default Comment;
