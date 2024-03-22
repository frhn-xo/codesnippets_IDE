import React from 'react';
import { NavLink } from 'react-router-dom';

const PageToggle = () => {
  return (
    <div className="flex justify-center my-10 mb-7  w-full">
      <div className="flex justify-between  w-5/6 md:w-3/5 text-xl ">
        <NavLink to="/form">
          {({ isActive }) => (
            <button
              className={`relative inline-flex items-center justify-center md:px-6 md:py-3
              overflow-hidden font-medium transition duration-300 ease-out border-2 border-lime-300 rounded-md shadow-md  ${
                isActive ? '' : 'group'
              }`}
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 -translate-x-full bg-lime-300 group-hover:translate-x-0 ease">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="black"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span
                className={`text-sm md:text-lg absolute flex items-center justify-center w-full h-full transition-all duration-300 transform font-semibold ${
                  isActive
                    ? 'bg-lime-300 text-black'
                    : 'group-hover:translate-x-full ease'
                }`}
              >
                Form Page
              </span>
              <span className="relative invisible ">Form Page</span>
            </button>
          )}
        </NavLink>
        <NavLink to="/display">
          {({ isActive }) => (
            <button
              className={`relative inline-flex items-center justify-center md:px-6 md:py-3
              overflow-hidden font-medium transition duration-300 ease-out border-2 border-lime-300 rounded-md shadow-md  ${
                isActive ? '' : 'group'
              }`}
            >
              <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 -translate-x-full bg-lime-300 group-hover:translate-x-0 ease">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="black"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </span>
              <span
                className={`text-sm md:text-lg absolute flex items-center justify-center w-full h-full transition-all duration-300 transform font-semibold ${
                  isActive
                    ? 'bg-lime-300 text-black'
                    : 'group-hover:translate-x-full ease'
                }`}
              >
                Display Page
              </span>
              <span className="relative invisible ">Display Page</span>
            </button>
          )}
        </NavLink>
        <a href={import.meta.env.VITE_REPO} target="_blank">
          <button
            className={`relative inline-flex items-center justify-center md:px-6 md:py-3
              overflow-hidden font-medium transition duration-300 ease-out border-2 border-lime-300 rounded-md shadow-md  group`}
          >
            <span className="absolute inset-0 flex items-center justify-center w-full h-full duration-300 -translate-x-full bg-lime-300 group-hover:translate-x-0 ease">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="black"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </span>
            <span
              className="text-sm md:text-lg absolute flex items-center justify-center w-full h-full transition-all duration-300 transform font-semibold 
        group-hover:translate-x-full ease"
            >
              github
            </span>
            <span className="relative invisible">github</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default PageToggle;
