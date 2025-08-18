import { useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';

const useAddCategoryScreen = () => {
  const [inputWidth, setInputWidth] = useState(20); // starting small

  const {
    control,
    register,
    handleSubmit,
    clearErrors,
    reset,
    getFieldState,
    getValues,
    resetField,
    setError,
    setFocus,
    setValue,
    trigger,
    unregister,
    watch,
    errors,
  } = useFormHook(Schemas.logIn);

  const onSubmit = data => {
    console.log('Form Data:', data);
    // Handle form submission logic here
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    inputWidth,
    setInputWidth,
  };
};

export default useAddCategoryScreen;
