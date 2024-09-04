import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./error.css";
import "./styles/loder.css";
import { useSelector, useDispatch } from "react-redux";
import { getProjects } from "../store/projectstores/projectSlice";
import { BASE_URL } from "../store/constant";
import { FaArrowRight } from "react-icons/fa6";
import { Button, Result } from "antd";
import { BsBrowserChrome } from "react-icons/bs";

function Project() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    data: projects,
    loading,
    error,
  } = useSelector((state) => state.projects.getProjects);

  // console.log("hdhfdf",projects.image)
  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="spinnerContainer1">
        <div className="spinner1"></div>
        <div className="loader1">
          <p className="dark:text-white text-slate-800">loading</p>
          <div className="words1">
            <span className="word1">PROJECTS</span>
            <span className="word1">Please Wait</span>
            <span className="word1">Take a minute</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Button type="primary">Back Home</Button>}
      />
    );
  }
  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length <= wordLimit) {
      return description;
    }
    return words.slice(0, wordLimit).join(" ") + "...";
  };
  return (
    <>
      <section className="text-gray-600 body-font dark:bg-gray-900 bg-white pt-6 duration-300 md-mt-32">
        <h1 className="text-2xl sm:text-4xl text-sky-400 text-center py-11 pr-6 font-extrabold underline underline-offset-2  decoration-slate-300  tracking-widest">
          My Project's
        </h1>

        <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project._id}
              className="max-w-sm border border-gray-200 rounded-lg shadow bg-gray-100 dark:bg-gray-800 dark:border-gray-700"
            >
              <Link to={`/project/${project._id}`}>
                <img
                  className="rounded-t-lg"
                  src={BASE_URL + project.image}
                  alt="images"
                  loading="lazy"
                />
              </Link>
              <div className="p-5 cursor-pointer">
                <Link to={`/project/${project._id}`}>
                  <h6 className=" mb-2 text-xl font-bold tracking-tight dark:text-amber-200  ">
                    {project.subtitle}
                  </h6>
                  <h5 className="hover:text-blue-700 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Tittle :{" "}
                    <span className="text-indigo-500">{project.name}</span>
                  </h5>
                </Link>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {truncateDescription(project.description, 50)}{" "}
                  <span className="text-violet-500">Read more</span>
                </p>
                <div className="flex justify-between">
                  <Link to={`/project/${project._id}`}>
                    <button
                      type="button"
                      className="py-2  text-white bg-[#3884f7] hover:bg-[#3884f7]/80 focus:ring-4 focus:outline-none focus:ring-[#3884f7]/50 font-medium rounded-lg text-sm px-5  text-center inline-flex items-center dark:hover:bg-[#3884f7]/80 dark:focus:ring-[#3884f7]/40 me-2 mb-2"
                    >
                      Read more <FaArrowRight className="w-4 h-4 ms-2" />
                    </button>
                  </Link>
                  <Link to={project.livesite} target="blank">
                    <button
                      type="button"
                      className="py-2 mx-2  text-white bg-[#FF9119] hover:bg-[#FF9119]/80 focus:ring-4 focus:outline-none focus:ring-[#FF9119]/50 font-medium rounded-lg text-sm px-5  text-center inline-flex items-center dark:hover:bg-[#FF9119]/80 dark:focus:ring-[#FF9119]/40 me-2 mb-2"
                    >
                      <BsBrowserChrome className="w-5 h-5  mx-2" />
                      Live Site
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default Project;
