import React from 'react';
import { PageToggle } from '../components';

const Display = () => {
  return (
    <>
      <div className="bg-black min-h-screen text-slate-50 font-f1 px-40 py-10 w-full">
        <div className="flex justify-center w-full mb-4">
          <div className="text-lime-300 font-semibold text-6xl">
            codeSnippets{' '}
            <span className="font-thin text-3xl">using Redis+Judge0</span>
          </div>
        </div>
        <PageToggle />
      </div>
    </>
  );
};

export default Display;
