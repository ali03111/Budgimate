import { useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';
import { useMutation, useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { createExpenseCategoryUrl, getCategoryUrl } from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';

const useAddCategoryScreen = ({ navigate, replace }, { params }) => {
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
  } = useFormHook(Schemas.createCategory);

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
    queryFn: () =>
      API.get(getCategoryUrl + `?module_type=${params?.module_type}`),
  });

  const { mutate, mutateAsync } = useMutation({
    mutationFn: data => {
      return API.post(createExpenseCategoryUrl, data);
    },
    onSuccess: ({ ok, data }) => {
      if (ok) {
        replace('AddExpenseToCategoryScreen', {
          catVal: selectedCat,
          price: priceInput,
          module_type: params?.module_type,
        });
      } else {
        errorMessage(data?.message);
      }
    },
    onError: () => {
      errorMessage('Network request failed.');
    },
  });

  const onSubmit = data => {
    console.log('Form Data:', data);
    if (!selectedCat?.id) {
      errorMessage('Please select category.');
      return;
    } else if (!priceInput || priceInput == '' || priceInput == null) {
      errorMessage('Please enter limit price.');
      return;
    } else {
      const body = {
        module_type: params?.module_type,
        expense_category_id: selectedCat?.id,
        limit_amount: priceInput,
        // module_id:2
      };
      mutate(body);
    }
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
