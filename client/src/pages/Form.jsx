import React, { useRef, useState } from 'react';
import { PageToggle } from '../components';
import { useForm } from 'react-hook-form';
import Editor from '@monaco-editor/react';

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

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
  }

  const submitData = (data) => {
    const source_code = editorRef.current.getValue();
    const language = selectedLanguage;
    data = { ...data, source_code, language };
    console.log(data);
  };

  return (
    <>
      <div className="bg-black min-h-screen text-slate-50 font-f1 px-40 py-10 w-full font-semibold">
        <div className="flex justify-center w-full mb-4">
          <div className="text-lime-300 font-semibold text-6xl">
            codeSnippets
          </div>
        </div>
        <PageToggle />
        <form
          onSubmit={handleSubmit(submitData)}
          className="flex justify-center"
        >
          <div className="w-2/3">
            <label className="text-2xl flex-col">
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

            <label className="text-2xl flex-col">
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

            <label className="text-2xl flex-col">
              <div className="mt-4">Source Code:</div>
              <div className="ring-2 ring-indigo-600 bg-transparent p-1.5 my-3 rounded-md pt-4">
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

            <label className="text-2xl flex-col">
              <div className="mt-4">Standard Input:</div>
              <textarea
                className="ring-2 ring-indigo-600 bg-transparent px-3 py-1.5 my-3 rounded-md w-full text-lime-300 font-mono font-thin"
                rows="3"
                type="text"
                {...register('stdin')}
              />
            </label>
            <button
              className="bg-lime-300 text-black font-semibold ring-1 ring-lime-300 my-2 px-4 py-1.5 rounded-sm text-xl"
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
