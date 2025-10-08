import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import API from '../../Utils/helperFunc';
import useReduxStore from '../../Hooks/UseReduxStore';
import { postLeftOverUrl } from '../../Utils/Urls';
import { errorMessage, successMessage } from '../../Config/NotificationMessage';

const useAllocateToIncomeScreen = ({ goBack }) => {
  const { queryClient } = useReduxStore();

  const [formState, setFormState] = useState({
    inputPrice: null,
  });

  const [inputWidth, setInputWidth] = useState(20); // starting small

  const { inputPrice } = formState;

  const updateState = data => setFormState(prev => ({ ...formState, ...data }));

  const onChangeVal = (key, val) => updateState({ [key]: val });

  const { mutateAsync } = useMutation({
    mutationFn: data => {
      console.log('sl;dnvl;sdnlvnsdl;vnl;sd', data);
      return API.post(postLeftOverUrl, {
        amount: inputPrice,
        module_type: 'basic',
        // module_id:10,
      });
    },
    onSuccess: ({ ok, data }) => {
      if (ok) {
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
    addAllocate: () => mutateAsync(),
  };
};

export default useAllocateToIncomeScreen;
