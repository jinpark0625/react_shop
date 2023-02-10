import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  SetStateAction,
  Dispatch,
} from 'react';
import { onUserStateChange, login } from '../api/firebase';
import { User, UserCredential } from 'firebase/auth';

interface ContextState {
  user?: (User & { isAdmin?: boolean }) | null;
  uid: string;
  login: () => Promise<undefined | UserCredential>;

  setUser: Dispatch<SetStateAction<User | null>>;
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
      value={{
        setUser,
        user,
        uid: user ? user.uid : '',
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
