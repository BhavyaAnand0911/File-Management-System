import { ReactComponentElement, useEffect } from "react";
import Sidebar from "./sidebar.jsx";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    // If the access token is not present, redirect to the login page
    if (!accessToken) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="bg-gray-600">
      <Sidebar />
    </div>
  );
};

export default Home;
