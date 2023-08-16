import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

import { topbarProps } from "@/shared/types";
import { archiveIcon, icon, speechIcon } from "@/utilities/svg/svg";

const Rightbar = ({ isResp, setIsResp }: topbarProps) => {
  const [currentPage, setCurrentPage] = useState<string>("");
  const rightbarRef = useRef<HTMLDivElement>(null);

  // set current page for rightbar links
  useEffect(() => {
    const url = window.location.href;

    if (url.includes("archive")) {
      setCurrentPage("archive");
    } else {
      setCurrentPage("home");
    }
  }, []);

  // close rightbar in responsive
  useEffect(() => {
    const mouseHandler = (event: MouseEvent) => {
      if (
        rightbarRef.current &&
        setIsResp &&
        !rightbarRef.current.contains(event.target as Node)
      ) {
        setIsResp(false);
      }
    };
    document.addEventListener("mousedown", mouseHandler);

    return () => {
      document.removeEventListener("mousedown", mouseHandler);
    };
  }, [setIsResp]);

  return (
    <div
      className={`rightbar ${isResp && "change-rightbar"}`}
      ref={rightbarRef}>
      {/* rightbar background image */}
      <div className='rightbar-hover'></div>
      {/* rightbar top */}
      <div className='rightbar-top'>
        <span className='rightbar-top-text'>آوا</span>
        {/* icon svg */}
        {icon}
      </div>
      {/* rightbar bottom */}
      <div className='rightbar-bottom'>
        {/* link to homepage */}
        <Link to='/' style={{ textDecoration: "none", color: "inherit" }}>
          <div
            className={`rightbar-bottom-speech ${
              currentPage === "home" && "active-tab"
            }`}>
            <span className='rb-speech-text'>تبدیل گفتار</span>
            {/* speech icon */}
            {speechIcon}
          </div>
        </Link>
        {/* link to archive page */}
        <Link
          to='/archive'
          style={{ textDecoration: "none", color: "inherit" }}>
          <div
            className={`rightbar-bottom-archive ${
              currentPage === "archive" && "active-tab"
            }`}>
            <span className='rb-archive-text'>آرشیو</span>
            {/* archive icon */}
            {archiveIcon}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Rightbar;
