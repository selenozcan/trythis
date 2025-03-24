import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { getUserByUid } from "../api";
import { AuthContext } from "./AuthContext";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchUser = useCallback(
    async (isRefresh = false) => {
      if (!user) return;

      if (isRefresh) {
        setIsRefreshing(true);
      } else {
        setLoading(true);
      }

      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        const data = await getUserByUid(user.uid);
        console.log("User data fetched:", data);
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err);
      } finally {
        if (isRefresh) {
          setIsRefreshing(false);
        } else {
          setLoading(false);
        }
      }
    },
    [user]
  );

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setUserData(null);
      setLoading(false);
      return;
    }

    fetchUser();
  }, [user, authLoading, fetchUser]);

  return (
    <UserContext.Provider
      value={{
        userData,
        loading,
        error,
        isRefreshing,
        refreshUserData: () => fetchUser(true), 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
