import { useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';
import { useMutation, useMutationState } from '@tanstack/react-query';
import { createExpenseCategoryUrl } from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';

const useAddExpenseToCategoryScreen = ({ navigate }, { params }) => {
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

  const [modalSate, setModalState] = useState(false);
  const [datePickerState, setDatePickerState] = useState(false);

  const [expensesArry, setExpensesArry] = useState([1, 2]);
  const [formState, setFormState] = useState({
    selectedDate: null,
    selectedImg: null,
    comment: null,
    inputPrice: null,
  });

  const { comment, inputPrice, selectedDate, selectedImg } = formState;

  const updateState = data => setFormState(prev => ({ ...formState, ...data }));

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

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      return API.post(createExpenseCategoryUrl, data);
    },
    onSuccess: ({ ok, data }) => {
      if (ok) {
        successMessage(data?.message);
      } else {
        errorMessage('Oops! Something went wrong. Please try again later.');
      }
    },
    onError: () => {
      errorMessage('Network request failed.');
    },
  });

  const onSubmit = data => {
    console.log('Form Data:', data);
    //     mutateAsync({
    //       module_type:"basic"
    // expense_category_id:10
    // limit_amount:2000
    // module_id:2
    //     })
    // Handle form submission logic here
  };

  return {
    control,
    handleSubmit,
    errors,
    onSubmit,
    inputWidth,
    setInputWidth,
    price: params?.price,
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
  };
};

export default useAddExpenseToCategoryScreen;
