import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import {
  createExpenseCategoryUrl,
  createExpenseinCategoryUrl,
  deleteCategoryLimitUrl,
  getTraceDetailUrl,
  postLeftOverUrl,
  updateCategoryLimitUrl,
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
  const [catIndex, setCatIndex] = useState(null);

  const [formState, setFormState] = useState({
    selectedDate: null,
    selectedImg: null,
    comment: null,
    inputExpensePrice: null,
    traceName: null,
  });
  const { comment, inputExpensePrice, selectedDate, selectedImg, traceName } =
    formState;

  const updateState = data => setFormState(prev => ({ ...prev, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const { data, refetch } = useQuery({
    queryKey: ['getTraceDetailUrl'],
    queryFn: () => API.get(getTraceDetailUrl + params?.catVal?.id),
    cacheTime: 0, // 👈 Don't cache the data
  });
  console.log('sjkdbvkjlsdbvklbsdkvbkjsdbvdjkbvkljsdbvksdjbvsd', data?.data);

  const allocateToTrace = useMutation({
    mutationFn: data => {
      console.log('sl;dnvl;sdnlvnsdl;vnl;sd', data);
      return API.post(postLeftOverUrl, {
        amount: inputPrice,
        module_type: 'trace',
        ...data,
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log('sjdbvklsdbklsdbsdklvbsdklbvsdlkvbksdbvsdklv', data);
      setFormState({
        inputPrice: null,
      });
      setInputWidth(20);
      if (ok) {
        successMessage(data?.message);
        queryClient.invalidateQueries([`getLeftOverUrl`]);
        refetch();
      } else errorMessage(data?.error);
    },
    onError: e => errorMessage(e),
  });

  const { mutateAsync } = useMutation({
    mutationFn: body => {
      return API.post(updateTraceUrl + data?.data?.trace?.id, body);
    },
    onSuccess: ({ ok, data }) => {
      if (ok) {
        successMessage(data?.message);
        refetch();
        queryClient.invalidateQueries(['getTraceUrl']);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  const { mutate } = useMutation({
    mutationFn: data =>
      API.post(
        catIndex != null
          ? updateCategoryLimitUrl + catIndex
          : createExpenseCategoryUrl,
        data,
      ),
    onSuccess: ({ ok, data }) => {
      if (ok) {
        successMessage(data?.message);
        setFormState({
          selectedDate: null,
          selectedImg: null,
          comment: null,
          inputPrice: null,
        });
        setCatIndex(null);
        setCatName(null);
        setExpenceAmount(null);
        refetch();
        // queryClient.invalidateQueries([`getTraceDetailUrl`]);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });
  const deleteTraceCategory = useMutation({
    mutationFn: data => API.post(deleteCategoryLimitUrl + data?.id, {}),
    onSuccess: ({ ok, data }) => {
      if (ok) {
        successMessage(data?.message);
        setFormState({
          selectedDate: null,
          selectedImg: null,
          comment: null,
          inputPrice: null,
        });
        setCatIndex(null);
        setCatName(null);
        setExpenceAmount(null);
        refetch();
        // queryClient.invalidateQueries([`getTraceDetailUrl`]);
      } else errorMessage(data?.message);
    },
    onError: e => errorMessage(e),
  });

  const addExpenseInCat = useMutation({
    mutationFn: data => API.post(createExpenseinCategoryUrl, data),
    onSuccess: ({ ok, data }) => {
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
    limit: data?.data?.trace?.budget,
    spend: data?.data?.trace?.spent,
    setInputWidth,
    traceName: data?.data?.trace?.name,
    inputWidth,
    inputTraceName: traceName,
    inputPrice,
    setInputPrice,
    onChangeVal,
    selectedDate,
    selectedImg,
    comment,
    inputExpensePrice,
    setCatIndex,
    deleteTraceCat: id =>
      deleteTraceCategory.mutate({
        id,
      }),
    traceId: data?.data?.trace?.id,
    traceType: Boolean(data?.data?.trace?.type != 'basic'),
    addExpenseToCategory: formState =>
      addExpenseInCat.mutate({
        source: '',
        amount: formState?.inputPrice,
        start_date: formatDate(formState?.selectedDate),
        frequency: 'one-time',
        module_type: 'trace',
        module_id: data?.data?.trace?.id,
        expense_category_id:
          data?.data?.categories[catIndex]?.expense_category_id,
        name:
          formState?.comment ?? data?.data?.categories[catIndex]?.category_name,
      }),
    addExpense: () => {
      if (data?.data?.trace?.type == 'basic' && catName?.id != null) {
        mutate({
          source: '',
          limit_amount: 0,
          start_date: formatDate(new Date()),
          frequency: 'one-time',
          module_type: 'trace',
          module_id: data?.data?.trace?.id,
          expense_category_id: catName?.id,
          name: catName?.name,
        });
      } else if (
        data?.data?.trace?.type != 'basic' &&
        catName?.id != null &&
        expenceAmount != null &&
        expenceAmount != ''
      ) {
        mutate({
          source: '',
          limit_amount: expenceAmount,
          start_date: formatDate(new Date()),
          frequency: 'one-time',
          module_type: 'trace',
          module_id: data?.data?.trace?.id,
          expense_category_id: catName?.id,
          name: catName?.name,
        });
      } else errorMessage('Please complete fileds');
    },
    updateLimit: () => {
      if (inputPrice != '' && inputPrice != null) {
        mutateAsync({
          name: traceName ?? data?.data?.trace?.name,
          type: params?.traceType,
          budget: inputPrice,
        });
      } else errorMessage('Limit is required');
    },
    catIndex,
    setFormState,
    allocateToTrace: () => {
      allocateToTrace.mutate({
        module_id: data?.data?.trace?.id,
        leftover_expense_category_id: params?.expCatId,
      });
    },
    allocateToTraceExpense: () => {
      allocateToTrace.mutate({
        module_id: data?.data?.trace?.id,
        module_category_id: catName?.id,
        leftover_expense_category_id: params?.expCatId,
      });
    },
  };
};

export default useAddExpenseToTraceScreen;
