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
      const response = await axios.post("https://stock-tradingplatform.onrender.com/login", { 
        email, 
        password 
      });

      if (response.data.success) {
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("username", response.data.username);

        Swal.fire({
          title: "Login Successful!",
          text: "Welcome back!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          // ✅ Redirecting to YOUR Frontend Homepage
          window.location.href = "https://stock-trading-platform-49y0.onrender.com/";
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid credentials",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mt-5">
      <div className="row p-5 justify-content-center align-items-center">
        <div className="col-lg-6 col-md-12 text-center mb-5">
          <img src="media/images/signup.png" alt="Login" style={{ width: "80%" }} />
        </div>
        <div className="col-lg-4 col-md-12 p-5 border rounded shadow-sm bg-white">
          <h3 className="text-center mb-4" style={{ color: "#424242" }}>Login to Kite</h3>
          <form onSubmit={handleLogin}>
            <input type="email" className="form-control p-3 mb-3" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} required />
            <div className="input-group mb-4">
              <input type={showPassword ? "text" : "password"} className="form-control p-3" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required />
              <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <i className="fa fa-eye-slash"></i> : <i className="fa fa-eye"></i>}
              </button>
            </div>
            <button className="btn btn-primary w-100 p-2 fs-5" style={{ backgroundColor: "#387ed1", border: "none" }}>Login</button>
          </form>
          <p className="text-center mt-4">Don't have an account? <Link to="/signup">Signup</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Login;