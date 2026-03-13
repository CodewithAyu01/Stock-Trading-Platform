import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Signup() {
  // Password ko bhi formData ke andar hi rakha hai
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/signup", {
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        Swal.fire({
          title: "Account Created!",
          text: `Welcome ${formData.name}! Redirecting to login...`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        }).then(() => navigate("/login"));
      }
    } catch (error) {
      Swal.fire({
        title: "Signup Failed",
        text: error.response?.data?.message || "Server connection failed.",
        icon: "error",
      });
    }
  };

  return (
    <div className="container mt-5 p-5">
      <div className="row align-items-center">
        <div className="col-lg-7">
          <img src="media/images/signup.png" alt="Signup" className="img-fluid" />
        </div>
        <div className="col-lg-5 p-5 border rounded shadow-sm bg-white">
          <h2 className="mb-4">Signup</h2>
          <form onSubmit={handleSignup}>
            <input 
              type="text" 
              placeholder="Full Name" 
              className="form-control mb-3 p-3" 
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              required 
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="form-control mb-3 p-3" 
              onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
              required 
            />
            
            <div className="input-group mb-4">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control p-3"
                placeholder="Password"
                // Yahan formData update ho raha hai
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <button 
                className="btn btn-outline-secondary" 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {/* Ab yahan aankh dikhegi */}
                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
              </button>
            </div>

            <button className="btn btn-primary w-100 p-2 fs-5" style={{ backgroundColor: "#387ed1", border: "none" }}>
              Continue
            </button>
          </form>
          <p className="mt-3 text-center">Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;