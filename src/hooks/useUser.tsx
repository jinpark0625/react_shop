import { useMutation } from '@tanstack/react-query';
import { loginEmail, signUp, onUserStateChange, logout } from '../api/firebase';
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
  const { setUser } = contextData;

  const signUpQuery = useMutation(async (data: IProps) => await signUp(data), {
    onSuccess: async () => onUserStateChange(setUser),
  });

  const loginQuery = useMutation(
    async (data: loginProps) => await loginEmail(data.email, data.password),
    {
      onSuccess: async () => onUserStateChange(setUser),
    },
  );

  const logOutQuery = useMutation(async () => await logout(), {
    onSuccess: async () => onUserStateChange(setUser),
  });

  return { loginQuery, signUpQuery, logOutQuery };
}
