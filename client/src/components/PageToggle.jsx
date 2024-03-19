import React from 'react';
import { NavLink } from 'react-router-dom';

const PageToggle = () => {
  return (
    <div className="flex justify-center my-10 mb-7">
      <div className="flex justify-between w-96 text-xl">
        <NavLink
          to="/form"
          className={({ isActive }) =>
            `${
              isActive ? 'bg-lime-300 text-black font-semibold' : 'bg-black'
            } ring-1 ring-lime-300 px-4 py-1.5 rounded-sm`
          }
        >
          form page
        </NavLink>
        <NavLink
          to="/display"
          className={({ isActive }) =>
            `${
              isActive ? 'bg-lime-300 text-black font-semibold' : 'bg-black'
            } ring-1 ring-lime-300 px-4 py-1.5 rounded-sm`
          }
        >
          display page
        </NavLink>
      </div>
    </div>
  );
};

export default PageToggle;
