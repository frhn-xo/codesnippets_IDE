import React from 'react';
import { NavLink } from 'react-router-dom';

const PageToggle = () => {
  return (
    <div className="flex justify-center my-10 mb-7 ">
      <div className="flex justify-between w-3/5 text-xl ">
        <NavLink
          to="/form"
          className={({ isActive }) =>
            `${
              isActive ? 'bg-lime-300 text-black' : 'bg-black'
            } ring-1 ring-lime-300 px-6 py-3 rounded-sm font-semibold`
          }
        >
          form page
        </NavLink>
        <NavLink
          to="/display"
          className={({ isActive }) =>
            `${
              isActive ? 'bg-lime-300 text-black ' : 'bg-black'
            } ring-1 ring-lime-300 px-6 py-3 rounded-sm font-semibold`
          }
        >
          display page
        </NavLink>

        <a
          href={import.meta.env.VITE_REPO}
          className="bg-black ring-1 ring-lime-300 px-6 py-3 rounded-sm font-semibold"
          target="_blank"
        >
          github
        </a>
      </div>
    </div>
  );
};

export default PageToggle;
