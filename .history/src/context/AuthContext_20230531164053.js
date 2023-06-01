import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const currUser = auth.onAuthStateChanged((authUser) => {
      console.log("auth state changed");
      if (user) {
        console.log(user);
        setUser(authUser);
        console.log("user is signed in");
      } else {
        // setUser();
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
    return auth.signInWithEmailAndPassword(email, password);
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
