import React, { useState, useEffect, createContext } from 'react';
const userContext = createContext();

const userState = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [login, setLogin] = useState(false);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const userName = localStorage.getItem('name');
    setLogin(!!userName); // Sets login to true if userName exists, otherwise false
  }, []);

  return (
    <userContext.Provider value={{ login, setLogin }}>
      {children}
    </userContext.Provider>
  );
};

export default userState;
