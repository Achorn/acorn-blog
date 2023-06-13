import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    setUserLoading(true);
    const currUser = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser();
      }
    });
    setUserLoading(false);
    return currUser;
  }, []);

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function signIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  //forgot password

  //delete account

  return (
    <AuthContext.Provider value={{ user, userLoading, signUp, signIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
