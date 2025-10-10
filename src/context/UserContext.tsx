"use client";

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";

// User type
export interface User {
  id: number;
  name: string;
  email: string;
  profilePic?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}


const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("currentUser");
      if (storedUser) {
        try {
          const parsed: User = JSON.parse(storedUser);
          if (parsed && parsed.id && parsed.name) {
            setUser(parsed);
          }
        } catch {
          setUser(null);
        }
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};



export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside UserProvider");
  }
  return context;
};
