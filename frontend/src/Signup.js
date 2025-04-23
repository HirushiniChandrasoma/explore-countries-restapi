import { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    MobileNumber: "",
    Email: "",
    Password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const transformedData = {
        first_name: formData.FirstName,
        last_name: formData.LastName,
        mobile_number: formData.MobileNumber,
        email: formData.Email,
        password: formData.Password,
      };

      await axios.post("http://localhost:5001/api/auth/register", transformedData);
      alert("User registered successfully!");
      navigate("/login");
    } catch (error) {
      const errorMessage = error.response?.data?.error || "An unexpected error occurred.";
      alert(`Error during registration: ${errorMessage}`);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <div className="signup-header">
          <h1>Sign Up</h1>
          <p>Create your account to explore the world</p>
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="form-rowS">
            <div className="form-groupS">
              <label className="labelS" htmlFor="FirstName">First Name</label>
              <input
                className="inputS"
                type="text"
                id="FirstName"
                name="FirstName"
                placeholder="Enter your first name"
                value={formData.FirstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-groupS">
              <label className="labelS" htmlFor="LastName">Last Name</label>
              <input
                className="inputS"
                type="text"
                id="LastName"
                name="LastName"
                placeholder="Enter your last name"
                value={formData.LastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-groupS">
            <label className="labelS" htmlFor="MobileNumber">Mobile Number</label>
            <input
              className="inputS"
              type="tel"
              id="MobileNumber"
              name="MobileNumber"
              placeholder="Enter your mobile number"
              value={formData.MobileNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-groupS">
            <label className="labelS" htmlFor="Email">Email</label>
            <input
              className="inputS"
              type="email"
              id="Email"
              name="Email"
              placeholder="Enter your email address"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-groupS">
            <label className="labelS" htmlFor="Password">Password</label>
            <input
              className="inputS"
              type="password"
              id="Password"
              name="Password"
              placeholder="Create a password"
              value={formData.Password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-button">Sign Up</button>
        </form>

        <div className="login-link">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="login-link">Log In</Link>
          </p>
        </div>
      </div>

      <div className="signup-image">
        <div className="benefits">
          <h2>Why Join Us?</h2>
          <ul>
            <li>Explore countries, cultures, and traditions around the world</li>
            <li>Discover languages spoken in different regions</li>
            <li>Learn about continents and their uniqueness</li>
            <li>Stay curious, travel digitally, and grow your global knowledge</li>
          </ul>
        </div>
        {/* Optional: Add an image related to global exploration here */}
      </div>
    </div>
  );
}

export default SignUp;
