import { useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';
import { useMutation, useMutationState, useQuery } from '@tanstack/react-query';
import {
  createExpenseCategoryUrl,
  createExpenseinCategoryUrl,
  deleteExpenseinCategoryUrl,
  getExpenseByCategoryUrl,
  updateCategoryLimitUrl,
  updateExpenseinCategoryUrl,
} from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import API, { formDataFunc } from '../../Utils/helperFunc';
import useReduxStore from '../../Hooks/UseReduxStore';
import { currentDate, formatDateToYMD } from '../../Services/GlobalFunctions';
import { Alert } from 'react-native';

const useAddExpenseToCategoryScreen = ({ navigate }, { params }) => {
  const { queryClient, getState } = useReduxStore();

  const DashboardData = getState('DashboardData');

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

  const { data, refetch } = useQuery({
    queryKey: ['expenseByCategoryData'],
    queryFn: () =>
      API.get(getExpenseByCategoryUrl + params?.catVal?.id + '/expenses'),
  });
  console.log('data?.data?.expensesdsdfsdfsdfsdfs', data?.data);

  const [modalSate, setModalState] = useState(false);
  const [datePickerState, setDatePickerState] = useState(false);

  const [expensesArry, setExpensesArry] = useState([1, 2]);
  const [catUpateLimit, setCatUpdareLimit] = useState(false);

  const [formState, setFormState] = useState({
    selectedDate: null,
    selectedImg: null,
    comment: null,
    inputPrice: null,
    isEdit: false,
    catLimit: '',
    expName: '',
  });

  const {
    comment,
    inputPrice,
    selectedDate,
    selectedImg,
    isEdit,
    catLimit,
    expName,
  } = formState;

  const updateState = data => setFormState(prev => ({ ...prev, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  // Update value by index
  const onUpdateVal = (index, key, val) => {
    setExpensesArry(prev =>
      prev.map((item, i) => (i === index ? { ...item, [key]: val } : item)),
    );
  };

  // Add new expense row
  const onAddExpense = () => {
    setExpensesArry(prev => [
      ...prev,
      { expensesName: '', expensesPrice: null },
    ]);
  };

  const { mutate } = useMutation({
    mutationFn: data => {
      console.log('datadatadatadatadatadatadatadatadatadata', data);
      return formDataFunc(
        isEdit
          ? updateExpenseinCategoryUrl + formState?.expenseID
          : createExpenseinCategoryUrl,
        data,
        'receipt',
      );
    },
    onSuccess: ({ ok, data }) => {
      console.log('responsesdlkbvklsdbvsdklvblsdbvlsld', ok, data);
      if (ok) {
        successMessage(data?.message);
        queryClient.invalidateQueries(['expenseByCategoryData']);
        setFormState({
          selectedDate: null,
          selectedImg: null,
          comment: null,
          inputPrice: null,
          isEdit: false,
        });
      } else {
        errorMessage(
          data?.message ??
            'Oops! Something went wrong. Please try again later.',
        );
      }
    },
    onError: () => {
      errorMessage('Network request failed.');
    },
  });
  const { mutateAsync } = useMutation({
    mutationFn: data => {
      return API.post(deleteExpenseinCategoryUrl + formState?.expenseID, {});
    },
    onSuccess: ({ ok, data }) => {
      if (ok) {
        successMessage(data?.message);
        queryClient.invalidateQueries(['expenseByCategoryData']);
        queryClient.invalidateQueries(['getExpenseCategoryUrl']);
        setFormState({
          selectedDate: null,
          selectedImg: null,
          comment: null,
          inputPrice: null,
          isEdit: false,
        });
      } else {
        errorMessage('Oops! Something went wrong. Please try again later.');
      }
    },
    onError: () => {
      errorMessage('Network request failed.');
    },
  });
  const updateCatLimit = useMutation({
    mutationFn: _ => {
      return API.post(
        updateCategoryLimitUrl + data?.data?.category?.module_category_id,
        {
          limit_amount: catLimit,
        },
      );
    },
    onSuccess: ({ ok, data }) => {
      console.log('skldbvklsdbvklsblkvbsdklbvksd', data);
      if (ok) {
        successMessage(data?.message);
        queryClient.invalidateQueries(['expenseByCategoryData']);
        queryClient.invalidateQueries(['getExpenseCategoryUrl']);
        setFormState({
          selectedDate: null,
          selectedImg: null,
          comment: null,
          inputPrice: null,
          isEdit: false,
        });
      } else {
        errorMessage('Oops! Something went wrong. Please try again later.');
      }
    },
    onError: () => {
      errorMessage('Network request failed.');
    },
  });

  const onSubmit = () => {
    if (!inputPrice || inputPrice == 0) {
      errorMessage('Please enter amount');
    }
    if (expName == null || expName == '') {
      errorMessage('Please enter name');
    } else {
      setModalState(false);

      mutate({
        module_type: params?.module_type,
        expense_category_id: data?.data?.category?.expense_category_id,
        amount: inputPrice,
        date: formatDateToYMD(selectedDate ?? currentDate),
        name: expName,
        receipt: selectedImg,
        comment: comment ?? '',
        // image: selectedImg,
      });
    }
    // Handle form submission logic here
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    inputWidth,
    setInputWidth,
    price: data?.data?.category?.limit ?? params?.price ?? 0,
    catName: params?.catVal?.name,
    onAddExpense,
    onUpdateVal,
    expensesArry,
    setModalState,
    modalSate,
    datePickerState,
    setDatePickerState,
    onChangeVal,
    comment,
    inputPrice,
    selectedDate,
    selectedImg,
    catDataFromAPi: data?.data?.category,
    expensesArryFromApi: data?.data?.expenses,
    setFormState,
    isEdit,
    onDeleteExpense: () => {
      setModalState(false);
      mutateAsync();
    },
    catLimit,
    effective_available:
      DashboardData?.incomeAvaBudget +
      (data?.data?.category?.limit ?? params?.price),
    DashboardData,
    onUpdateCatLimit: () => {
      setCatUpdareLimit(false);
      const effective_available =
        DashboardData?.incomeAvaBudget + data?.data?.category?.limit ??
        params?.price;
      if (catLimit > effective_available) {
        Alert.alert(
          'Warning',
          'The spend limit you’ve entered is greater than your remaining income for the cycle',
          [
            { text: 'Edit Category', onPress: () => {} },
            {
              text: 'Save Anyway',
              onPress: () => {
                updateCatLimit.mutate();
              },
            },
          ],
        );
      } else {
        updateCatLimit.mutate();
      }
    },
    catUpateLimit,
    setCatUpdareLimit,
    formState,
    expName,
  };
};

export default useAddExpenseToCategoryScreen;
