import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [displayName, setDisplayName] = useState("USER"); // Default name

  useEffect(() => {
    // ✅ FIX: Parameter ka naam 'user' hona chahiye, kyunki humne wahi bheja hai
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user"); 
    
    if (user) {
      setDisplayName(user);
    }
  }, []);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  return (
    <div className="menu-container">
      {/* Zerodha jaisa logo width thodi badi kar sakte ho */}
      <img src="logo.png" style={{ width: "30px", marginRight: "20px" }} alt="Logo" />
      
      <div className="menus">
        <ul>
          <li>
            <Link style={{ textDecoration: "none" }} to="/" onClick={() => handleMenuClick(0)}>
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>Dashboard</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/orders" onClick={() => handleMenuClick(1)}>
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>Orders</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/holdings" onClick={() => handleMenuClick(2)}>
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>Holdings</p>
            </Link>
          </li>
          <li>
            <Link style={{ textDecoration: "none" }} to="/positions" onClick={() => handleMenuClick(3)}>
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>Positions</p>
            </Link>
          </li>
        </ul>
        <hr />
        
        {/* Profile Section */}
        <div className="profile" onClick={handleProfileClick} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
          <div className="avatar" style={{ 
            backgroundColor: "#387ed1", 
            color: "white", 
            borderRadius: "50%", 
            width: "30px", 
            height: "30px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "14px"
          }}>
            {/* Pehla akshar display karega */}
            {displayName.charAt(0).toUpperCase()}
          </div>
          <p className="username" style={{ margin: 0, fontWeight: "500", fontSize: "14px", color: "#424242" }}>
            {displayName.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;