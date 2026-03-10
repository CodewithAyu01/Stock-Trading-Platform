import React, { useState, useEffect } from "react";
import axios from "axios";
import { VerticalGraph } from "../charts/VerticalGraph";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);

  // Backend se holdings fetch karna
  useEffect(() => {
    axios.get("http://localhost:3002/allHoldings")
      .then((res) => {
        setAllHoldings(res.data);
      })
      .catch((err) => console.log("Error fetching holdings:", err));
  }, []);

  // Professional Calculations
  const totalInvestment = allHoldings.reduce((acc, stock) => acc + (stock.avg * stock.qty), 0);
  const currentValue = allHoldings.reduce((acc, stock) => acc + (stock.price * stock.qty), 0);
  const totalPnL = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (totalPnL / totalInvestment) * 100 : 0;

  return (
    <div className="holdings-container p-4">
      <h3 className="title mb-4" style={{ fontSize: "18px", fontWeight: "600", color: "#444" }}>
        Holdings ({allHoldings.length})
      </h3>

      <div className="order-table shadow-sm bg-white rounded">
        <table className="table custom-table">
          <thead>
            <tr style={{ backgroundColor: "#fbfbfb", borderBottom: "1px solid #eee" }}>
              <th className="text-muted">Instrument</th>
              <th className="text-muted">Qty.</th>
              <th className="text-muted">Avg. cost</th>
              <th className="text-muted">LTP</th>
              <th className="text-muted">Cur. val</th>
              <th className="text-muted">P&L</th>
              <th className="text-muted">Net chg.</th>
            </tr>
          </thead>
          <tbody>
            {allHoldings.map((stock, index) => {
              const investment = stock.avg * stock.qty;
              const curValue = stock.price * stock.qty;
              const isProfit = (curValue - investment) >= 0;
              const netChange = ((curValue - investment) / investment) * 100;

              return (
                <tr key={index} style={{ borderBottom: "1px solid #f4f4f4" }}>
                  <td style={{ fontWeight: "500", color: "#444" }}>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>
                  <td>{stock.price.toFixed(2)}</td>
                  <td>{curValue.toFixed(2)}</td>
                  <td style={{ color: isProfit ? "#4caf50" : "#ff5722", fontWeight: "500" }}>
                    {(curValue - investment).toFixed(2)}
                  </td>
                  <td style={{ color: isProfit ? "#4caf50" : "#ff5722" }}>
                    {isProfit ? "+" : ""}{netChange.toFixed(2)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* --- Dashboard Stats Summary --- */}
      <div className="row mt-5 text-center bg-light p-4 rounded shadow-sm mx-1">
        <div className="col-md-4 border-end">
          <h4 style={{ color: "#444" }}>₹{totalInvestment.toLocaleString()}</h4>
          <p className="text-muted mb-0">Total investment</p>
        </div>
        <div className="col-md-4 border-end">
          <h4 style={{ color: "#444" }}>₹{currentValue.toLocaleString()}</h4>
          <p className="text-muted mb-0">Current value</p>
        </div>
        <div className="col-md-4">
          <h4 style={{ color: totalPnL >= 0 ? "#4caf50" : "#ff5722" }}>
            {totalPnL >= 0 ? "+" : ""}{totalPnL.toFixed(2)} 
            <small style={{ fontSize: "14px", marginLeft: "8px" }}>
              ({pnlPercent.toFixed(2)}%)
            </small>
          </h4>
          <p className="text-muted mb-0">Total P&L</p>
        </div>
      </div>

      {/* --- Visual Analysis (Pink Graph) --- */}
      <div className="mt-5 bg-white p-4 rounded shadow-sm mb-5">
        <h5 className="text-muted mb-4 text-center">Portfolio Value Distribution (LTP)</h5>
        <div style={{ height: "300px" }}>
          <VerticalGraph data={{
            labels: allHoldings.map((s) => s.name),
            datasets: [{ 
              label: "Current Price", 
              data: allHoldings.map((s) => s.price), 
              backgroundColor: "rgba(255, 182, 193, 0.7)", 
              borderColor: "rgba(255, 105, 180, 1)", 
              borderWidth: 1,
              borderRadius: 5
            }]
          }} />
        </div>
      </div>
    </div>
  );
};

export default Holdings;