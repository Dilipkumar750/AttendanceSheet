import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FileTable = ({  }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const jobType = "javas";
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`http://localhost:8001/api/files/${jobType}`);
        setFiles(response.data);
      } catch (err) {
        setError(err.response?.data || 'Error fetching files');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, [jobType]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">File Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Job Type</th>
            <th className="py-2 px-4 border-b">PDF ID</th>
            <th className="py-2 px-4 border-b">Download</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file._id}>
              <td className="py-2 px-4 border-b">{file.name}</td>
              <td className="py-2 px-4 border-b">{file.email}</td>
              <td className="py-2 px-4 border-b">{file.jobType}</td>
              <td className="py-2 px-4 border-b">{file.pdf}</td>
              <td className="py-2 px-4 border-b">
                <a 
                  href={`http://localhost:8001/api/download/${file.pdf}`} 
                  className="text-blue-500 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FileTable;
