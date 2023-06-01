import { createContext, useContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/config";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const currUser = auth.onAuthStateChanged((authUser) => {
      console.log("auth state changed");
      if (authUser) {
        console.log(authUser);
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
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
