// UserContext.tsx
import React, { createContext, useContext, useState, ReactNode, FunctionComponent } from 'react';

type UserContextType = {
  userId: string | null;
  setUserId: (userId: string | null) => void;
};

// Define the context with an initial undefined value
const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider: FunctionComponent<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  const value = { userId, setUserId };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom hook to use the context
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
