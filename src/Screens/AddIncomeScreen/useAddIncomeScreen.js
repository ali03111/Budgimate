import { useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';
import { useMutation } from '@tanstack/react-query';
import { createIncomeUrl, updateIncomeUrl } from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import { formatDate } from '../../Services/GlobalFunctions';
import useReduxStore from '../../Hooks/UseReduxStore';

const useAddIncomeScreen = ({ navigate, goBack }, { params }) => {
  const [inputWidth, setInputWidth] = useState(20); // starting small

  const { queryClient } = useReduxStore();

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
  } = useFormHook(Schemas.addIncome, {
    incomePrice: params?.amount?.toString() ?? '',
    incomeType: params?.frequency ?? '',
    incomeSource: params?.name ?? '',
    weekType: params?.day_of_week ?? '',
    dayType: params?.day_of_month ?? '',
    startingPeriod: params?.start_date ?? currentDate,
    endingPeriod: params?.ending_date ?? currentDate,
  });

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      console.log('Creating Income with data:', data);
      return API.post(
        params?.isUpdate ? updateIncomeUrl + params?.id : createIncomeUrl,
        data,
      );
    },
    onSuccess: ({ ok, data }) => {
      console.log('Income Creation Response:', ok, data);
      if (ok) {
        successMessage('Income added successfully.');
        reset();
        goBack();
        queryClient.invalidateQueries(['getAllIncomesUrl']);
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
    dayType,
    weekType,
  }) => {
    console.log('Form Datasdfsdfsdfsdfsdfsdfsdfsd:', startingPeriod);
    mutateAsync({
      source: incomeSource,
      amount: incomePrice,
      start_date: formatDate(startingPeriod),
      end_date: endingPeriod ? formatDate(endingPeriod) : null,
      frequency: incomeType,
      module_type: params?.basic ? 'basic' : 'advance',
      day_of_week: weekType,
      day_of_month: dayType,
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
