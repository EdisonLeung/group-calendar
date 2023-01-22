import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

export const navData = [
  {
    id: 0,
    icon: <HomeIcon />,
    text: "Home",
    link: "/",
  },
  {
    id: 1,
    icon: <TravelExploreIcon />,
    text: "Explore",
    link: "explore",
  },
  {
    id: 2,
    icon: <BarChartIcon />,
    text: "Statistics",
    link: "statistics",
  },
  {
    id: 3,
    icon: <SettingsIcon />,
    text: "Settings",
    link: "settings",
  },
];
export default function Sidenav() {
  return (
    <div className="sidenavClosed">
      <button className="menuBtn">
        <KeyboardDoubleArrowLeftIcon />
      </button>
      {navData.map((item) => {
        return (
          <div key={item.id} className="sideitem">
            {item.icon}
            <span className="linkTextClosed">{item.text}</span>
          </div>
        );
      })}
    </div>
  );
}
