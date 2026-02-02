import { useMutation, useQuery } from '@tanstack/react-query';
import API from '../../Utils/helperFunc';
import { getLeftOverUrl, postLeftOverUrl } from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

const useAllocateFundScreen = ({ goBack }) => {
  const [modalVisible, setModalVisible] = useState(null);
  const [afterAdd, setAfterAdd] = useState(false);
  const [inputWidth, setInputWidth] = useState(20); // starting small

  const { queryClient } = useReduxStore();

  const [formState, setFormState] = useState({
    inputPrice: null,
  });
  const { inputPrice } = formState;

  const updateState = data => setFormState(prev => ({ ...formState, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const { data } = useQuery({
    queryKey: ['getLeftOverUrl'],
    queryFn: () => API.get(getLeftOverUrl),
    cacheTime: 0, // 👈 Don't cache the data
  });
  console.log(
    'datadatadatadatadatadatadatadatadatadatadatasdfgsdfsdfsfs',
    data?.data,
  );

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      console.log('sl;dnvl;sdnlvnsdl;vnl;sd', data);
      return API.post(postLeftOverUrl, {
        amount: inputPrice,
        module_type: 'expense_category',
        module_id: data?.expenseCatId,
        leftover_expense_category_id: data?.expenseCatId,
      });
    },
    onSuccess: ({ ok, data }) => {
      console.log('hjhjvhjvhjvhjvvhjvhjvhvjvhvsdfsdfsdfsdfsfdjh', data);
      setFormState({
        inputPrice: null,
      });
      setInputWidth(20);
      if (ok) {
        successMessage(data?.message);
        setAfterAdd(true);
        queryClient.invalidateQueries([`getLeftOverUrl`]);
      } else errorMessage(data?.error);
    },
    onError: e => errorMessage(e),
  });

  useEffect(() => {
    if (data?.data?.leftover != data?.data?.categories_leftover) {
      Alert.alert(
        'Insufficient Leftover',
        'The total remaining balance for categories with configured spend limits is NOT equal to the total remaining income for the previous cycle.',
      );
    }
  }, [data?.data]);

  return {
    leftover: data?.data?.leftover,
    categories: data?.data?.categories,
    modalVisible,
    setModalVisible,
    afterAdd,
    setAfterAdd,
    addAllocate: expenseCatId => mutateAsync({ expenseCatId }),
    inputWidth,
    setInputWidth,
    onChangeVal,
    formState,
    categories_leftover: data?.data?.categories_leftover,
  };
};

export default useAllocateFundScreen;
