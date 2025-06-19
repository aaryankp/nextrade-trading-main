import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LoginContext } from './signup/LoginContext'; // Import LoginContext

const OpenAccount = () => {
  const { setShowLogin } = useContext(LoginContext); // Access setShowLogin from context

  return (
    <div className="container p-5 mb-5">
      <div className="row text-center">
        <h1 className="mt-5">Open account on NexTrade</h1>
        <p>
          Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
          F&O trades.
        </p>
        <Link
          to="/signup"
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto" }}
          onClick={(e) => {
            e.preventDefault(); // Prevent default navigation
            setShowLogin(true); // Show the popup
          }}
        >
          Sign up Now
        </Link>
      </div>
    </div>
  );
};

export default OpenAccount;