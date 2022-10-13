import React, { createContext, useEffect, useState } from "react";
import { auth, onAuthStateChange } from "../../firebase/setup";
import AuthContext from "./AuthContext";

type Props = {
  children: React.ReactNode;
  redirectUrl?: string;
};

function AuthProvider(props: Props) {
  const [user, setUser] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChange(setUser);
    return () => {
      unsubscribe();
    };
  }, []);

  const logout = () => {
    auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, redirectUrl, setRedirectUrl, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
