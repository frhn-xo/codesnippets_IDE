import React, { useState, useEffect } from 'react';
import { PageToggle, Title, TableHead } from '../components';
import axios from 'axios';

const Display = () => {
  const [snippets, setSnippets] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSnippets = async () => {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/get-snippets`
      );
      // console.log(res.data);
      setSnippets(res.data);
      setLoading(false);
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
      <div className="bg-black min-h-screen text-slate-50 font-f1 sm:px-40 py-10  w-full font-semibold ">
        <Title />
        <PageToggle />
        {!loading ? (
          <div className="overflow-x-scroll w-full mt-11">
            <table className="table-auto border-collapse border-2 border-indigo-600">
              <TableHead />
              <tbody className="font-mono sm:text-1xl text-xs">
                {snippets?.map((snippet) => (
                  <tr
                    key={snippet.id}
                    className="*:w-fit *:md:pr-14 *:pr-6 *:border-2 *:pl-4 *:text-left *:py-4 *:border-indigo-600"
                  >
                    <td>{snippet.username}</td>
                    <td>{snippet.language}</td>
                    <td>{snippet.stdin}</td>
                    <td>{snippet.output}</td>
                    <td>{snippet.truncated_source_code}...</td>
                    <td>{`${stringToTimestamp(snippet.timestamp)}`}</td>
                  </tr>
                ))}
                {snippets?.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No snippets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div class="w-full flex justify-center items-center mt-16">
            <div class="flex w-full items-center justify-center">
              <div class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-lime-300 to-black animate-spin">
                <div class="h-20 w-20 rounded-full bg-black"></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Display;
