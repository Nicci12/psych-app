import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState();

  useEffect(() => {
    if (session) {
      setUser(session.user);
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthContextProvider, useAuthContext }