import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom/dist";
import '../headerfile/nav.css';
import { motion, useScroll } from "framer-motion";

//HEROICONS-> ICONS
import {
  Bars3Icon, XMarkIcon, HomeIcon, IdentificationIcon, ClipboardDocumentListIcon,
  SunIcon, MoonIcon, ComputerDesktopIcon, LockClosedIcon
} from '@heroicons/react/24/outline';

//IMAGE AND VIDEO
// import img1 from '../myimgs/jeeva logo.webp';
// import { Select } from "flowbite-react";

function Header() {

  const { scrollYProgress } = useScroll();
  //OPEN CLOSE ICON 
  const [icon, seticon] = useState(true)
  const handleclick = () => {
    seticon(!icon)
  }
  const CloseSideDrawer = () => {
    seticon(true);
  }
  // DARK MODE FUNCTION
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  );
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme:dark)");


  // console.log(darkQuery, "darkQuery");

  const options = [
    {
      icon: <SunIcon />,
      text: "light",
    },
    {
      icon: <MoonIcon />,
      text: "dark"
    },
    {
      icon: <ComputerDesktopIcon />,
      text: "system"
    }
  ];
  function onWindowMatch() {
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
    }
  }
  onWindowMatch();

  useEffect(() => {

    switch (theme) {
      case "dark":
        element.classList.add("dark");

        localStorage.setItem("theme", "dark");
        break;

      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;

      default:
        localStorage.removeItem("theme");
        onWindowMatch();
        break;
    }
  }, [theme]);

  darkQuery.addEventListener("change", (e) => {
    if (!("theme" in localStorage)) {
      if (e.matches) {
        element.classList.add("dark");
      }
      else {
        element.classList.remove("dark");
      }
    }
  });

  return (
    <>

      <header className="sticky top-0 z-10 text-white   ">
        <nav className="bg-gray-700  dark:bg-gray-900 md:h-13 ">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between  mx-auto p-3">

            <a href="/pnf" className="flex items-center">
              {/* <img src={img1} className="h-9 w-9 mr-3 rounded-full dark:ring-1 ring-offset-2  dark:ring-sky-400 ring-1 ring-sky-400" alt="Flowbite Logo" /> */}
              {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Sivabalan M</span> */}
            </a>

            <div className="flex items-center ">
              {/* DARK MODE ICON */}
              <div className=" dark:text-slate-300  md:mr-6 mx:7 md:space-x-3 space-x-2 ">
                {
                  options?.map(opt => (
                    <button key={opt.text}
                      onClick={() => setTheme(opt.text)}
                      className={`w-7 h-7  leading-9 text-xl rounded-full    ${theme === opt.text && "text-sky-400"}`}>
                      {opt.icon}
                    </button>
                  ))
                }
              </div>

              {/* HUMBERGER BUTTON */}
              <button data-collapse-toggle="mobile-menu-2" type="button" className=" p-0 inline-flex items-center px-2 py-1 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false" onClick={handleclick}>
                {
                  icon ? <Bars3Icon className="text-white w-8 h-8" /> : <XMarkIcon className="text-white w-7 h-7" />
                }
              </button>
            </div>

            <div className={icon ? " hidden md:block h-full" : " w-full md:flex md:w-auto md:order-1 items-center justify-between "} id="mobile-menu-2">
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border   md:flex-row md:space-x-8 md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li className="active"  >
                      <NavLink onClick={CloseSideDrawer} exact="true" to="/" className=" md:hover:text-sky-400 text-lg font-bold py-2 pl-3 pr-4 text-white md:p-0  flex items-center gap-1 md:dark:hover:bg-transparent rounded dark:hover:bg-gray-700 d" aria-current="page">
                      <HomeIcon className="active1  w-6 h-6" /> Home</NavLink>
                  </li>
                  <li className="active" >
                      <NavLink onClick={CloseSideDrawer} to="/" className=" text-lg font-bold py-2 pl-3 pr-4  rounded  md:hover:bg-transparent md:hover:text-sky-400 md:p-0 text-white md:dark:hover:text-sky-400 dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700 flex items-center gap-1">
                     <IdentificationIcon className=" w-6 h-6" />About</NavLink>
                  </li>
                  <li className="active" >
                      <NavLink onClick={CloseSideDrawer} to="/" className="text-lg font-bold py-2 pl-3 pr-4  rounded  md:hover:bg-transparent md:hover:text-sky-400 md:p-0 text-white md:dark:hover:text-sky-400 dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700 flex items-center gap-1">
                      <ClipboardDocumentListIcon className=" w-6 h-6" />Details</NavLink>
                  </li>
                 <li className="active">
                   <NavLink onClick={CloseSideDrawer} to="/loginpage" className="text-lg font-bold py-2 pl-3 pr-4  rounded  md:hover:bg-transparent md:hover:text-sky-400 md:p-0 text-white md:dark:hover:text-sky-400 dark:hover:bg-gray-700  md:dark:hover:bg-transparent dark:border-gray-700 flex items-center gap-1">
                     <LockClosedIcon className=" w-6 h-6 " />Login</NavLink>
                  </li>
               </ul>
              </div>
                
          </div>
          <motion.div className="progress-bar " style={{ scaleX: scrollYProgress }} />
        </nav>

      </header>

    </>
  );
}
export default Header;