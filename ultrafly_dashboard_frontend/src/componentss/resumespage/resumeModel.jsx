import React from 'react';
import { IoMdCloseCircle } from "react-icons/io";
const Model = ({ isOpen, onClose, pdfUrl }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center xl:ml-[300px] mt-12 bg-opacity-50 z-50 ">
      <div className="bg-slate-100 rounded-lg shadow-lg w-full max-w-6xl  p-4 relative h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-gray-500 hover:text-gray-700 text-4xl "
        >
          <IoMdCloseCircle 
            className="w-12 h-12 text-indigo-500"
          
          />
            
        </button>
        <div className="flex flex-col mt-12">
        {/* <embed src={pdfUrl} type="application/pdf" width="100%" height="600px" /> */}
        {pdfUrl ? (
                    <iframe
                        src={pdfUrl}
                        title="PDF Viewer"
                        className=" border-none"
                        type="application/pdf"
                        style={{width:"full",height:"70vh"}}
                    />
                ) : (
                    <p>No PDF URL provided</p>
                )}
          
          <div className="flex justify-end mt-2">
           <a
            href={pdfUrl}
            download 
            
            type="button" className="mt-3 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800">Download</a>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Model;
