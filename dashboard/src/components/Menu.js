import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [displayName, setDisplayName] = useState("USER");

  useEffect(() => {
    // ✅ FIX: URL Params se username uthana (Cross-link support)
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");
    
    if (user) {
      setDisplayName(user);
      sessionStorage.setItem("username", user); 
    } else {
      const savedUser = sessionStorage.getItem("username");
      if (savedUser) setDisplayName(savedUser);
    }
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    sessionStorage.clear(); 
    // ✅ Redirect back to YOUR Frontend Landing Page
    window.location.href = "https://stock-trading-platform-49y0.onrender.com/"; 
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "30px", marginRight: "20px" }} alt="Logo" />
      <div className="menus">
        <ul>
          <li><Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}><p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}><p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}><p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p></Link></li>
          <li><Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}><p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p></Link></li>
        </ul>
        <hr />
        <div className="profile-wrapper" style={{ position: "relative" }}>
          <div className="profile" onClick={handleProfileClick} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
            <div className="avatar" style={{ backgroundColor: "#387ed1", color: "white", borderRadius: "50%", width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
              {displayName.charAt(0).toUpperCase()}
            </div>
            <p className="username" style={{ margin: 0, fontWeight: "500" }}>{displayName.toUpperCase()}</p>
          </div>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown" style={{ position: "absolute", top: "40px", right: "0", backgroundColor: "white", border: "1px solid #ccc", borderRadius: "4px", boxShadow: "0 2px 10px rgba(0,0,0,0.1)", zIndex: 100, width: "120px" }}>
              <button onClick={handleLogout} style={{ width: "100%", padding: "10px", border: "none", backgroundColor: "transparent", cursor: "pointer", textAlign: "left", color: "#d9534f", fontWeight: "bold" }}>
                <i className="fa fa-sign-out" style={{ marginRight: "8px" }}></i>Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;