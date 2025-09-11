import { useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';
import { useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { getCategoryUrl } from '../../Utils/Urls';

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

  const [modalState, setModalState] = useState(false);

  const [formData, setFormData] = useState({
    selectedCat: null,
    isBudgmetLimit: false,
    isOverSpend: false,
    priceInput: null,
  });

  const { isBudgmetLimit, isOverSpend, selectedCat, priceInput } = formData;

  const updateState = data => setFormData(prev => ({ ...prev, ...data }));
  const onChangeVal = (key, val) => updateState({ [key]: val });

  const { data, refetch } = useQuery({
    queryKey: ['categoryData'],
    queryFn: () => API.get(getCategoryUrl),
  });

  const onSubmit = data => {
    console.log('Form Data:', data);
    // Handle form submission logic here
  };
  console.log('slkdnvklsdnvklsndlkvnklsdnvknsdkv', data?.data);
  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    inputWidth,
    setInputWidth,
    catData: data?.data,
    modalState,
    setModalState,
    onChangeVal,
    isBudgmetLimit,
    isOverSpend,
    selectedCat,
    priceInput,
  };
};

export default useAddCategoryScreen;
