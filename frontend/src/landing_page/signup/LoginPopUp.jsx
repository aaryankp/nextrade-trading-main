import React, { useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../../assets/assets';
import axios from 'axios';

const LoginPopUp = ({ onClose,onLoginSuccess  }) => { // Accept onClose as a prop
  const [currState, setCurrState] = useState('Login');
  const [token, setToken] = useState('');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = 'https://nex-trade-backend.onrender.com';
    if (currState === 'Login') {
      newUrl += '/api/user/login';
    } else {
      newUrl += '/api/user/register';
    }

    const response = await axios.post(newUrl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
      onLoginSuccess() // Close popup on success
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={onClose} // Close popup on cross button click
            src={assets.cross_icon}
            alt="cross icon"
          />
        </div>
        <div className="login-popup-inputs">
          {currState === 'Login' ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangehandler}
              value={data.name}
              type="text"
              placeholder="Your name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangehandler}
            value={data.email}
            type="email"
            placeholder="Your email"
            required
          />
          <input
            name="password"
            onChange={onChangehandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{currState === 'Sign Up' ? 'Create Account' : 'Login'}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === 'Login' ? (
          <p>
            Create a new account?
            <span onClick={() => setCurrState('Sign Up')}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?
            <span onClick={() => setCurrState('Login')}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;