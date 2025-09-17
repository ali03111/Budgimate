import { useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';
import { useMutation, useMutationState, useQuery } from '@tanstack/react-query';
import {
  createExpenseCategoryUrl,
  createExpenseinCategoryUrl,
  deleteExpenseinCategoryUrl,
  getExpenseByCategoryUrl,
  updateExpenseinCategoryUrl,
} from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import API, { formDataFunc } from '../../Utils/helperFunc';
import useReduxStore from '../../Hooks/UseReduxStore';
import { currentDate, formatDateToYMD } from '../../Services/GlobalFunctions';

const useAddExpenseToCategoryScreen = ({ navigate }, { params }) => {
  const { queryClient } = useReduxStore();

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
  const [dummy, setDummy] = useState(0);

  const [formState, setFormState] = useState({
    selectedDate: null,
    selectedImg: null,
    comment: null,
    inputPrice: null,
    isEdit: false,
  });

  const { comment, inputPrice, selectedDate, selectedImg, isEdit } = formState;

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
        errorMessage('Oops! Something went wrong. Please try again later.');
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
    } else {
      setModalState(false);

      mutate({
        module_type: params?.module_type,
        expense_category_id: data?.data?.category?.expense_category_id,
        amount: inputPrice,
        date: formatDateToYMD(selectedDate ?? currentDate),
        name: comment,
        receipt: selectedImg,
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
    price: params?.price ?? data?.data?.category?.limit ?? 0,
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
    dummy,
    setDummy,
  };
};

export default useAddExpenseToCategoryScreen;
