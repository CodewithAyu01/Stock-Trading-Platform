import React from "react";

const Summary = () => {
  // Login ke waqt jo username save kiya tha, use nikalna
  const username = localStorage.getItem("username") || "User";

  return (
    <>
      <div className="username">
        {/* Ab yahan real login user ka naam dikhega */}
        <h6>Hi, {username}!</h6> 
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            {/* Maan lijiye default margin 1 Lakh hai */}
            <h3>100.0k</h3>
            <p>Margin available</p>
          </div>
          <hr />

          <div className="second">
            <p>Margins used <span>0</span></p>
            <p>Opening balance <span>100.0k</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings (13)</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className="profit">
              1.55k <small>+5.20%</small>
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>Current Value <span>31.43k</span></p>
            <p>Investment <span>29.88k</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;