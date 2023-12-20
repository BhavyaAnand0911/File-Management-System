import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ErrorBox = ({ message }) => {
  return (
    <div className="bg-red-500 text-white p-4 fixed bottom-0 left-0 right-0 text-center">
      {message}
    </div>
  );
};

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:6500/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        // Handle storing tokens or redirecting to the next page
        navigate("/login");
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
        console.error("Registration failed:", errorMessage);
        // You can choose to handle error state here, show a message to the user, etc.
      }
    } catch (error) {
      setError("An unexpected error occurred during registration.");
      console.error("Error during registration:", error);
      // You can choose to handle error state here, show a message to the user, etc.
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

          {/* Render the error box conditionally */}
          {error && <ErrorBox message={error} />}

          {/* Button and Forgot Password link */}
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-[15rem] py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleRegister}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
