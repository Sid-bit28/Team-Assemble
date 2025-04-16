import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Write = () => {
  const [value, setValue] = useState('');
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async newPost => {
      const token = await getToken();
      return axios.post(`${import.meta.env.VITE_API_URI}/posts`, newPost, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: res => {
      toast.success('Post created!!🎊');
      navigate(`/${res.data.slug}`);
    },
  });

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div>You should login!</div>;
  }

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {
      title: formData.get('title'),
      category: formData.get('category'),
      desc: formData.get('desc'),
      content: value,
    };
    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6 px-15">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <div className="flex flex-row justify-between">
          <button className="w-max p-2 shadow-md rounded-xl text-sm text-[#B3B2B0] cursor-pointer">
            Add a cover image
          </button>
          <button
            disabled={mutation.isPending}
            className="rounded-full bg-green-400 hover:bg-green-500 font-medium px-5 cursor-pointer disabled:bg-green-300 disabled:cursor-not-allowed"
          >
            {mutation.isPending ? 'Loading...' : 'Publish'}
          </button>
          {mutation.isError && <span>{mutation.error.message}</span>}
        </div>
        <input
          className="text-4xl font-semibold font-[#B3B2B0] outline-none mask-linear-from-neutral-950"
          type="text"
          placeholder="Tell your story..."
          name="title"
        />
        <div className="flex justify-end items-center gap-4">
          <label
            htmlFor=""
            className="text-xl font-medium mask-linear-from-neutral-950"
          >
            Category:
          </label>
          <select
            name="category"
            id=""
            className="p-2 rounded-xl shadow-md outline-none"
          >
            <option value="general" className="text-sm">
              General
            </option>
            <option value="general">Pitch Smashers</option>
            <option value="general">Festivals</option>
            <option value="general">Outsites</option>
          </select>
        </div>
        <textarea
          name="desc"
          className="p-4 rounded-xl shadow-md text-semibold mask-b-from-50% outline-none"
          placeholder="A short description..."
        />
        <ReactQuill
          theme="snow"
          className="flex-1 rounded-xl shadow-md"
          onChange={setValue}
          value={value}
        />
      </form>
    </div>
  );
};

export default Write;
