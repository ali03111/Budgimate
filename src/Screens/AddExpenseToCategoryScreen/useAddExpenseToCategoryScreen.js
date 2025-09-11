import { useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';

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
