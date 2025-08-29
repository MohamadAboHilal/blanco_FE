import React, { useEffect } from "react";
import figures from "../assets/Figures.png";
import mainText from "../assets/MainText.png";
import checks from "../assets/Checks.png";
import number from "../assets/number.png";

function Home() {
  return (
    <>
      <div
        id="main-container"
        style={{ boxShadow: "0 0 20px rgba(0,0,0,0.15)" }}
        className="w-auto bg-[#EEF5FF] flex flex-col rounded-[10px] overflow-hidden max-w-auto mx-auto transition-colors duration-300"
      >
        <div className="flex items-center justify-between px-20 mt-8">
          {/* LEFT SIDE */}
          <div className="flex flex-col items-start max-w-xl">
            <img src={mainText} alt="Main Text" className="w-full" />
            <img src={checks} alt="Checks" className="w-full pl-4 pt-10" />
            <img src={number} alt="Number" className="mt-[80px]" />
          </div>
          {/* RIGHT SIDE */}
          <div className="flex-1 flex justify-end items-center">
            <img
              src={figures}
              alt="Figures"
              className="max-h-[80vh] object-contain ml-20"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
