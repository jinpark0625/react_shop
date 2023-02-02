import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { onUserStateChange, login, logout } from '../api/firebase';
import { User, UserCredential } from 'firebase/auth';

interface ContextState {
  user?: User | null;
  uid: string;
  login: () => Promise<undefined | UserCredential>;
  logout: () => Promise<void>;
}

interface AuthProps {
  children: ReactNode;
}

export const AuthContext = createContext<ContextState | null>(null);

export function AuthContextProvider({ children }: AuthProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user ? user.uid : '', login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
