import React from "react";
import { Link } from "react-router-dom"; // Link import kiya

function OpenAccount() {
  const token = sessionStorage.getItem("token");

  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <div className="col">
          <h1 className="mt-5" style={{ color: "#424242", fontSize: "2.1rem", fontWeight: "500" }}>
            Open a Zerodha account
          </h1>
          <p className="mt-3 text-muted fs-5">
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and F&O trades.
          </p>
          
          {token ? (
            /* ✅ Dashboard ka link badal kar Render wala kar diya */
            <a 
              href="https://stock-trading-platform2.onrender.com/" 
              className="btn btn-primary fs-5 mt-4" 
              style={{ backgroundColor: "#387ed1", border: "none", padding: "10px 30px", borderRadius: "3px", minWidth: "200px", color: "white", textDecoration: "none", display: "inline-block" }}
            >
              Go to Dashboard
            </a>
          ) : (
            /* ✅ href hata kar 'Link to' use kiya signup ke liye */
            <Link 
              to="/signup" 
              className="btn btn-primary fs-5 mt-4" 
              style={{ backgroundColor: "#387ed1", border: "none", padding: "10px 30px", borderRadius: "3px", minWidth: "200px", color: "white", textDecoration: "none", display: "inline-block" }}
            >
              Sign up for free
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;