import React, { useEffect, useRef, useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { LuTrash2 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteExcellRow,
  editExcelTable,
  getExceltablevalue,
  postExceltablevalue,
} from "../../store/excel/excelSlice";


function ExcelTable() {
  const dispatch = useDispatch();
  const { data: getData } = useSelector(
    (state) => state.excel.getExceltablevalue
  );

  const [tableData, setTableData] = useState(null);
  // const [fileName, setFileName] = useState("");
  const [searchRelevantExperience, setSearchRelevantExperience] = useState("");
  const [searchPositionName, setSearchPositionName] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [editTd, setEditTd] = useState(null);
  const fileInputRef = useRef(null);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTableData(file);
      // setFileName(file.name);
    } else {
      setTableData(null);
      // setFileName("");
    }
  };

  const updateExcel = async (e) => {
    e.preventDefault();
    if (fileInputRef.current && fileInputRef.current.files.length) {
      let formData = new FormData();
      formData.append("file", tableData);
      await dispatch(postExceltablevalue(formData));
      clearFileInput();
      // setFileName("");
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
  }, [dispatch,updateExcel]);

  // Filter logic
  const filteredData =
    getData?.filter((item) => {
      const relevantExperienceMatch = searchRelevantExperience
        ? String(item.R_Exp).includes(searchRelevantExperience)
        : true;

      const positionNameMatch = item.Position_Name
        ? item.Position_Name.toLowerCase().includes(searchPositionName.toLowerCase())
        : true;

      const locationMatch = item.C_Location
        ? item.C_Location.toLowerCase().includes(searchLocation.toLowerCase())
        : true;

      return relevantExperienceMatch  && positionNameMatch && locationMatch;
    }) || [];

  //* Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  //* edit table colunm
  const makeEditable = (e, rowIndex, colIndex) => {
    setEditTd({ row: rowIndex, col: colIndex });
    e.currentTarget.focus();
  };

  const handleBlur = async (e, title, id) => {
    e.preventDefault();
    if (editTd) {
      setEditTd(null);
      try {
        const value = e.currentTarget.innerText.trim();
        const data = { [title]: value };
        await dispatch(
          editExcelTable({
            id, 
            data,
          })
        );
      } catch (error) {
        console.log("Error updating:", error);
      }
    }
  };
  
  const handleDelete = async(id)=>{
    try {
      await dispatch(deleteExcellRow({id}))
      dispatch(getExceltablevalue());
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      <section>
        <div className="flex justify-between mb-10">
          <form onSubmit={updateExcel} className="flex">
            <label
              htmlFor="uploadFile1"
              className="bg-gray-800 rounded-xl gap-3 py-3 text-white hover:bg-gray-700 text-base px-5  outline-none w-max cursor-pointer font-[sans-serif] flex  ">
              <IoCloudUploadOutline className="text-2xl" />
              Select file
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
              className=" rounded-lg text-sm tracking-wider font-medium border border-blue-700 outline-none bg-transparent px-5 py-2.5 ml-10 hover:bg-blue-700 text-blue-700 hover:text-white transition-all duration-300">
              Upload
            </button>
          </form>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="text-xs text-white uppercase bg-gray-700 dark:bg-gray-700 dark:text-gray-400">
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
                  Experience
                </th>
                <th scope="col" className="px-6 py-3">
                  <div>Relevant Experience</div>
                  <div className="w-40">
                    <form className="flex items-center justify-center p-2">
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-black"
                        value={searchRelevantExperience}
                        onChange={(e) =>
                          setSearchRelevantExperience(e.target.value)
                        }
                      />
                    </form>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div>Position Name</div>
                  <div className="w-40">
                    <form className="flex items-center justify-center p-2">
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-black"
                        value={searchPositionName}
                        onChange={(e) =>
                          setSearchPositionName(e.target.value)
                        }
                      />
                    </form>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div>Location</div>
                  <div className="w-40">
                    <form className="flex items-center justify-center p-2">
                      <input
                        type="text"
                        placeholder="Search"
                        className="w-full px-2 py-1 text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent text-black"
                        value={searchLocation}
                        onChange={(e) => setSearchLocation(e.target.value)}
                      />
                    </form>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                 C CTC
                </th>
                <th scope="col" className="px-6 py-3">
                C NTH
                </th>
                <th scope="col" className="px-6 py-3">
                E CTC
                </th>
                <th scope="col" className="px-6 py-3">
                E NTH
                </th>
                <th scope="col" className="px-6 py-3 ">
                  <div className="w-20">Notice Period</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Remarks
                </th>
                <th scope="col" className="px-6 py-3">
                Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-white hover:text-white text-black text-[14px] border-b dark:bg-gray-800 dark:border-gray-700 odd:bg-white even:bg-gray-200 hover:bg-gray-500 ">
                    <th scope="row" className="px-6 py-4">
                      {indexOfFirstItem + index + 1}
                    </th>
                    <td
                      className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"Name", row._id)}
                    >
                      {row.Name}
                    </td>
                    <td className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"Contact_No", row._id)}
                    >
                      {row.Contact_Number}
                    </td>
                    <td className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"Email_ID", row._id)}
                    >
                      {row.Mail_ID}
                    </td>
                    <td className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"Exp", row._id)}
                    >
                      {row.Exp}
                    </td>
                    <td className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"R_Exp", row._id)}
                    >
                      {row.R_Exp}
                    </td>
                    <td className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"Position_Name", row._id)}
                    >
                      {row.Position_Name}
                    </td>
                    <td className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"C_Location", row._id)}
                    >
                      {row.C_Location}
                    </td>
                    <td className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"C_CTC", row._id)}
                    >
                      {row.C_CTC}
                    </td>
                    <td className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"C_NTH", row._id)}
                    >
                      {row.C_NTH}
                    </td>
                    <td className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"E_CTC", row._id)}
                    >
                      {row.E_CTC}
                    </td>
                    <td className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"E_NTH", row._id)}
                    >
                      {row.E_NTH}
                    </td>
                    <td className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"NP", row._id)}
                    >
                      {row.NP}
                    </td>
                    <td className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"Remarks", row._id)}
                    >
                      {row.Remarks}
                    </td>
                    <td className="px-6 py-4"
                      contentEditable={
                        editTd && editTd.row === index && editTd.col === 0
                      }
                      suppressContentEditableWarning={true}
                      onClick={(e) => makeEditable(e, index, 0)}
                      onBlur={(e)=>handleBlur(e,"Status", row._id)}
                    >
                      {row.Status}
                    </td>
                    <td className="px-6 py-4">
                        <button onClick={()=>handleDelete(row._id)}><LuTrash2 className="text-red-500 text-xl" /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="px-6 py-4 text-center">
                    No records found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination controls */}
        <nav
          className="flex items-center flex-column flex-wrap justify-center md:flex-row md:justify-between pt-4"
          aria-label="Table navigation">
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
            Showing{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {indexOfFirstItem + 1}-
              {indexOfLastItem > filteredData?.length
                ? filteredData.length
                : indexOfLastItem}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {filteredData?.length}
            </span>
          </span>
          <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Previous
              </button>
            </li>
            {totalPages > 1 && (
              <li className="flex justify-center">
                {[...Array(totalPages)].map((_, pageIndex) => (
                  <button
                    key={pageIndex}
                    type="button"
                    className={` flex items-center justify-center px-3 h-8 leading-tight border border-gray-300 hover:text-gray-700 hover:bg-gray-300 ${
                      currentPage === pageIndex + 1
                        ? "bg-blue-600 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handlePageChange(pageIndex + 1)}>
                    {pageIndex + 1}
                  </button>
                ))}
              </li>
            )}
            <li>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                Next
              </button>
            </li>
          </ul>
        </nav>
      </section>
    </>
  );
}

export default ExcelTable;
