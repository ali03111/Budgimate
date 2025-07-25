import { useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';

const useAddIncomeScreen = () => {
  const [inputWidth, setInputWidth] = useState(20); // starting small

  const currentDate = new Date();

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
  } = useFormHook(Schemas.addIncome);

  const [datePicker, setDateRikcer] = useState({
    alertVal: false,
    stateName: null,
    onChange: () => {},
  });

  const toggleDate = stateName =>
    setDateRikcer({
      stateName,
      alertVal: !datePicker.alertVal,
      onChange: e => {
        console.log(stateName, e);
        setValue(stateName, e);
      },
    });

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
    currentDate,
    toggleDate,
    datePicker,
  };
};

export default useAddIncomeScreen;
