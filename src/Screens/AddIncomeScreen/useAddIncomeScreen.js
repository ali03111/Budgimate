import { useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';
import { useMutation } from '@tanstack/react-query';
import { createIncomeUrl } from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import { formatDate } from '../../Services/GlobalFunctions';

const useAddIncomeScreen = ({ navigate, goBack }, { params }) => {
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

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      return API.post(createIncomeUrl, data);
    },
    onSuccess: ({ ok, data }) => {
      if (ok) {
        successMessage('Income added successfully.');
        reset();
        goBack();
      } else {
        errorMessage(data?.message);
      }
    },
    onError: () => {
      errorMessage('Network request failed.');
    },
  });

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

  const onSubmit = ({
    incomePrice,
    incomeType,
    incomeSource,
    startingPeriod,
    endingPeriod,
  }) => {
    console.log('Form Datasdfsdfsdfsdfsdfsdfsdfsd:', startingPeriod);
    mutateAsync({
      source: incomeSource,
      amount: incomePrice,
      start_date: formatDate(startingPeriod),
      end_date: formatDate(endingPeriod),
      frequency: incomeType?.title,
      module_type: params?.basic ? 'basic' : 'advance',
    });
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
