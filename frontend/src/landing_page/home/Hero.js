import React from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const token = sessionStorage.getItem("token");
  const username = sessionStorage.getItem("username"); 
  const navigate = useNavigate();

  const handleDashboardClick = (e) => {
    e.preventDefault();
    // ✅ Redirecting to YOUR Dashboard Service with Username
    if (username) {
      window.location.href = `https://stock-trading-platform2.onrender.com/?user=${username}`;
    } else {
      window.location.href = "https://stock-trading-platform2.onrender.com/";
    }
  };

  return (
    <div className="container p-5 mb-5 mt-5 text-center">
      <img src="media/images/homeHero.png" alt="Hero" className="mb-5 img-fluid" style={{ width: "70%" }} />
      <h1 className="mt-5" style={{ color: "#424242", fontWeight: "500" }}>Invest in everything</h1>
      <p className="fs-4 mb-5 text-muted">Online platform to invest in stocks, derivatives, and more.</p>
      
      {token ? (
        <button onClick={handleDashboardClick} className="btn btn-primary fs-5" style={{ backgroundColor: "#387ed1", padding: "12px 50px" }}>
          Go to Dashboard
        </button>
      ) : (
        <button onClick={() => navigate("/signup")} className="btn btn-primary fs-5" style={{ backgroundColor: "#387ed1", padding: "12px 50px" }}>
          Sign up now
        </button>
      )}
    </div>
  );
}

export default Hero;