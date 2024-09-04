import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {uploadFiles} from '../store/resumeuplader/resumeuploader'; // Adjust the import path as needed
import axios from 'axios';
import FileTable from './resumeFechTable';

const jobTypes = ["Front-end", "Back-end", "Full-stack", "Java", "Python", "DevOps"]; // Example job types

function ResumeUploadHr() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [jobType, setJobType] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => file.type === 'application/pdf');

    if (validFiles.length !== files.length) {
      setErrorMessage('Only PDF files are allowed.');
    } else {
      setErrorMessage('');
      setSelectedFiles(validFiles);
    }
  };

  const handleJobTypeChange = (e) => {
    setJobType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Selected Files:', selectedFiles);
    console.log('Job Type:', jobType);
    console.log('User Info:', userInfo);
  
    if (selectedFiles.length === 0) {
      setErrorMessage('Please upload at least one PDF file.');
      return;
    }
  
    if (!jobType) {
      setErrorMessage('Please select a job type.');
      return;
    }
  
    dispatch(uploadFiles({ files: selectedFiles, jobType, email: userInfo.email, username: userInfo.username }))
      .unwrap()
      .then(() => {
        setSelectedFiles([]);
        // alert('File(s) uploaded successfully!');
      })
      .catch((error) => {
        setErrorMessage(error.message || 'An error occurred');
      });
  };
  const handleRemoveFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  return (
    <>
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <form className="py-4 px-9" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
              Send files to this email:
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="example@domain.com"
              value={userInfo?.email || ''}
              readOnly
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
              Name:
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your Name"
              value={userInfo?.username || ''}
              readOnly
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>

          <div className="mb-5">
            <label htmlFor="jobType" className="mb-3 block text-base font-medium text-[#07074D]">
              Job Type:
            </label>
            <select
              name="jobType"
              id="jobType"
              value={jobType}
              onChange={handleJobTypeChange}
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            >
              <option value="" disabled>Select a job type</option>
              {jobTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="mb-6 pt-4">
            <label className="mb-5 block text-xl font-semibold text-[#07074D]">
              Upload File
            </label>

            <div className="mb-8">
              <input
                type="file"
                name="file"
                id="file"
                multiple
                className="sr-only"
                onChange={handleFileChange}
                accept="application/pdf"
              />
              <label
                htmlFor="file"
                className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
              >
                <div>
                  <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                    Drop files here
                  </span>
                  <span className="mb-2 block text-base font-medium text-[#6B7280]">
                    Or
                  </span>
                  <span
                    className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D] cursor-pointer"
                  >
                    Browse files
                  </span>
                </div>
              </label>
            </div>

            {errorMessage && (
              <div className="text-red-500 mb-5">{errorMessage}</div>
            )}

{selectedFiles.length > 0 && (
              <div>
                <h4 className="mb-3 text-base font-medium text-[#07074D]">Selected files:</h4>
                <ul>
                  {selectedFiles.map((file, index) => (
                    <li key={index} className="flex items-center justify-between text-[#07074D] mb-2">
                      {file.name}
                      <button
                        type="button"
                        onClick={() => handleRemoveFile(index)}
                        className="ml-2 text-white bg-green-500 hover:bg-red-600 rounded-full w-6 h-6 flex items-center justify-center"
                        aria-label="Remove file"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
              // disabled={isLoading}
            >
              {/* {isLoading ? 'Uploading...' : 'Submit'} */} Submit
            </button>

            {/* {isSuccess && <div className="text-green-500 mt-5">Upload successful!</div>} */}
            {/* {error && <div className="text-red-500 mt-5">{error}</div>} */}
          </div>
        </form>
      </div>
    </div>
    {/* <FileTable/> */}
    </>
  );
}

export default ResumeUploadHr;
