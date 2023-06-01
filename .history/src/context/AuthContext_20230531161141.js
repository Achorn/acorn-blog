import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        // setUid(user.uid);
        // ...
        setUser(user);
        console.log("user is signed in");
      } else {
        // setUid("");
        setUser();
        console.log("user is signed out");
        // User is signed out
        // ...
      }
    });
  });
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};
