import { useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';
import { useMutation, useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { createExpenseCategoryUrl, getCategoryUrl } from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import { Alert } from 'react-native';

const useAddCategoryScreen = ({ navigate, replace }, { params }) => {
  const { queryClient, getState } = useReduxStore();
  const [inputWidth, setInputWidth] = useState(20); // starting small

  const DashboardData = getState('DashboardData');

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
      queryClient.invalidateQueries(['getExpenseCategoryUrl']);
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
    } else if (DashboardData?.incomeAvaBudget > priceInput) {
      const body = {
        module_type: params?.module_type,
        expense_category_id: selectedCat?.id,
        limit_amount: priceInput,
        // module_id:2
      };
      mutate(body);
    } else {
      Alert.alert(
        'Warning',
        'The spend limit you’ve entered is greater than your remaining income for the cycle',
        [
          { text: 'Edit Category', onPress: () => {} },
          {
            text: 'Save Anyway',
            onPress: () => {
              const body = {
                module_type: params?.module_type,
                expense_category_id: selectedCat?.id,
                limit_amount: priceInput,
                // module_id:2
              };
              mutate(body);
            },
          },
        ],
      );
    }
    // Handle form submission logic here
  };
  console.log('slkdnvklsdnvklsndlsdfsdfsdfdkvnklsdnvknsdkv', DashboardData);
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
    DashboardData,
  };
};

export default useAddCategoryScreen;
