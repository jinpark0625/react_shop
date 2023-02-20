import { useMutation } from '@tanstack/react-query';
import {
  loginEmail,
  signUp,
  onUserStateChange,
  logout,
  login,
} from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

type imageType = FileList | null;

interface IProps {
  email: string;
  name: string;
  password: string;
  image: imageType;
}

interface loginProps {
  email: string;
  password: string;
}

export default function useUser() {
  const { ...contextData } = useAuthContext();
  const { setUser, setLoading } = contextData;

  const signUpQuery = useMutation(async (data: IProps) => await signUp(data), {
    onSuccess: async () => onUserStateChange(setUser, setLoading),
  });

  const loginGoogleQuery = useMutation(async () => await login(), {
    onSuccess: async () => onUserStateChange(setUser, setLoading),
  });

  const loginQuery = useMutation(
    async (data: loginProps) => await loginEmail(data.email, data.password),
    {
      onSuccess: async () => onUserStateChange(setUser, setLoading),
    },
  );

  const logOutQuery = useMutation(async () => await logout(), {
    onSuccess: async () => onUserStateChange(setUser, setLoading),
  });

  return { loginGoogleQuery, loginQuery, signUpQuery, logOutQuery };
}
