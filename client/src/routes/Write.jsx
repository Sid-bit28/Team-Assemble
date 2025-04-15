import { useUser } from '@clerk/clerk-react';
import React from 'react';
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';

const Write = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <div className="">Loading...</div>;
  }

  if (isLoaded && !isSignedIn) {
    return <div>You should login!</div>;
  }
  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6 px-15">
      <form action="" className="flex flex-col gap-6 flex-1 mb-6">
        <div className="flex flex-row justify-between">
          <button className="w-max p-2 shadow-md rounded-xl text-sm text-[#B3B2B0] cursor-pointer">
            Add a cover image
          </button>
          <button className="rounded-full bg-green-400 hover:bg-green-500 font-medium px-5">
            Publish
          </button>
        </div>
        <input
          className="text-4xl font-semibold font-[#B3B2B0] outline-none mask-linear-from-neutral-600"
          type="text"
          placeholder="Tell your story..."
        />
        <textarea
          name="desc"
          className="p-4 rounded-xl shadow-md mask-linear-from-neutral-600 outline-none"
          placeholder="A short description..."
        />
        <ReactQuill theme="snow" className="flex-1 rounded-xl shadow-md" />
      </form>
    </div>
  );
};

export default Write;
