import { useMutation } from '@tanstack/react-query';
import {
  loginEmail,
  signUp,
  onUserStateChange,
  logout,
  login,
  reauthenticate,
  editUser,
} from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

type imageType = FileList | null;

interface IProps {
  email: string;
  name: string;
  password: string;
  image: imageType;
}

interface LoginProps {
  email: string;
  password: string;
}

interface EditPasswordProps {
  email: string;
  currentPassword: string;
  password: string;
}

interface EditAccountProps {
  name: string;
  image: FileList | null;
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
    async (data: LoginProps) => await loginEmail(data.email, data.password),
    {
      onSuccess: async () => onUserStateChange(setUser, setLoading),
    },
  );

  const logOutQuery = useMutation(async () => await logout(), {
    onSuccess: async () => onUserStateChange(setUser, setLoading),
  });

  const editPasswordQuery = useMutation(
    async (data: EditPasswordProps) =>
      await reauthenticate(data.email, data.currentPassword, data.password),
    {
      onSuccess: async () => onUserStateChange(setUser, setLoading),
    },
  );

  const editAccount = useMutation(
    async (data: EditAccountProps) => {
      return await editUser(data.name, data.image);
    },
    {
      onSuccess: async () => onUserStateChange(setUser, setLoading),
    },
  );

  return {
    loginGoogleQuery,
    loginQuery,
    signUpQuery,
    logOutQuery,
    editPasswordQuery,
    editAccount,
  };
}
