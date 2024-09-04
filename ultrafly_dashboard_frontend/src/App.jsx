import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import "./css/style.css";

import "./charts/ChartjsConfig";
import loadimg from "./myimgs/s logo2.webp";
// Import pages

import Headers from "./headerfile/header";
import Foter from "./headerfile/Foterpage";
import AttendancePage from "./componentss/attendance/AttendancePage";
const Login = lazy(() => import("./componentss/Loginform"));


const Pagenotfound = lazy(() => import("./componentss/Pagenotfound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Userform = lazy(() => import("./componentss/Userform"));
const Profile = lazy(() => import("./componentss/Profile"));
const Registerform = lazy(() => import("./componentss/Registerform"));
const AdminEdit = lazy(() => import("./componentss/AdminEditTable"));
const ResumeUploadHr = lazy(() => import("./componentss/ResumeUoloadHr"));
const StatusCards=lazy(()=>import('./componentss/StatusCard'))
const ResumeTable=lazy(()=>import('./componentss/resumespage/ResumeTable'))
const AttendanceSheet=lazy(()=>import('./componentss/attendance/AttendanceSheet'))



function App() {
  const location = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
    
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full h-screen  bg-slate-900">
            {/* <img
              src={loadimg}
              alt="loder"
              className=" transform translate-x-60 w-60 h-60 brightness-110"
              data-aos="fade-left"
            ></img> */}
            <h1>Loading.....</h1>
          </div>
        }
        fallbackMinDurationMs={3000}
      >
        <Routes>
          <Route path="/" element={<Login />} />
        
        

          <Route path="/register" element={<Registerform />} />
          <Route path="/userform" element={<Userform />} />

          {/* Outlet components */}
          <Route path="/Admindashboard" element={<Dashboard />}>
            <Route path="Admin-edit-table" element={<AdminEdit />} />
        
            <Route path="profile" element={<Profile />} />
            <Route path="resume-uploads" element={<ResumeUploadHr />} />
            <Route path="" index="1" element={<StatusCards />} />
            <Route path="resume-table" element={<ResumeTable />} />
            <Route path="attendance" element={<AttendancePage />} />
            <Route path="AttendanceSheet" element={<AttendanceSheet />} />
          </Route>

          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </Suspense>
      {/* {userInfo ? "" : <Foter />} */}
    </>
  );
}

export default App;
