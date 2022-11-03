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
  const [isUserLoading, setIsUserLoading] = useState(true);

  useEffect(() => {
    setIsUserLoading(true);
    if (session) {
      const mongoUser = getUserByEmail({ email: session.user.email });
      mongoUser.then((data) => setUser({ ...session.user, ...data.user }));
    } else {
      setUser();
    }
  }, [session]);

  useEffect(() => {
    if (user) {
      setIsUserLoading(false);
    }
  }, [user]);
  
  useEffect(() => {
    console.log(isUserLoading)
  }, [isUserLoading]);
  return (
    <AuthContext.Provider value={{ user, isUserLoading}}>{children}</AuthContext.Provider>
  );
};

export { AuthContextProvider, useAuthContext };