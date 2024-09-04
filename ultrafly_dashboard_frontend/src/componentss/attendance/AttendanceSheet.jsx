import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
Modal.setAppElement("#root");
import { FiUserCheck } from "react-icons/fi";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAttendence,
  approveDeparture,
  getTodayAttendance,
  getLastWeekAttendance,
  getLastMonthAttendance,
  getAttendanceByName,
  getRangeSelectedAttendance,
} from "../../store/admin/adminSlice";
import { getAllUsers } from "../../store/api/userApiSlice";
import * as XLSX from "xlsx";

const AttendanceSheet = () => {
  const [selectedJobType, setSelectedJobType] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownForOpenSelectUsers, setDropdownForOpenSelectUsers] =
    useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentFileId, setCurrentFileId] = useState(null);
  const [currentFileRemarks, setCurrentFileRemarks] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [displayedData, setDisplayedData] = useState([]); // State for table data
  // this option for date formate like dd/mm/yy
  const options = { day: "2-digit", month: "2-digit", year: "2-digit" };

  const dispatch = useDispatch();
  const { data: allusers } = useSelector((state) => state.users.getAllUsers);
  const { data: allAttendence, status: allAttendenceStatus } = useSelector(
    (state) => state.admin.getAllAttendence
  );
  const { data: todayAttandance } = useSelector(
    (state) => state.admin.getTodayAttendance
  );
  const { data: lastWeekAttendance } = useSelector(
    (state) => state.admin.getLastWeekAttendance
  );
  const { data: lastMonthAttendance } = useSelector(
    (state) => state.admin.getLastMonthAttendance
  );
  const { data: rangeSelectedAttendance } = useSelector(
    (state) => state.admin.getRangeSelectedAttendance
  );
  const { data: attendanceByName } = useSelector(
    (state) => state.admin.getAttendanceByName
  );

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllAttendence());
  }, [dispatch]);
  
    // filter table data
    // all attendance

  const handleAllAttendance = () => {
    dispatch(getAllAttendence());
    setDisplayedData(allAttendence.data);
    setDropdownOpen(false);
    setDatePickerOpen(false);
    setSelectedJobType("All");
  };

  useEffect(() => {
    if (allAttendenceStatus === "succeeded") {
      const updatedData = allAttendence.data.map((item) => ({
        ...item,
        status: null, // Add status field
      }));
      setDisplayedData(updatedData);
    }
  }, [allAttendence, allAttendenceStatus]);

  // get attendance by username

  const handleAttendanceByUserName = (emailId) => {
    dispatch(getAttendanceByName({ emailId }));
    setDisplayedData(attendanceByName);
    setDropdownForOpenSelectUsers(false);
  };

  useEffect(() => {
    if (attendanceByName) {
      setDisplayedData(attendanceByName);
    }
  }, [attendanceByName]);

  // get today attendance

  const handleAttendanceToday = () => {
    dispatch(getTodayAttendance());
    setDisplayedData(todayAttandance.data);
    setDropdownOpen(false);
    setDatePickerOpen(false);
    setSelectedJobType("Today");
  };
  
  useEffect(() => {
    if (todayAttandance) {
      setDisplayedData(todayAttandance.data);
    }
  }, [todayAttandance]);

  // get last week attendance 

  const handleAttendanceLastWeek = () => {
    dispatch(getLastWeekAttendance());
    setDisplayedData(lastWeekAttendance.data);
    setDropdownOpen(false);
    setDatePickerOpen(false);
    setSelectedJobType("Last Week");
  };
  
  useEffect(() => {
    if (lastWeekAttendance) {
      setDisplayedData(lastWeekAttendance.data);
    }
  }, [lastWeekAttendance]);

  // get last month attendance

  const handleAttendanceMonth = () => {
    dispatch(getLastMonthAttendance());
    setDisplayedData(lastMonthAttendance.data);
    setDropdownOpen(false);
    setDatePickerOpen(false);
    setSelectedJobType("Last Month");
  };
  
  useEffect(() => {
    if (lastMonthAttendance) {
      setDisplayedData(lastMonthAttendance.data);
    }
  }, [lastMonthAttendance]);

  // get attendance by within range

  const handleAttendanceRange = () => {
    dispatch(
      getRangeSelectedAttendance({ fromDate: startDate, toDate: endDate })
    );
    setDisplayedData(rangeSelectedAttendance.data);
  };
  
  useEffect(() => {
    if (rangeSelectedAttendance) {
      setDisplayedData(rangeSelectedAttendance.data);
    }
  }, [rangeSelectedAttendance]);
  

  //
  const handleRegularizationAccept = async () => {
    try {
      await dispatch(
        approveDeparture({
          _id: currentFileId,
          approve: true,
        })
      );
      // Update status to 'accepted'
      setDisplayedData((prevData) =>
        prevData.map((item) =>
          item._id === currentFileId ? { ...item, status: "accepted" } : item
        )
      );
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegularizationReject = async () => {
    try {
      await dispatch(
        approveDeparture({
          _id: currentFileId,
          approve: false,
        })
      );
      // Update status to 'rejected'
      setDisplayedData((prevData) =>
        prevData.map((item) =>
          item._id === currentFileId ? { ...item, status: "rejected" } : item
        )
      );
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  // dropdown toggle
  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };
  const toggleDropdownForSelectingUser = () => {
    setDropdownForOpenSelectUsers((prevState) => !prevState);
  };

  // for modal
  const openModal = (fileId, remarks) => {
    setCurrentFileId(fileId);
    setCurrentFileRemarks(remarks);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentFileId(null);
  };

  // filter function
  const handleDateRangeSelect = () => {
    setSelectedJobType("Select Date Range");
    setDatePickerOpen(true);
    setDropdownOpen(false);
  };

  // function for New Date() formate to get HH:MM
  const timeFormate = (getTime) => {
    const date = new Date(getTime);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const timeString = `${hours}:${minutes}`;
    return timeString;
  };

  // generate table to excel

  const exportToExcel = () => {
    // Prepare the data for Excel
    const worksheet = XLSX.utils.json_to_sheet(
      displayedData.map((row, index) => ({
        "Sl no": index + 1,
        Date: new Date(row.departureDate).toLocaleDateString(),
        Name: row.name,
        Email: row.emailId,
        "Arrival Time": timeFormate(row.arrivalDate),
        "Departure Time": timeFormate(row.departureDate),
        Remarks: row.remarks,
        Regularize: row.status ? "Yes" : "No",
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generate buffer
    const wbout = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Create a blob and download the file
    const blob = new Blob([wbout], { type: "application/octet-stream" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `attadence-${new Date().toLocaleDateString()}.xlsx`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <form
        className="flex items-center mb-4 justify-center mx-auto font-sans"
        style={{ textAlign: "center" }}
      >
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
        </div>
      </form>

      <div className="flex items-center space-x-3 relative justify-center">
        <div>
          <button
            id="filterDropdownButton"
            onClick={toggleDropdownForSelectingUser}
            className="flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-4 w-4 mr-2 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            <p>User</p>
            <svg
              className="-mr-1 ml-1.5 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
          </button>

          {dropdownForOpenSelectUsers && (
            <div className="absolute z-10 w-48 p-3 bg-white rounded-3xl shadow transition duration-300 ease-in-out transform hover:scale-105 font-light text-sm border-2">
              <ul>
                {allusers?.map((user) => (
                  <li key={user._id}>
                    <button
                      className="block text-gray-900 hover:bg-gray-100 w-full text-center p-2 rounded-lg"
                      onClick={() => handleAttendanceByUserName(user.email)}
                    >
                      {user.username}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div>
          <button
            id="filterDropdownButton"
            onClick={toggleDropdown}
            className="flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="h-4 w-4 mr-2 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            {selectedJobType || "All"}
            <svg
              className="-mr-1 ml-1.5 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute z-10 w-48 p-3 bg-white rounded-3xl shadow transition duration-300 ease-in-out transform hover:scale-105 font-light text-sm border-2">
              <ul>
                <li>
                  <button
                    className="block text-gray-900 hover:bg-gray-100 w-full text-center p-2 rounded-lg"
                    onClick={handleAllAttendance}
                  >
                    All
                  </button>
                </li>
                <li>
                  <button
                    className="block text-gray-900 hover:bg-gray-100 w-full text-center p-2 rounded-lg"
                    onClick={handleAttendanceToday}
                  >
                    Today
                  </button>
                </li>
                <li>
                  <button
                    className="block text-gray-900 hover:bg-gray-100 w-full text-center p-2 rounded-lg"
                    onClick={handleAttendanceLastWeek}
                  >
                    Last Week
                  </button>
                </li>
                <li>
                  <button
                    className="block text-gray-900 hover:bg-gray-100 w-full text-center p-2 rounded-lg"
                    onClick={handleAttendanceMonth}
                  >
                    Last Month
                  </button>
                </li>
                <li>
                  <button
                    className="block text-gray-900 hover:bg-gray-100 w-full text-center p-2 rounded-lg"
                    onClick={handleDateRangeSelect}
                  >
                    Select Date
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={exportToExcel}
            className="text-blue-700 hover:text-white border border-indigo-500 hover:bg-indigo-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          >
            Download
          </button>
        </div>
      </div>

      {datePickerOpen && (
        <div className="flex justify-center mt-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <button onClick={() => setDatePickerOpen(false)}>
              <AiOutlineCloseCircle className=" text-2xl" />
            </button>
            <h2 className="mb-2 text-center text-sm md:text-lg font-medium">
              Select Date Range
            </h2>
            <div className="flex space-x-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                className="p-2 border border-gray-300 rounded"
                placeholderText="Start Date"
              />
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                className="p-2 border border-gray-300 rounded"
                placeholderText="End Date"
              />
            </div>
            <div className="flex justify-center mt-2">
              <button
                onClick={handleAttendanceRange}
                className="mt-2 text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      <div className=" mt-4">
        <div className="w-full ">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg max-md:overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    S.No
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Arrival Time
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Departure Time
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Regularize
                  </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {displayedData?.map((file, index) => (
                  <tr key={file._id} className="border-b dark:border-gray-700">
                    <td className="px-4 py-3 text-black-900">{index + 1}</td>
                    <td className="px-4 py-3 text-black-900">
                      {new Date(file.arrivalDate).toLocaleDateString(
                        "en-GB",
                        options
                      )}
                    </td>
                    <th
                      scope="row"
                      className="px-4 py-3 font-medium whitespace-nowrap dark:text-white text-black-900"
                    >
                      {file.name}
                    </th>
                    <td className="px-4 py-3">{file.emailId}</td>
                    <td className={`px-4 py-3`}>
                      {timeFormate(file.arrivalDate)}
                    </td>
                    <td className={`px-4 py-3`}>
                      {timeFormate(file.departureDate)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openModal(file._id, file.remarks)}
                        disabled={file.departureDate}
                        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 ${
                          file.departureDate
                            ?  "bg-green-500 hover:bg-green-600 focus:ring-green-300"
                            : "bg-red-500 hover:bg-red-600 focus:ring-red-300"
                        }`}
                      >
                        <span className="md:hidden">
                          <FiUserCheck />
                        </span>
                        <span className="max-md:hidden">Regularize</span>
                      </button>
                      {/* <button
                        onClick={() => openModal(file._id, file.remarks)}
                        disabled={file.departureDate}
                        className={`text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 ${
                          file.status === "accepted"
                            ? "bg-green-500 hover:bg-green-600 focus:ring-green-300"
                            : file.status === "rejected"
                            ? "bg-red-500 hover:bg-red-600 focus:ring-red-300"
                            : "bg-blue-500 hover:bg-blue-600 focus:ring-blue-300"
                        }`}
                      >
                        <span className="md:hidden">
                          <FiUserCheck />
                        </span>
                        <span className="max-md:hidden">Regularize</span>
                      </button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* regularization table */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Regularization Reason Modal"
        className="fixed inset-0 z-50 flex items-center justify-center "
        overlayClassName="fixed inset-0"
      >
        <div className=" bg-gray-300 rounded-2xl p-6 max-w-full">
          <button onClick={closeModal}>
            <AiOutlineCloseCircle className=" text-2xl" />
          </button>
          <h2 className="text-lg font-medium mb-4">Early Going Reason..</h2>
          <div>
            <p className="py-4">{currentFileRemarks?currentFileRemarks:'nothing entered'}</p>
            <button
              type="button"
              onClick={handleRegularizationAccept}
              className="mt-2 text-white bg-green-500 hover:bg-green-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              Accept
            </button>
            <button
              type="button"
              onClick={handleRegularizationReject}
              className="mt-2 text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none focus:ring-4 focus:ring-blue-300 ml-2"
            >
              Reject
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AttendanceSheet;
