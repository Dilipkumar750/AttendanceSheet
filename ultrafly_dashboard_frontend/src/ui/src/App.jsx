// import logo from './logo.svg';
// import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ExcellData } from "./components/excelTable";
// const Excell = lazy(()=> import ('./ui/src/components/excelTable'))
import { Suspense } from "react";
import { useEffect ,lazy} from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function ExcellApp() {
  return (
    
      <Routes>
        <Route path="/excel" element={<ExcellData />} />
      </Routes>
  );
}

export default ExcellApp;
