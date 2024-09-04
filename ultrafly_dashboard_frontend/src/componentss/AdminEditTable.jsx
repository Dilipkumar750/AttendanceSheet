import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUsers,
  updateUserandAdmin,
  deleteUserandAdmin,
} from "../store/api/userApiSlice";
import "./styles/loder.css";
import { notification } from "antd";
import { MdAutoDelete } from "react-icons/md";

function AdminEdit() {
  const dispatch = useDispatch();
  const {
    data: users,
    loading,
    error,
  } = useSelector((state) => state.users.getAllUsers);

  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  if (loading === "loading") {
    return (
      <div className="cube">
        <div className="cube_item cube_x"></div>
        <div className="cube_item cube_y"></div>
        <div className="cube_item cube_y"></div>
        <div className="cube_item cube_x"></div>
      </div>
    );
  }

  if (loading === "failed") {
    return <div>Error: {error}</div>;
  }

  const handleToggleIsAdmin = (user) => {
    if (userInfo.isAdmin) {
      const updatedUser = { ...user, isAdmin: !user.isAdmin };
      dispatch(
        updateUserandAdmin({ userId: user._id, updatedUserData: updatedUser })
      );
      notification.success({
        message: "Success",
        description: "User role updated to Admin successfully!",
      });
    } else {
      notification.error({
        message: "Error",
        description: "You do not have permission to change user roles.",
      });
    }
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mb-24 mt-12">
        <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
          <div></div>
          <label htmlFor="table-search" className="sr-only">
            Search
          </label>
          <div className="relative pt-4">
            <div className="mt-4  absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="table-search-users"
              className="mr-4 block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for users"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Gmail
              </th>
              <th scope="col" className="px-6 py-3">
                Admin Status
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="text-[14px] bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <th
                  scope="row"
                  className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {/* <img className="w-10 h-10 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Jese image"/> */}
                  <div className="ps-3">
                    <div className="text-base font-semibold text-violet-500">
                      {user.username.toUpperCase()}
                    </div>
                    <div className="font-normal text-amber-300">
                      {user.email}
                    </div>
                  </div>
                </th>
                <td className="px-6 py-4 text-fuchsia-500">{user.email}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <label className="inline-flex items-center me-5 cursor-pointer ps-6">
                      <label className="themeSwitcherTwo shadow-card relative inline-flex cursor-pointer select-none items-center justify-center rounded-md darK:bg-white p-1 bg-gray-200">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={user.isAdmin}
                          onChange={() => handleToggleIsAdmin(user)}
                        />
                        <span
                          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium 
          ${user.isAdmin ? "text-slate-700" : "bg-red-500 dark:text-white "}
          `}
                        >
                          User
                        </span>
                        <span
                          className={`flex items-center space-x-[6px] rounded py-2 px-[18px] text-sm font-medium ${
                            user.isAdmin
                              ? " bg-green-500 dark:text-white"
                              : "dark:text-slate-700"
                          }`}
                        >
                          Admin
                        </span>
                      </label>
                    </label>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => {
                      if (userInfo.isAdmin) {
                        dispatch(deleteUserandAdmin({ userId: user._id }));
                        notification.success({
                          message: "Success",
                          description: "User role updated successfully!",
                        });
                      } else {
                        // Error notification
                        notification.error({
                          message: "Error",
                          description:
                            "You do not have permission to change user roles.",
                        });
                      }
                    }}
                    type="button"
                    className="flex  gap-1 text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
                  >
                    <MdAutoDelete className="w-5 h-5 mt-1" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminEdit;
