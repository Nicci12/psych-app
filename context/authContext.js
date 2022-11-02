import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useState } from "react";
import { getUserByEmail } from "../lib/mongo/users";


const AuthContext = React.createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const { data: session } = useSession();
  const [user, setUser] = useState();

  useEffect(() => {
    if (session) {
      const mongoUser = getUserByEmail({ email: session.user.email });
      mongoUser.then((data) => setUser({ ...session.user, ...data.user }));
    }
  }, [session]);
  
  useEffect(() => {
    if (user) {
      console.log(user);
    }
  }, [user]);
  
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthContextProvider, useAuthContext };