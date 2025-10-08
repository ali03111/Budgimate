import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import API from '../../Utils/helperFunc';
import { getGoalsUrl, postLeftOverUrl } from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';
import useReduxStore from '../../Hooks/UseReduxStore';

const useAllocateToGoalsScreen = () => {
  const [modalVisible, setModalVisible] = useState(null);

  const { queryClient } = useReduxStore();

  const [formState, setFormState] = useState({
    inputPrice: null,
  });

  const [inputWidth, setInputWidth] = useState(20); // starting small

  const { inputPrice } = formState;

  const updateState = data => setFormState(prev => ({ ...formState, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const { data } = useQuery({
    queryKey: ['getGoalsUrl'],
    queryFn: () => API.get(getGoalsUrl),
  });

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      console.log('sl;dnvl;sdnlvnsdl;vnl;sd', data);
      return API.post(postLeftOverUrl, {
        amount: inputPrice,
        module_type: 'goal',
        module_id: data?.goalId,
      });
    },
    onSuccess: ({ ok, data }) => {
      setFormState({
        inputPrice: null,
      });
      setInputWidth(20);
      if (ok) {
        console.log('hjhjvhjvhjvhjvvhjvhjvhvjvhvjh', data);
        successMessage(data?.message);
        queryClient.invalidateQueries([`getLeftOverUrl`]);
        goBack();
      } else errorMessage(data?.error);
    },
    onError: e => errorMessage(e),
  });

  return {
    onChangeVal,
    inputPrice,
    inputWidth,
    setInputWidth,
    modalVisible,
    setModalVisible,
    goalList: data?.data ?? [],
    addAllocate: goalId => mutateAsync({ goalId }),
  };
};
export default useAllocateToGoalsScreen;
