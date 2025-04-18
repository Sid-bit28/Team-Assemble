import React from 'react';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth, useUser } from '@clerk/clerk-react';
import { toast } from 'react-toastify';

import Comment from './Comment';

const fetchComments = async postId => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URI}/comments/${postId}`
  );
  return res.data;
};

const Comments = ({ postId }) => {
  const { getToken } = useAuth();
  const { user } = useUser();
  const { isPending, error, data } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });

  const mutation = useMutation({
    mutationFn: async newComment => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URI}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
    onError: err => {
      toast.error(err.response.data);
    },
  });

  const queryClient = useQueryClient();

  if (isPending) {
    return 'loading...';
  }

  if (error) {
    return 'Something went wrong..' + error.message;
  }
  if (!data) {
    return 'Comments not found.';
  }

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      desc: formData.get('desc'),
    };
    mutation.mutate(data);
  };

  return (
    <>
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl text-black font-semibold">Responses</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
        >
          <path
            fillRule="evenodd"
            d="M11.987 5.036a.754.754 0 0 1 .914-.01c.972.721 1.767 1.218 2.6 1.543.828.322 1.719.485 2.887.505a.755.755 0 0 1 .741.757c-.018 3.623-.43 6.256-1.449 8.21-1.034 1.984-2.662 3.209-4.966 4.083a.75.75 0 0 1-.537-.003c-2.243-.874-3.858-2.095-4.897-4.074-1.024-1.951-1.457-4.583-1.476-8.216a.755.755 0 0 1 .741-.757c1.195-.02 2.1-.182 2.923-.503.827-.322 1.6-.815 2.519-1.535m.468.903c-.897.69-1.717 1.21-2.623 1.564-.898.35-1.856.527-3.026.565.037 3.45.469 5.817 1.36 7.515.884 1.684 2.25 2.762 4.284 3.571 2.092-.81 3.465-1.89 4.344-3.575.886-1.698 1.299-4.065 1.334-7.512-1.149-.039-2.091-.217-2.99-.567-.906-.353-1.745-.873-2.683-1.561m-.009 9.155a2.672 2.672 0 1 0 0-5.344 2.672 2.672 0 0 0 0 5.344m0 1a3.672 3.672 0 1 0 0-7.344 3.672 3.672 0 0 0 0 7.344m-1.813-3.777.525-.526.916.917 1.623-1.625.526.526-2.149 2.152z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <div className="flex flex-col gap-8 lg:w-3/5">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-between gap-8 w-full"
        >
          <textarea
            name="desc"
            placeholder="What are you thoughts?"
            className="w-full p-4 rounded-xl bg-gray-100 focus:bg-gray-200 focus:outline-none"
          />
          <button
            type="submit"
            className="text-white bg-[#050708] focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-full text-sm px-5 py-2.5 text-center inline-flex items-center me-2 mb-2 cursor-pointer"
          >
            Post
          </button>
        </form>
        {isPending ? (
          'Loading...'
        ) : error ? (
          'Error loading comments!'
        ) : (
          <>
            {mutation.isPending && (
              <Comment
                comment={{
                  desc: `${mutation.variables.desc} (Sending...)`,
                  createdAt: new Date(),
                  user: {
                    img: user.imageurl,
                    username: user.username,
                  },
                }}
              />
            )}
            {data.map(comment => (
              <Comment key={comment._id} comment={comment} postId={postId} />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Comments;
