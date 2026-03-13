import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import GeneralContext from "./GeneralContext";
import BuyActionWindow from "./BuyActionWindow";

const Summary = () => {
  const [displayName, setDisplayName] = useState("User");
  const [holdings, setHoldings] = useState([]);
  const { isBuyWindowOpen, selectedStockUID } = useContext(GeneralContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const user = params.get("user");
    if (user) setDisplayName(user);

    axios.get("https://stock-tradingplatform.onrender.com/allHoldings").then((res) => {
      setHoldings(res.data);
    });
  }, []);

  const totalInvestment = holdings.reduce((sum, s) => sum + (s.avg * s.qty), 0);
  const currentValue = holdings.reduce((sum, s) => sum + (s.price * s.qty), 0);

  return (
    <>
      <div className="username">
        <h6>Hi, {displayName}!</h6>
        <hr className="divider" />
      </div>
      <div className="section">
        <span><p>Equity</p></span>
        <div className="data">
          <div className="first">
            <h3>3.74k</h3>
            <p>Margin available</p>
          </div>
          <hr />
          <div className="second">
            <p>Margins used <span>0</span></p>
            <p>Opening balance <span>3.74k</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>
      <div className="section">
        <span><p>Holdings ({holdings.length})</p></span>
        <div className="data">
          <div className="first">
            <h3 className={currentValue - totalInvestment >= 0 ? "profit" : "loss"}>
              {(currentValue - totalInvestment).toFixed(2)}
            </h3>
            <p>P&L</p>
          </div>
          <hr />
          <div className="second">
            <p>Current Value <span>{currentValue.toFixed(2)}</span></p>
            <p>Investment <span>{totalInvestment.toFixed(2)}</span></p>
          </div>
        </div>
        <hr className="divider" />
      </div>
      {isBuyWindowOpen && <BuyActionWindow uid={selectedStockUID} mode="BUY" />}
    </>
  );
};

export default Summary;