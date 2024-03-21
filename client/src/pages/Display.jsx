import React, { useState, useEffect } from 'react';
import { PageToggle, Title, TableHead } from '../components';
import axios from 'axios';

const Display = () => {
  const [snippets, setSnippets] = useState([]);

  useEffect(() => {
    const fetchSnippets = async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-snippets`
      );
      // console.log(res.data);
      setSnippets(res.data);
    };
    fetchSnippets();
  }, []);

  function stringToTimestamp(stringTimestamp) {
    const date = new Date(stringTimestamp);
    const options = {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    };
    const formattedDate = date.toLocaleString('en-US', options);
    console.log(formattedDate);
    return formattedDate;
  }

  return (
    <>
      <div className="bg-black min-h-screen text-slate-50 font-f1 px-40 py-10 w-full">
        <Title />
        <PageToggle />

        <div className="overflow-x-scroll w-full mt-11">
          <table className="table-auto border-collapse border-2 border-indigo-600">
            <TableHead />
            <tbody className="font-mono text-1xl">
              {snippets?.map((snippet) => (
                <tr
                  key={snippet.id}
                  className="*:w-fit *:pr-14 *:border-2 *:pl-4 *:text-left *:py-4 *:border-indigo-600"
                >
                  <td>{snippet.username}</td>
                  <td>{snippet.language}</td>
                  <td>{snippet.stdin}</td>
                  <td>{snippet.output}</td>
                  <td>{snippet.truncated_source_code}...</td>
                  <td>{`${stringToTimestamp(snippet.timestamp)}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Display;
