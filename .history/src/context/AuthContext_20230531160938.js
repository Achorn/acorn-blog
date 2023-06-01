import { createContext, useContext, useEffect, useState } from "react";
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  useEffect(() => {});
  return <AuthContext.Provider value {{}}>{children}</AuthContext.Provider>;
};
