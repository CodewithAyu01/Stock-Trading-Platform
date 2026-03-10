import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// NOTE: Import line ko hata diya hai kyunki hum direct public path use karenge

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    // Port 5000 check kar lena, backend chalu hona chahiye
    axios.get("http://localhost:5000/allOrders") 
      .then((res) => {
        setAllOrders(res.data);
      })
      .catch((err) => console.log("Error fetching orders:", err));
  }, []);

  return (
    <div className="orders-container p-4">
      <h3 className="title mb-4" style={{ fontSize: "18px", fontWeight: "600", color: "#444" }}>
        Orders ({allOrders.length})
      </h3>

      {allOrders.length > 0 ? (
        <div className="table-responsive shadow-sm bg-white rounded">
          <table className="table align-middle">
            <thead>
              <tr style={{ backgroundColor: "#fbfbfb" }}>
                <th className="text-muted fw-normal small">Time</th>
                <th className="text-muted fw-normal small">Type</th>
                <th className="text-muted fw-normal small">Instrument</th>
                <th className="text-muted fw-normal small">Qty.</th>
                <th className="text-muted fw-normal small">Price</th>
                <th className="text-muted fw-normal small">Status</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.map((order, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #f4f4f4" }}>
                  <td className="text-muted" style={{ fontSize: "12px" }}>
                    {new Date().toLocaleTimeString()}
                  </td>
                  <td>
                    <span className={`badge ${order.mode === "BUY" ? "text-primary" : "text-danger"}`} 
                          style={{ 
                            backgroundColor: order.mode === "BUY" ? "#e3f2fd" : "#ffebee",
                            fontSize: "11px"
                          }}>
                      {order.mode}
                    </span>
                  </td>
                  <td className="fw-bold" style={{ color: "#444" }}>{order.name}</td>
                  <td>{order.qty}</td>
                  <td>{order.price ? order.price.toFixed(2) : "0.00"}</td>
                  <td>
                    <span className="text-success fw-medium" style={{ fontSize: "12px" }}>
                      COMPLETE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-orders text-center mt-5 p-5 border-0">
          {/* SAHI RASTA: / laga kar direct public folder se access karein */}
          <img 
            src="/Assets/no-orders.png" 
            alt="No Orders" 
            style={{ width: "120px", marginBottom: "20px", opacity: "0.8" }} 
          />
          <p className="text-muted mb-4" style={{ fontSize: "14px" }}>
            You haven't placed any orders today
          </p>
          <Link to={"/"} className="btn btn-primary px-4" style={{ backgroundColor: "#387ed1", border: "none" }}>
            Get started
          </Link>
        </div>
      )}
    </div>
  );
};

export default Orders;