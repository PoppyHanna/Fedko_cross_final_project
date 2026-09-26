import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: 'Guest',
    email: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);

  const updateUser = userData => {
    setUser(prevUser => ({
      ...prevUser,
      ...userData,
    }));

    setRegisteredUser(prevUser =>
      prevUser
        ? {
            ...prevUser,
            ...userData,
          }
        : prevUser,
    );
  };

  const signUp = userData => {
    const newUser = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    };

    setRegisteredUser(newUser);

    setUser({
      name: newUser.name,
      email: newUser.email,
    });

    setIsLoggedIn(true);
  };

  const logIn = (email, password) => {
    if (
      registeredUser &&
      registeredUser.email === email &&
      registeredUser.password === password
    ) {
      setUser({
        name: registeredUser.name,
        email: registeredUser.email,
      });

      setIsLoggedIn(true);

      return true;
    }

    return false;
  };

  const logOut = () => {
    setUser({
      name: 'Guest',
      email: '',
    });

    setIsLoggedIn(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        updateUser,
        signUp,
        logIn,
        logOut,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
