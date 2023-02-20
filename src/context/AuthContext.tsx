import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';
import { onUserStateChange } from '../api/firebase';
import { User } from 'firebase/auth';

interface ContextState {
  user?: (User & { isAdmin?: boolean }) | null;
  uid: string;
  setUser: Dispatch<SetStateAction<User | null>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

interface AuthProps {
  children: ReactNode;
}

export const AuthContext = createContext<ContextState | null>(null);

export function AuthContextProvider({ children }: AuthProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onUserStateChange(setUser, setLoading);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setLoading,
        loading,
        setUser,
        user,
        uid: user ? user.uid : '',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
