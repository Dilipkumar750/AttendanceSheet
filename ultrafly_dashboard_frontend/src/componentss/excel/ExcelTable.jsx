import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExceltablevalue,
  postExceltablevalue,
} from "../../store/excel/excelSlice";

function ExcelTable() {
  const dispatch = useDispatch();
  const { data: getData } = useSelector(
    (state) => state.excel.getExceltablevalue
  );

  const [tableData, setTableData] = useState(null);
  const [fileName, setFileName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState(""); // Holds the selected filter (e.g., "Total Experience")
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTableData(file);
      setFileName(file.name);
    } else {
      setTableData(null);
      setFileName("");
    }
  };

  const updateExcel = async (e) => {
    e.preventDefault();
    if (fileInputRef.current && fileInputRef.current.files.length) {
      let formData = new FormData();
      formData.append("file", tableData);
      await dispatch(postExceltablevalue(formData));
      clearFileInput();
      setFileName("");
    } else {
      console.log("error");
    }
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setTableData(null);
    }
  };

  useEffect(() => {
    dispatch(getExceltablevalue());
  }, [dispatch]);

  // Filter based on the selected filter and search term
  const filteredData =
    getData?.filter((item) => {
      if (!selectedFilter || !searchTerm) return true;
      const itemValue = String(item[selectedFilter] || "").toLowerCase();
      return itemValue.includes(searchTerm.toLowerCase());
    }) || [];

  //* pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <>
      <section>
        <div className="flex justify-between mb-10">
          <form onSubmit={updateExcel}>
            <label
              htmlFor="uploadFile1"
              className="bg-gray-800 hover:bg-gray-700 text-white text-base px-5 py-3 outline-none rounded w-max cursor-pointer font-[sans-serif]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 mr-2 fill-white inline"
                viewBox="0 0 32 32">
                <path d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z" />
                <path d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z" />
              </svg>
              Upload
              <input
                type="file"
                id="uploadFile1"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </label>
            <button
              type="submit"
              className="px-5 py-2.5 ml-10 rounded-lg text-sm tracking-wider font-medium border border-blue-700 outline-none bg-transparent hover:bg-blue-700 text-blue-700 hover:text-white transition-all duration-300">
              Upload
            </button>
          </form>
          <div className="flex space-x-4">
            <select
              className="w-48 p-2 rounded-md bg-white border shadow-lg"
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}>
              <option value="">Select Filter</option>
              <option value="Name">Name</option>
              <option value="Contact_No">Contact No</option>
              <option value="Email_ID">Email ID</option>
              <option value="Experience">Experience</option>
              <option value="Relevant_Experience">Relevant Experience</option>
              <option value="Current_Position">Current Position</option>
              <option value="Location">Location</option>
              <option value="CTC">CTC</option>
              <option value="Current_Client">Current Client</option>
              <option value="Notice_Period">Notice Period</option>
              <option value="FeedBack">FeedBack</option>
            </select>
            <div
              id="search-bar"
              className="w-96 bg-white rounded-md shadow-lg z-10">
              <form className="flex items-center justify-center p-2">
                <input
                  type="text"
                  placeholder="Search here"
                  className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Bind input to searchTerm state
                />
              </form>
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  S.No
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact No
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Experience
                </th>
                <th scope="col" className="px-6 py-3">
                  Relevant Experience
                </th>
                <th scope="col" className="px-6 py-3">
                  Current Position
                </th>
                <th scope="col" className="px-6 py-3">
                  Location
                </th>
                <th scope="col" className="px-6 py-3">
                  CTC
                </th>
                <th scope="col" className="px-6 py-3">
                  Current Client
                </th>
                <th scope="col" className="px-6 py-3">
                  Notice Period
                </th>
                <th scope="col" className="px-6 py-3">
                  Feedback
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr
                  key={item._id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {index + 1 + indexOfFirstItem}
                  </th>
                  <td className="px-6 py-4">{item.Name}</td>
                  <td className="px-6 py-4">{item.Contact_No}</td>
                  <td className="px-6 py-4">{item.Email_ID}</td>
                  <td className="px-6 py-4">{item.Experience}</td>
                  <td className="px-6 py-4">{item.Relevant_Experience}</td>
                  <td className="px-6 py-4">{item.Current_Position}</td>
                  <td className="px-6 py-4">{item.Location}</td>
                  <td className="px-6 py-4">{item.CTC}</td>
                  <td className="px-6 py-4">{item.Current_Client}</td>
                  <td className="px-6 py-4">{item.Notice_Period}</td>
                  <td className="px-6 py-4">{item.FeedBack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <section className="flex justify-center mt-10">
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                type="button"
                className={` mx-1 px-3 py-1 rounded ${
                  currentPage === pageIndex + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-300"
                }`}
                onClick={() => handlePageChange(pageIndex + 1)}>
                {pageIndex + 1}
              </button>
            ))}
          </section>
        )}
      </section>
    </>
  );
}

export default ExcelTable;
