import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  createExpenseinCategoryUrl,
  getTraceDetailUrl,
  updateTraceUrl,
} from '../../Utils/Urls';
import API from '../../Utils/helperFunc';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import { formatDate } from '../../Services/GlobalFunctions';

const useAddExpenseToTraceScreen = ({ navigate }, { params }) => {
  const { queryClient } = useReduxStore();

  //   catVal: data?.trace,
  // price: inputPrice,
  // module_type: 'trace',
  // module_id: 3,

  const [modalState, setModalState] = useState(null);
  const [catName, setCatName] = useState(null);
  const [expenceAmount, setExpenceAmount] = useState(null);

  const [inputWidth, setInputWidth] = useState(20);
  const [inputPrice, setInputPrice] = useState(0);

  const [formState, setFormState] = useState({
    selectedDate: null,
    selectedImg: null,
    comment: null,
    inputExpensePrice: null,
  });
  const { comment, inputExpensePrice, selectedDate, selectedImg } = formState;

  const updateState = data => setFormState(prev => ({ ...prev, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const [categoryArry, setCategoryArry] = useState([]);

  const { data, refetch } = useQuery({
    queryKey: ['getTraceDetailUrl'],
    queryFn: () => API.get(getTraceDetailUrl + params?.catVal?.id),
  });
  console.log('sjkdbvkjlsdbvklbsdkvbkjsdbvdjkbvkljsdbvksdjbvsd', data?.data);

  const { mutateAsync } = useMutation({
    mutationFn: body => API.post(updateTraceUrl + data?.data?.trace?.id, body),
    onSuccess: ({ ok, data }) => {
      console.log('skldbvklbsdklvbklsdbvkbsdkvbsdbvklsdbvksd', data);
      if (ok) {
        successMessage(data?.message);
        refetch();
        queryClient.invalidateQueries(['getTraceUrl']);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  const { mutate } = useMutation({
    mutationFn: data => API.post(createExpenseinCategoryUrl, data),
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
        refetch();
        // queryClient.invalidateQueries([`getTraceDetailUrl`]);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  return {
    modalState,
    setModalState,
    expenceAmount,
    setExpenceAmount,
    catName,
    setCatName,
    categoryArry: data?.data?.categories ?? [],
    setCategoryArry,
    limit: data?.data?.trace?.budget,
    spend: data?.data?.trace?.spent,
    setInputWidth,
    traceName: data?.data?.trace?.name,
    inputWidth,
    inputPrice,
    setInputPrice,
    onChangeVal,
    selectedDate,
    selectedImg,
    comment,
    inputExpensePrice,
    addExpense: () =>
      mutate({
        source: '',
        amount: inputPrice,
        start_date: formatDate(new Date()),
        frequency: 'one-time',
        module_type: 'trace',
        module_id: data?.data?.trace?.id,
        expense_category_id: catName?.id,
        name: catName?.name,
      }),
    updateLimit: () =>
      mutateAsync({
        name: data?.data?.trace?.name,
        type: params?.traceType,
        budget: expenceAmount,
      }),
  };
};

export default useAddExpenseToTraceScreen;
