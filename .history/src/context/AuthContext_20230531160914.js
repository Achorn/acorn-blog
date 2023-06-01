import { createContext, useContext, useState } from "react";
export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};
