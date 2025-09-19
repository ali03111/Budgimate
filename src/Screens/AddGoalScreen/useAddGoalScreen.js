import { useMemo, useState } from 'react';
import useFormHook from '../../Hooks/UseFormHooks';
import Schemas from '../../Utils/Validation';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  createGoalUrl,
  getGoalsDetailUrl,
  updateGoalUrl,
} from '../../Utils/Urls';
import API, { formDataFunc } from '../../Utils/helperFunc';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import { formatDateToYMD } from '../../Services/GlobalFunctions';
import useReduxStore from '../../Hooks/UseReduxStore';

const useAddGoalScreen = ({ goBack }, { params }) => {
  const { queryClient } = useReduxStore();

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
  } = useFormHook(Schemas.addGoal);

  const { data } = useQuery({
    queryKey: [`getGoalsDetailUrl${params?.id}`],
    queryFn: async () => {
      const allProps = await API.get(getGoalsDetailUrl + params?.id);
      if (allProps?.ok) {
        const res = allProps.data;

        setValue('goalPrice', parseInt(res?.target_amount).toString() || '');
        setValue('note', res?.note || '');
        setValue('goalName', res?.name || '');
        setValue('targetCompleteDate', new Date(res?.completion_date) || '');
      }
      return allProps;
    },
  });

  const { mutate } = useMutation({
    mutationFn: data => {
      return API.post(
        params?.id ? updateGoalUrl + params?.id : createGoalUrl,
        data,
      );
    },
    onSuccess: ({ ok, data }) => {
      console.log('lsmlslcmslcmslmcmscmlsc', data);
      if (ok) {
        successMessage(data?.message);
        queryClient.invalidateQueries(['getGoalsUrl']);
        goBack();
      } else {
        errorMessage('Oops! Something went wrong. Please try again later.');
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
  const onSubmit = ({ goalPrice, note, goalName, targetCompleteDate }) => {
    mutate({
      target_amount: goalPrice,
      name: goalName,
      completion_date: formatDateToYMD(targetCompleteDate),
      note,
    });
  };

  return {
    control,
    handleSubmit,
    errors,
    inputWidth,
    setInputWidth,
    currentDate,
    toggleDate,
    datePicker,
    onSubmit,
  };
};

export default useAddGoalScreen;
