import React, { useContext } from 'react';
import { LoginContext } from './landing_page/signup/LoginContext';
import Homepage from './landing_page/home/Homepage';
import LoginPopUp from './landing_page/signup/LoginPopUp';
import AboutPage from './landing_page/about/AboutPage';
import Product from './landing_page/products/ProductPage';
import Pricing from './landing_page/pricing/PricingPage';
import Support from './landing_page/support/SupportPage';

import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';

const App = () => {
  const { showLogin, setShowLogin } = useContext(LoginContext); // Access showLogin and setShowLogin from context
  const navigate = useNavigate(); // For navigation

  // Close the popup and optionally redirect to a specific path
  const handleClosePopup = () => {
    setShowLogin(false); // Close the popup
    navigate('/'); // Redirect to homepage
  };

  // Redirect to Dashboard after successful login
  const handleLoginSuccess = () => {
    setShowLogin(false); // Close the popup
    const token = localStorage.getItem('token'); // Check if token exists
    if (token) {
      window.open('https://harmonious-semifreddo-d7df07.netlify.app/', '_blank'); // Open Dashboard in a new tab
    } else {
      alert('You must be logged in to access the Dashboard.');
    }
  };

  return (
    <>
      <Navbar />
      {showLogin && <LoginPopUp onClose={handleClosePopup} onLoginSuccess={handleLoginSuccess} />} {/* Pass onLoginSuccess */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/support" element={<Support />} />
        <Route path="/signup" element={<LoginPopUp onClose={handleClosePopup} onLoginSuccess={handleLoginSuccess} />} /> {/* Show popup on /signup */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;