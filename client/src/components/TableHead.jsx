import React from 'react';

const TableHead = () => {
  return (
    <thead className="font-f1 text-xl font-semibold text-lime-300">
      <tr className="*:w-fit *:pr-4 *:border-2 *:pl-4 *:text-left *:py-4 *:border-indigo-600">
        <th>username</th>
        <th>language</th>
        <th>stdin</th>
        <th>stdout</th>
        <th>code</th>
        <th>time</th>
      </tr>
    </thead>
  );
};

export default TableHead;
