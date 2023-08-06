import { useState } from "react";
import { Menu } from "@mui/icons-material";

import { topbarProps } from "@/shared/types";
import { userIcon, logoutIcon } from "@/utilities/svg/svg";

const Topbar = ({ setIsResp }: topbarProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <div className="topbar">
      <div
        className={menuOpen ? "topbar-user change-topbar-user" : "topbar-user"}
      >
        {/* topbar top */}
        <div className="topbar-user-top" onClick={() => setMenuOpen(!menuOpen)}>
          {/* drop icon */}
          <svg
            width="7"
            height="5"
            viewBox="0 0 7 5"
            fill="none"
            className={menuOpen ? "drop-icon" : ""}
          >
            <path
              d="M4.65282 4.12713C4.25404 4.58759 3.53973 4.58759 3.14096 4.12713L1.08888 1.7576C0.528006 1.10995 0.988058 0.102941 1.84481 0.102941L5.94896 0.102942C6.80571 0.102942 7.26577 1.10995 6.70489 1.7576L4.65282 4.12713Z"
              fill="#00BA9F"
            />
          </svg>
          <p className="topbar-user-text">مهمان</p>
          {/* user icon */}
          {userIcon}
        </div>
        {/* line spacing */}
        <div className="hr-line-space"></div>
        {/* topbar bottom */}
        <div className="topbar-user-bottom">
          <p className="topbar-user-logout-text">خروج</p>
          {/* logout icon */}
          {logoutIcon}
        </div>
      </div>
      {/* menu - responsive */}
      <div className="menu" onClick={() => setIsResp && setIsResp(true)}>
        <Menu sx={{ color: "#00ba9f" }} />
      </div>
    </div>
  );
};

export default Topbar;
