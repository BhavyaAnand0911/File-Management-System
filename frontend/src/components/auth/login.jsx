import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const ErrorBox = ({ message }) => {
    return (
      <div className="bg-red-500 text-white p-4 fixed bottom-0 left-0 right-0 text-center">
        {message}
      </div>
    );
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:6500/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        //console.log("Login successful:", data);
        localStorage.setItem("accessToken", data.accessToken);
        navigate("/home");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        console.error("Login failed:", errorMessage);
      }
    } catch (error) {
      setError("An unexpected error occurred during login.");
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-slate-700">
      <div className="w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* Username field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="Username"
            />
          </div>

          {/* Email field */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="******************"
            />
            <p className="text-red-500 text-xs italic">
              Please enter a password.
            </p>
          </div>

          {error && <ErrorBox message={error} />}

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleLogin}
            >
              Login
            </button>
            <Link to={"/register"}>Click here to register &rarr;</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
