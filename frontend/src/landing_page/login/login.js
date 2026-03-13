import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // ✅ Render Backend URL
      const response = await axios.post("https://stock-tradingplatform.onrender.com/login", { 
        email, 
        password 
      });

      if (response.data.success) {
        // Token aur Username save kar rahe hain
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("username", response.data.username);

        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back! Redirecting to Home...",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          // ✅ FIX: Ab ye Dashboard par nahi jayega.
          // Seedha home page par jayega taaki wahan ke buttons (Go to Dashboard) active ho sakein.
          navigate("/"); 
          
          // Reload zaroori hai taaki Navbar aur baaki components ko pata chale ki login ho gaya hai
          window.location.reload(); 
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid Email or Password or Server Down",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row p-5 justify-content-center align-items-center">
        <div className="col-lg-6 col-md-12 text-center mb-5">
          <img 
            src="media/images/signup.png" 
            alt="Kite Login" 
            style={{ width: "80%" }} 
          />
        </div>

        <div className="col-lg-4 col-md-12 p-5 border rounded shadow-sm bg-white">
          <div className="text-center mb-4">
            <h3 style={{ color: "#424242", fontWeight: "500" }}>Login to Kite</h3>
          </div>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              className="form-control p-3 mb-3"
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <div className="input-group mb-4">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control p-3"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
              </button>
            </div>

            <button className="btn btn-primary w-100 p-2 fs-5" style={{ backgroundColor: "#387ed1", border: "none" }}>
              Login
            </button>
          </form>

          <div className="text-center mt-4">
            <p style={{ fontSize: "14px", color: "#9b9b9b" }}>
              Don't have an account? <Link to="/signup" className="text-decoration-none">Signup now</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;