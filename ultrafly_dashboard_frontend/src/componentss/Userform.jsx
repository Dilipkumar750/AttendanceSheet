import React, { useEffect, useRef } from "react";
// import user from "./myimgs/register.webp";
import MySwal from "sweetalert2";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { basicSchema } from "./schemas/index";
import "./error.css";
import lottie from "lottie-web";
import panda from "./videos/panda.json";
import { useDispatch } from "react-redux";
import { saveProjectOrder } from "../store/projectstores/projectSlice";

function Userform() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = async (values, action) => {
    dispatch(
     saveProjectOrder({
        username: values.username,
        userphone: values.userphone,
        useremail: values.useremail,
        userdate: values.userdate,
        usertime: values.usertime,
        useraddres: values.useraddres,
      })
    ).unwrap();
    action.resetForm();
  };
  useEffect(() => {
    if (localStorage.getItem("userInfo")) navigate("/Admindashboard");
  });
  const {
    values,
    handleBlur,
    handleChange,
    errors,
    handleSubmit,
    touched,
    isSubmitting,
  } = useFormik({
    initialValues: {
      username: "",
      useremail: "",
      userphone: "",
      useraddres: "",
      userdate: "",
      usertime: "",
    },
    // validationSchema: basicSchema,
    onSubmit,
  });
  // console.log(errors)
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: panda,
    });
  }, []);

  return (
    <>
      <section className="h-full bg-white dark:bg-slate-900  duration-300">
        <div className="h-full">
          {/* <!-- Left column container with background--> */}
          <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
            <div className=" shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12 overflow-hidden">
              <div
                ref={container}
                className="w-full h-screen overflow-hidden"
              ></div>
            </div>
            {/* <!-- Right column container --> */}
            <div className="mb-12 md:mb-0 w-full md:w-3/5 lg:w-5/12 xl:w-5/12">
              <div className="border border-sky-400 block max-w-md rounded-lg bg-slate-500  p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-slate-700">
                <form
                  onSubmit={handleSubmit}
                  action="http://localhost:8001/form"
                  method="POST"
                >
                  <div className="relative mb-6">
                    <label
                      htmlFor="Name"
                      className="block mb-2 text-sm font-medium  dark:text-white text-white"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="username"
                      className={
                        errors.username && touched.username
                          ? "input-error px-4 py-2 block bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 border-2 w-full border-gray-300  focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                          : "px-4 py-2 block bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 border-2 w-full border-gray-300  focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                      placeholder="Enter Name"
                      autoComplete="off"
                    />
                    {errors.username && touched.username && (
                      <span className="text-red-500 py-1 pb-1">
                        {errors.username}
                      </span>
                    )}
                  </div>

                  <div className="relative mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="useremail"
                      className={
                        errors.useremail && touched.useremail
                          ? "input-error px-4 py-2 block bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 border-2 w-full border-gray-300  focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                          : "px-4 py-2 block bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 border-2 w-full border-gray-300  focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                      }
                      placeholder="Email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.useremail}
                      autoComplete="off"
                    />
                    {errors.useremail && touched.useremail && (
                      <span className="text-red-500 py-1 pb-1">
                        {errors.useremail}
                      </span>
                    )}
                  </div>
                  <div className="relative mb-6">
                    <label
                      htmlFor="phone"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      phone
                    </label>
                    <input
                      id="phone"
                      type="number"
                      name="userphone"
                      className={
                        errors.userphone && touched.userphone
                          ? "input-error px-4 py-2 block bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 border-2 w-full border-gray-300  focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                          : "px-4 py-2 block bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 border-2 w-full border-gray-300  focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                      }
                      placeholder="Phone"
                      autoComplete="off"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.userphone}
                    />
                    {errors.userphone && touched.userphone && (
                      <span className="text-red-500 py-1 pb-1">
                        {errors.userphone}
                      </span>
                    )}
                  </div>
                  <div className="relative mb-6">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Addres
                    </label>
                    <input
                      type="text"
                      name="useraddres"
                      className={
                        errors.useraddres && touched.useraddres
                          ? "input-error px-4 py-2 block bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 border-2 w-full border-gray-300  focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                          : "px-4 py-2 block bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 border-2 w-full border-gray-300  focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                      }
                      placeholder="Address"
                      autoComplete="off"
                      id="address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.useraddres}
                    />
                    {errors.useraddres && touched.useraddres && (
                      <span className="text-red-500 py-1 pb-1">
                        {errors.useraddres}
                      </span>
                    )}
                  </div>
                  <div className=" mb-6 flex flex-col  gap-2">
                    <label
                      htmlFor="date"
                      className=" mb-2 text-sm font-medium text-white dark:text-white"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      name="userdate"
                      className={
                        errors.userdate && touched.userdate
                          ? "input-error px-4 py-2 block bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 border-2 w-full border-gray-300  focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                          : "px-4 py-2 block bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 border-2 w-full border-gray-300  focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                      }
                      onChange={handleChange}
                      id="date"
                      onBlur={handleBlur}
                      value={values.userdate}
                    />
                    {errors.userdate && touched.userdate && (
                      <span className="text-red-500 py-1 pb-1">
                        {errors.userdate}
                      </span>
                    )}
                    <div className="flex flex-col">
                      <label
                        htmlFor="time"
                        className=" mb-2 text-sm font-medium text-white dark:text-white"
                      >
                        Time
                      </label>
                      <input
                        type="time"
                        name="usertime"
                        className={
                          errors.usertime && touched.usertime
                            ? "input-error px-4 py-2 block bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 border-2 w-full border-gray-300  focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                            : "px-4 py-2 block bg-gray-50 text-gray-900 sm:text-sm rounded-lg focus:ring-sky-400 focus:border-sky-400 border-2 w-full border-gray-300  focus:outline-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white"
                        }
                        id="time"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.usertime}
                      />
                      {errors.usertime && touched.usertime && (
                        <span className="text-red-500 py-1 pb-1">
                          {errors.usertime}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full px-5 py-2.5 relative rounded group font-medium text-white  inline-block"
                  >
                    <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-indigo-400 to-blue-500"></span>
                    <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
                    <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-indigo-600 from-blue-500"></span>
                    <span className="relative">Submits</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Userform;
