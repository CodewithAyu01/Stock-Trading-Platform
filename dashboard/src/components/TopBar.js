import React, { useState, useEffect } from "react";
import Menu from "./Menu";

const TopBar = () => {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // URL se 'user' parameter nikalna
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");
    if (user) {
      setUserName(user);
    }
  }, []);

  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
      </div>

      {/* ✅ Humne userName ko Menu mein bhej diya */}
      <Menu userName={userName} />
    </div>
  );
};

export default TopBar;