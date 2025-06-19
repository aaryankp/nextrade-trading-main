import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

const LoginProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <LoginContext.Provider value={{ showLogin, setShowLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;