import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect, useState } from 'react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import Upload from '../components/Upload';

const Write = () => {
  const [value, setValue] = useState('');
  const [categoryDropdownVisibility, setCatergoryDropdownVisibility] =
    useState(false);
  const [cover, setCover] = useState('');
  const [video, setVideo] = useState('');
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState(0);
  const { isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    image && setValue(prev => prev + `<p><image src="${image.url}"/></p>`);
  }, [image]);

  useEffect(() => {
    video &&
      setValue(
        prev => prev + `<p><iframe class="ql-video" src="${video.url}"/></p>`
      );
  }, [video]);

  const toggleCategoryDropdown = () => {
    setCatergoryDropdownVisibility(prev => !prev);
  };

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
      img: cover.filePath || '',
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
          <div className="flex flex-col gap-0.5">
            <Upload type="image" setProgress={setProgress} setData={setCover}>
              <button
                type="button"
                className="w-max p-2 shadow-md rounded-xl text-sm text-[#B3B2B0]"
              >
                {progress === 0
                  ? 'Add Cover Image'
                  : progress > 0 && progress < 100
                  ? `Uploading...`
                  : `${cover.filePath}`}
              </button>
            </Upload>
          </div>
          <div className="flex flex-col gap-1">
            <button
              type="submit"
              disabled={mutation.isPending || (progress > 0 && progress < 100)}
              className="rounded-full text-white bg-[#1B8817] hover:bg-green-800 font-medium px-5 cursor-pointer disabled:bg-green-300 disabled:cursor-not-allowed h-10"
            >
              {mutation.isPending ? 'Publishing...' : 'Publish'}
            </button>
            {mutation.isError && (
              <span className="text-xs">{mutation.error.message}</span>
            )}
          </div>
        </div>
        <input
          className="text-4xl font-semibold font-[#B3B2B0] outline-none mask-linear-from-neutral-950"
          type="text"
          placeholder="Tell your story..."
          name="title"
        />
        <textarea
          name="desc"
          className="p-4 rounded-xl shadow-md text-semibold mask-b-from-50% outline-none"
          placeholder="A short description..."
        />
        <div>
          <div className="flex flex-row gap-3">
            {/* Image SVG */}
            <Upload type="image" setProgress={setProgress} setData={setImage}>
              <button type="button">
                <svg
                  aria-label="Choose Image"
                  className="svgIcon-use cursor-pointer"
                  width="32"
                  height="32"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 17a2 2 0 100-4 2 2 0 000 4zm0-1a1 1 0 100-2 1 1 0 000 2z"
                    fill="#1A8917"
                  ></path>
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M10 10h12a2 2 0 012 2v8a2 2 0 01-2 2H10a2 2 0 01-2-2v-8a2 2 0 012-2zm0 1a1 1 0 00-1 1v4.293l2.646-2.647a.5.5 0 01.708 0L19.707 21H22a1 1 0 001-1v-8a1 1 0 00-1-1H10zm8.293 10L12 14.707l-3 3V20a1 1 0 001 1h8.293z"
                    fill="#1A8917"
                  ></path>
                  <rect
                    x=".5"
                    y=".5"
                    width="31"
                    height="31"
                    rx="15.5"
                    stroke="#1A8917"
                  ></rect>
                </svg>
              </button>
            </Upload>
            {/* Video SVG */}
            <Upload type="video" setProgress={setProgress} setData={setVideo}>
              <button type="button">
                <svg
                  className="svgIcon-use cursor-pointer"
                  width="32"
                  height="32"
                  fill="none"
                >
                  <rect
                    x="8.5"
                    y="10.761"
                    width="15"
                    height="11.522"
                    rx="1.5"
                    stroke="#1A8917"
                  ></rect>
                  <path
                    d="M19.5 16.522l-5.25 3.614v-7.229l5.25 3.615z"
                    stroke="#1A8917"
                    strokeLinejoin="round"
                  ></path>
                  <rect
                    x=".5"
                    y=".5"
                    width="31"
                    height="31"
                    rx="15.5"
                    stroke="#1A8917"
                  ></rect>
                </svg>
              </button>
            </Upload>

            {/* Categories SVG */}
            <div onClick={toggleCategoryDropdown}>
              <svg
                className="svgIcon-use cursor-pointer"
                width="32"
                height="32"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 10.5a.5.5 0 01.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5z"
                  fill="#1A8917"
                ></path>
                <path
                  d="M17 16.5a1 1 0 11-2 0 1 1 0 012 0z"
                  fill="#1A8917"
                ></path>
                <path
                  d="M12 16.5a1 1 0 11-2 0 1 1 0 012 0z"
                  fill="#1A8917"
                ></path>
                <path
                  d="M22 16.5a1 1 0 11-2 0 1 1 0 012 0z"
                  fill="#1A8917"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 22.5a.5.5 0 01.5-.5h15a.5.5 0 010 1h-15a.5.5 0 01-.5-.5z"
                  fill="#1A8917"
                ></path>
                <rect
                  x=".5"
                  y=".5"
                  width="31"
                  height="31"
                  rx="15.5"
                  stroke="#1A8917"
                ></rect>
              </svg>
            </div>
            {categoryDropdownVisibility && (
              <div>
                <select
                  name="category"
                  id=""
                  className="p-1 rounded-xl shadow-md outline-none"
                >
                  <option value="general" className="text-sm">
                    General
                  </option>
                  <option value="general">Pitch Smashers</option>
                  <option value="general">Festivals</option>
                  <option value="general">Outsites</option>
                </select>
              </div>
            )}
          </div>
          <ReactQuill
            theme="snow"
            className="rounded-xl shadow-md"
            onChange={setValue}
            value={value}
            readOnly={progress > 0 && progress < 100}
          />
        </div>
      </form>
    </div>
  );
};

export default Write;
