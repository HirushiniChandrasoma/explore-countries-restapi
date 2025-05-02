import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import login from "../src/images/login.jpg";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5002/auth/login", form);
      alert("Login successful! Welcome " + res.data.auth.name);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error during login");
    }
  };

  return (
    <div
      className="h-screen w-full bg-center bg-no-repeat flex items-center justify-start "
      style={{
        backgroundImage: `url(${login})`,
        backgroundSize: "cover", 
      }}
    >
      <div className="h-full w-2/5 min-h-screen backdrop-blur-md bg-black bg-opacity-80 p-10 text-white shadow-2xl flex flex-col justify-center">
        <div className="bg-white bg-opacity-20 p-10 rounded-xl shadow-inner">
          <h2 className="text-4xl font-bold mb-6 text-white">Welcome back!</h2>
          <p className="mb-10 text-lg text-gray-300">Please login to your account</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="email"
              placeholder="Email"
              className="px-5 py-4 text-lg rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="px-5 py-4 text-lg rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-900 text-white font-bold text-lg py-4 rounded mt-4"
            >
              Login
            </button>
          </form>

          <div className="mt-10 text-md text-gray-300">
            Don’t have an account?{" "}
            <span
              className="text-blue-500 font-bold hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Sign up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
