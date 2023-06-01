import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const currUser = onAuthStateChanged(auth, (user) => {
      console.log("auth state changed");
      if (user) {
        console.log(user);
        setUser(user);
        console.log("user is signed in");
      } else {
        setUser();
        console.log("user is signed out");
      }
    });
    return currUser;
  }, []);

  //signup
  function signUp(email, password) {
    console.log("testing signUp");
  }

  //signIn
  function signIn(email, password) {
    console.log("testing signin");
  }

  function logout() {
    console.log("testing Logout");
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
