import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import panda from "./videos/error.json";

function PageNotfound() {
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
  useEffect(() => {
    // 👇️ scroll to top on page load
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <section className=" ">
        <div
          className="dark:bg-white container w-full h-screen overflow-hidden"
          ref={container}
        ></div>
        <button>BACK</button>
      </section>
    </>
  );
}
export default PageNotfound;