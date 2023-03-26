import { useForm } from 'react-hook-form';
import { UserFormTypes, CardTypes } from 'utils/interfaces';

interface FormPropsTypes {
  defaultValues?: UserFormTypes;
  cardDefaultValues?: CardTypes;
}

const useContactForm = ({
  defaultValues,
  cardDefaultValues,
}: FormPropsTypes) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<UserFormTypes>({
    mode: 'onSubmit',
    defaultValues,
  });

  const {
    register: cardRegister,
    control: cardControl,
    handleSubmit: cardSubmit,
    setValue,
    formState: cardFormState,
  } = useForm<CardTypes>({
    defaultValues: cardDefaultValues,
  });

  return {
    register,
    control,
    handleSubmit,
    isSubmitting,
    errors,
    //
    cardRegister,
    cardControl,
    cardSubmit,
    setValue,
    cardFormState,
  };
};

export default useContactForm;
