import React from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      const query = e.target.value;
      if (location.pathname === '/posts') {
        setSearchParams({ ...Object.fromEntries(searchParams), search: query });
      } else {
        navigate(`/posts?search=${query}`);
      }
    }
  };

  return (
    <div className="p-2 rounded-full flex items-center gap-2 bg-transparent">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M4.092 11.06a6.95 6.95 0 1 1 13.9 0 6.95 6.95 0 0 1-13.9 0m6.95-8.05a8.05 8.05 0 1 0 5.13 14.26l3.75 3.75a.56.56 0 1 0 .79-.79l-3.73-3.73A8.05 8.05 0 0 0 11.042 3z"
          clipRule="evenodd"
        ></path>
      </svg>
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent focus:outline-none"
        onKeyDown={handleKeyPress}
      />
    </div>
  );
};

export default Search;
