import { useState } from 'react';
import useReduxStore from '../../Hooks/UseReduxStore';
import { useMutation, useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import {
  createExpenseinCategoryUrl,
  createIncomeUrl,
  getGoalsDetailUrl,
} from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import { formatDate } from '../../Services/GlobalFunctions';

const useGoalDetailScreen = ({ navigate }, { params }) => {
  const [modalState, setModalState] = useState(false);
  const [datePickerState, setDatePickerState] = useState(false);
  const [inputWidth, setInputWidth] = useState(20);

  const [formState, setFormState] = useState({
    selectedDate: null,
    selectedImg: null,
    comment: null,
    inputPrice: null,
  });

  const { data } = useQuery({
    queryKey: [`getGoalsDetailUrl${params?.id}`],
    queryFn: () => API.get(getGoalsDetailUrl + params?.id),
  });

  const { comment, inputPrice, selectedDate, selectedImg } = formState;

  const updateState = data => setFormState(prev => ({ ...formState, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const { queryClient } = useReduxStore();

  const { mutate } = useMutation({
    mutationFn: data => {
      console.log('sl;dnvl;sdnlvnsdl;vnl;sd', data);
      return API.post(
        data?.isIncome ? createIncomeUrl : createExpenseinCategoryUrl,
        data,
      );
    },
    onSuccess: ({ ok, data }) => {
      console.log('skldbvklbsdklvbklsdbvkbsdkvbsdbvklsdbvksd', data);
      if (ok) {
        successMessage(data?.message);
        setFormState({
          selectedDate: null,
          selectedImg: null,
          comment: null,
          inputPrice: null,
        });
        queryClient.invalidateQueries([`getGoalsDetailUrl${params?.id}`]);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  return {
    modalState,
    setModalState,
    inputWidth,
    setInputWidth,
    goalsDetails: data?.data,
    comment,
    inputPrice,
    selectedDate,
    selectedImg,
    onChangeVal,
    onaddIncome: () =>
      mutate({
        source: comment,
        amount: inputPrice,
        start_date: formatDate(new Date()),
        frequency: 'one-time',
        module_type: 'goal',
        module_id: data?.data?.id,
        isIncome: true,
      }),
    onaddExpense: () =>
      mutate({
        source: comment,
        amount: inputPrice,
        start_date: formatDate(new Date()),
        frequency: 'one-time',
        module_type: 'goal',
        module_id: data?.data?.id,
        isIncome: false,
        name: comment ?? data?.data?.name,
      }),
    setDatePickerState,
    datePickerState,
    setFormState,
  };
};

export default useGoalDetailScreen;
