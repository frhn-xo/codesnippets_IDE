import React, { useRef, useState } from 'react';
import { PageToggle, Title } from '../components';
import { set, useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';
import axios from 'axios';

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  });

  const editorRef = useRef(null);

  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const handleLanguageChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const [isSubmit, setIsSubmit] = useState(false);
  const [output, setOutput] = useState(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const submitData = async (data) => {
    try {
      setIsSubmit(true);
      setOutput('fetching from judge0...');

      const source_code = editorRef.current.getValue();
      const language = selectedLanguage;
      data = { ...data, source_code, language };
      // console.log(data);

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/add-snippet`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // console.log(output);
      setOutput(res.data.snippet.output);
      // console.log(output);
      // console.log(res.data);
    } catch (error) {
      console.error(error);
      setIsSubmit(error);
    }
  };

  return (
    <>
      {isSubmit && (
        <div className="fixed z-50 inset-0 overflow-y-auto bg-opacity-30 backdrop-blur-md flex items-center justify-center">
          <div className="bg-black ring-2 ring-indigo-600  h-2/3 w-5/6 md:w-3/5 rounded-2xl flex-col">
            <div className="flex justify-between">
              <div className="text-slate-50 font-semibold md:text-3xl text-2xl m-6">
                Output
              </div>
              <button
                className="bg-lime-300 text-black font-semibold rounded-sm md:text-3xl text-xl md:w-28 w-20 md:h-14 h-8 m-4 mt-6 hover:bg-black hover:text-slate-50 ring-lime-300 ring-2"
                onClick={() => setIsSubmit(false)}
              >
                Close
              </button>
            </div>
            <div className="text-slate-50 h-80 mx-4 mt-5 overflow-scroll font-mono md:text-2xl">
              {output}
            </div>
          </div>
        </div>
      )}
      <div className="bg-black min-h-screen text-slate-50 font-f1 sm:px-40 py-10  w-full font-semibold ">
        <Title />
        <PageToggle />
        <form
          onSubmit={handleSubmit(submitData)}
          className="flex justify-center"
        >
          <div className="md:w-2/3 w-5/6 *:md:text-2xl">
            <label className=" flex-col">
              <div className="mt-4">Username:</div>
              {errors.username && (
                <div className="text-amber-400 font-light text-xs my-1">
                  {errors.username.message}
                </div>
              )}
              <input
                className="ring-2 ring-indigo-600 bg-transparent px-3 py-1.5 my-3 rounded-md w-full text-lime-300 font-mono font-thin"
                type="text"
                {...register('username', {
                  required: '* Username is required',
                })}
              />
            </label>

            <label className=" flex-col">
              <div className="mt-4">Language Dropdown:</div>
              <select
                className="ring-2 ring-indigo-600 bg-transparent px-3 py-1.5 my-3 rounded-md w-full text-lime-300 font-mono font-thin"
                value={selectedLanguage}
                onChange={handleLanguageChange}
              >
                <option className="bg-black" value="cpp">
                  C++
                </option>
                <option className="bg-black" value="java">
                  Java
                </option>
                <option className="bg-black" value="javascript">
                  JavaScript
                </option>
                <option className="bg-black" value="python">
                  Python
                </option>
              </select>
            </label>

            <label className=" flex-col">
              <div className="mt-4"> Code:</div>
              <div className="ring-2 ring-indigo-600 bg-transparent md:p-1.5 my-3 rounded-md pt-4 ">
                <Editor
                  height="400px"
                  language={selectedLanguage}
                  theme="hc-black"
                  defaultValue="//javascript >>> any other language 😶‍🌫️ 
//we can't be friends if you disagree 😔
console.log('Hello World');
"
                  onMount={handleEditorDidMount}
                />
              </div>
            </label>

            <label className=" flex-col">
              <div className="mt-4">Standard Input:</div>
              <textarea
                className="ring-2 ring-indigo-600 bg-transparent px-3 py-1.5 my-3 rounded-md w-full text-lime-300 font-mono font-thin"
                rows="3"
                type="text"
                {...register('stdin')}
              />
            </label>

            <button
              className="bg-lime-300 text-black font-semibold ring-1 ring-lime-300 my-2 md:px-4 md:py-1.5 p-1 rounded-sm md:text-xl px-4 text-sm"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
