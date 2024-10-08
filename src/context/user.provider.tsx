import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../types";
import { getCurrentUser } from "../services/AuthServices";

// Define the context values interface
interface IUserProviderValues {
  user: IUser | null;
  isLoading: boolean;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  updateProfile: (updatedUserData: IUser) => void; // Accepts new user data to update state
}

const UserContext = createContext<IUserProviderValues | undefined>(undefined);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null); // State for storing user
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  // Fetch the current user and update state
  const handleUser = async () => {
    try {
      const user = await getCurrentUser();

      setUser(user);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch user when the component mounts
  useEffect(() => {
    handleUser();
  }, [isLoading]);

  const updateProfile = (updatedUserData: IUser) => {
    setUser(updatedUserData);
  };

  return (
    <UserContext.Provider
      value={{ user, setUser, isLoading, setIsLoading, updateProfile }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to access the user context
export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within the UserProvider context");
  }

  return context;
};

export default UserProvider;
